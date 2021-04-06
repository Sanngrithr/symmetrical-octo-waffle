namespace Snake3D {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;
    let snake: Snake;
    let world: f.Node = new f.Node("World");

    //seperate time for updating the snake to uncouple it from drawing updates
    let snakeTime: f.Time = new f.Time();
    let fruitTime: f.Time = new f.Time();
    let collisionMap: Map<string, SnakeEvents[]> = new Map<string, SnakeEvents[]>();
    let blockarray: Array<GroundBlock> = [];
    let fruitMap: Map<string, FruitBlock> = new Map<string, FruitBlock>();

    //camera setup
    let cameraAnchorNear: f.Node;
    let cameraAnchorFar: f.Node;
    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    let anchorTransformation: f.Vector3 = new f.Vector3(0, 7, 25);
    let tmpHeadPosition: f.Vector3;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.Debug.log(canvas);

        snake = new Snake();
        world.addChild(snake);

        //base bottom platform
        createPlatform(new f.Vector3(-10, -8, -10), 25, 20, true);
        //bottom platform part2
        createPlatform(new f.Vector3(5, -7, -10), 9, 4, true);
        createPlatform(new f.Vector3(15, -7, -10), 5, 20, true);
        
        //ramps bottom p1-p2
        createRamp(new f.Vector3(14, -7, 3), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(14, -7, 4), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(14, -7, 5), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(14, -7, 6), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(14, -7, 7), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(14, -7, 8), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(14, -7, 9), f.Vector3.X(1), -90);

        createRamp(new f.Vector3(4, -7, -10), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(4, -7, -9), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(4, -7, -8), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(4, -7, -7), f.Vector3.X(1), -90);
        createRamp(new f.Vector3(4, -7, -6), f.Vector3.X(1), -90);
        
        //middle platform
        createPlatform(new f.Vector3(9, -4, -2), 4, 8, true);

        //ramps middle-bottom        
        createRamp(new f.Vector3(10, -4, -3), f.Vector3.Z(1), 180);
        createRamp(new f.Vector3(11, -4, -3), f.Vector3.Z(1), 180);
        createRamp(new f.Vector3(10, -5, -4), f.Vector3.Z(1), 180);
        createRamp(new f.Vector3(11, -5, -4), f.Vector3.Z(1), 180);
        createRamp(new f.Vector3(10, -6, -5), f.Vector3.Z(1), 180);
        createRamp(new f.Vector3(11, -6, -5), f.Vector3.Z(1), 180);

        //upmost platform
        createPlatform(new f.Vector3(-5, -1, -5), 10, 10, true);

        //ramps top-middle
        createRamp(new f.Vector3(6, -1, 3), f.Vector3.X(-1), 90);
        createRamp(new f.Vector3(6, -1, 4), f.Vector3.X(-1), 90);
        createRamp(new f.Vector3(7, -2, 3), f.Vector3.X(-1), 90);
        createRamp(new f.Vector3(7, -2, 4), f.Vector3.X(-1), 90);
        createRamp(new f.Vector3(8, -3, 3), f.Vector3.X(-1), 90);
        createRamp(new f.Vector3(8, -3, 4), f.Vector3.X(-1), 90);

        //add ambient lightsource
        let mainLight: f.LightAmbient = new f.LightAmbient(new f.Color(0.4, 0.4, 0.4, 1));
        let cmpLight: f.ComponentLight = new f.ComponentLight(mainLight);
        world.addComponent(cmpLight);

        //add directional lightsource for sun shadows
        let dirLight: f.LightDirectional = new f.LightDirectional(new f.Color(0.8, 0.8, 0.8, 1));
        let cmpDirLight: f.ComponentLight = new f.ComponentLight(dirLight);
        cmpDirLight.mtxPivot.rotateX(40);
        cmpDirLight.mtxPivot.rotateY(-160);
        world.addComponent(cmpDirLight);

        //set up camera logic
        cameraAnchorNear = new f.Node("Camera Anchor 1");
        cameraAnchorNear.addComponent(new f.ComponentTransform(snake.getChildren()[0].mtxLocal.copy));
        snake.getChildren()[0].addChild(cameraAnchorNear);

        cameraAnchorFar = new f.Node("Camera Anchor 2");
        cameraAnchorFar.addComponent(new f.ComponentTransform(snake.getChildren()[0].mtxLocal.copy));
        cameraAnchorFar.cmpTransform.mtxLocal.translate(anchorTransformation);
        cameraAnchorNear.addChild(cameraAnchorFar);

        cmpCamera.mtxPivot.translation = cameraAnchorFar.mtxLocal.translation;
        cmpCamera.mtxPivot.lookAt(snake.getHeadPosition().translation, f.Vector3.Y());
        tmpHeadPosition = snake.getHeadPosition().translation;

        viewport = new f.Viewport();
        viewport.initialize("Viewport", world, cmpCamera, canvas);

        //keyboard input-handling
        document.addEventListener("keydown", control);

        //set the render loop
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);

        //set the snake update loop --> snake moves only 2 times per second
        snakeTime.setTimer(500, 0, snakeUpdate);
        fruitTime.setTimer(4000, 0, spawnFruit);
    }

    function update(_event: f.Eventƒ): void {
        controlCamera();
        viewport.draw();
    }

    function snakeUpdate(_event: f.EventTimer): void {
        if (snake.isAlive) {   
            snake.move(collisionMap, fruitMap);
        }
        cameraAnchorNear.mtxLocal.translation = snake.getHeadPosition().translation;
    }

    function spawnFruit(): void {
        let rand: number = Math.random();
        let index: number = Math.round(blockarray.length * rand) - 1;

        let fruit: FruitBlock = new FruitBlock(blockarray[index].mtxLocal.translation);
        fruit.mtxLocal.translateY(1);
        world.addChild(fruit);
        fruitMap.set(fruit.mtxLocal.translation.toString(), fruit);
        collisionMap.set(fruit.mtxLocal.translation.toString(), fruit._collisionEvents);
    }

    function control(_event: KeyboardEvent): void {
        switch (_event.code) {
            case f.KEYBOARD_CODE.D || f.KEYBOARD_CODE.ARROW_RIGHT:
                snake.changeDirection(true);
                snake.changeDirection(true);
                break;
            case f.KEYBOARD_CODE.A || f.KEYBOARD_CODE.ARROW_LEFT:
                snake.changeDirection(false);
                snake.changeDirection(false);
                break;
            case f.KEYBOARD_CODE.W:
                snake.resetDirection();
                break;
            case f.KEYBOARD_CODE.ARROW_LEFT:
                rotateVectorY(anchorTransformation, -Math.PI / 20);
                break;
            case f.KEYBOARD_CODE.ARROW_RIGHT:
                rotateVectorY(anchorTransformation, Math.PI / 20);
                break;
            case f.KEYBOARD_CODE.ARROW_UP:
                anchorTransformation.y = clamp(-7, 15, anchorTransformation.y + 0.7);
                break;
            case f.KEYBOARD_CODE.ARROW_DOWN:
                anchorTransformation.y = clamp(-7, 15, anchorTransformation.y - 0.7);
                break;
            default:
               break;
        }
    }

    function rotateVectorY(_vector: f.Vector3, _rad: number): void {
        let newX: number = _vector.z * Math.sin(_rad) + _vector.x * Math.cos(_rad);
        let newZ: number = _vector.z * Math.cos(_rad) - _vector.x * Math.sin(_rad);
        _vector.x = newX;
        _vector.z = newZ;
    }

    function clamp(_min: number, _max: number, _arg: number): number {
        if (_arg >= _max) {
            return _max;
        }   
        if (_arg <= _min) {
            return _min;
        }
        return _arg;
    }

    function controlCamera(): void {
        cameraAnchorFar.mtxLocal.translation = cameraAnchorNear.mtxLocal.translation;
        cameraAnchorFar.mtxLocal.translate(anchorTransformation);

        cmpCamera.mtxPivot.translation = lerp(cmpCamera.mtxPivot.translation, cameraAnchorFar.mtxLocal.translation, 0.1);
        tmpHeadPosition = lerp(tmpHeadPosition, snake.getHeadPosition().translation, 0.05);
        cmpCamera.mtxPivot.lookAt(tmpHeadPosition, f.Vector3.Y());
    }

    function lerp(_from: f.Vector3, _to: f.Vector3, _percent: number): f.Vector3 {
        let result: f.Vector3 = f.Vector3.ZERO();

        result.x = (_to.x - _from.x) * _percent + _from.x;
        result.y = (_to.y - _from.y) * _percent + _from.y;
        result.z = (_to.z - _from.z) * _percent + _from.z;

        if (result.magnitude < 0.02) {
            //if the magnitude is too small , return the missing distance to finish lerping
            return new f.Vector3(_to.x - _from.x, _to.y - _from.y, _to.z - _from.z);
        }

        return result;
    }

    //Creates a chequerboard pattern as long as _length is an even integer
    function createPlatform(_startPosition: f.Vector3, _width: number, _length: number, _isFruitSpawn: boolean): void {
        
        let blackMat: f.Material = new f.Material("BlackBlock", f.ShaderFlat, new f.CoatColored(new f.Color(0.2, 0.2, 0.2, 1)));
        let whiteMat: f.Material = new f.Material("WhiteBlock", f.ShaderFlat, new f.CoatColored(new f.Color(0.8, 0.8, 0.8, 1)));

        let currentColor: f.Material = whiteMat;

        let minX: number = _startPosition.x;
        let maxX: number = _startPosition.x + _width;
        let minZ: number = _startPosition.z;
        let maxZ: number = _startPosition.z + _length;
        
        for (let _i: number = minX; _i <= maxX; _i++) {
            for (let _j: number = minZ; _j <= maxZ; _j++) {

                if (currentColor == blackMat) {
                    currentColor = whiteMat;
                } else {
                    currentColor = blackMat;
                }

                let block: GroundBlock = new GroundBlock(new f.Vector3(_i, _startPosition.y, _j), _isFruitSpawn, currentColor);
                world.addChild(block);
                collisionMap.set(block.cmpTransform.mtxLocal.translation.toString(), block._collisionEvents);
                
                if (_isFruitSpawn) {
                    blockarray.push(block);
                }
            }
        }
    }

    
    function createRamp(_position: f.Vector3, _direction: f.Vector3, _rotation: number): void {
        let ramp: RampBlock = new RampBlock(_position, _direction);
        
        let tmpGround: f.Matrix4x4 = ramp.mtxLocal.copy;
        let elevator: f.Matrix4x4 = ramp.mtxLocal.copy;
        let pusher: f.Matrix4x4 = ramp.mtxLocal.copy;

        ramp.mtxLocal.rotateY(_rotation);
        world.addChild(ramp);
        collisionMap.set(ramp.mtxLocal.translation.toString(), ramp._collisionEvents);

        tmpGround.translateY(-1);
        pusher.translateY(1);
        elevator.translate(ramp.direction);
        
        collisionMap.set(elevator.translation.toString(), [SnakeEvents.ELEVATOR, SnakeEvents.GROUND]);
        collisionMap.set(tmpGround.translation.toString(), [SnakeEvents.GROUND]);
        collisionMap.set(pusher.translation.toString(), [SnakeEvents.PUSHDOWN]);
    }
}