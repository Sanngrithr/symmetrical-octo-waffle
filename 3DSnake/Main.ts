namespace Snake3D {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;
    let snake: Snake;
    let world: f.Node = new f.Node("World");

    let collisionMap: Map<f.Vector3, CollisionEvents[]> = new Map<f.Vector3, CollisionEvents[]>();

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.Debug.log(canvas);

        snake = new Snake();
        world.addChild(snake);

        //create some ground blocks
        for (let _i: number = -10; _i <= 10; _i++) {
            for (let _j: number = -10; _j <= 10; _j++) {
                let block: GroundBlock = new GroundBlock(new f.Vector3(_i, -1, _j), collisionMap);
                world.addChild(block);
            }
        }

        //add ambient lightsource
        let mainLight: f.LightAmbient = new f.LightAmbient(new f.Color(0.4, 0.4, 0.4, 1));
        let cmpLight: f.ComponentLight = new f.ComponentLight(mainLight);
        world.addComponent(cmpLight);

        //add directional lightsource for sun shadows
        let dirLight: f.LightDirectional = new f.LightDirectional(new f.Color(0.8, 0.8, 0.8, 1));
        let cmpDirLight: f.ComponentLight = new f.ComponentLight(dirLight);
        cmpDirLight.pivot.rotateX(40);
        cmpDirLight.pivot.rotateY(-160);
        world.addComponent(cmpDirLight);

        //initialize camera
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateY(10);
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.rotateY(180);
        cmpCamera.pivot.rotateX(40);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", world, cmpCamera, canvas);
        f.Debug.log(viewport);

        document.addEventListener("keydown", control);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 2);
    }

    function update(_event: f.Eventƒ): void {
        viewport.draw();
        snake.move();
        snake.snakesDontFly(collisionMap);
    }

    function control(_event: KeyboardEvent): void {
        switch (_event.code) {
            case f.KEYBOARD_CODE.D:
                snake.changeDirection(true);
                break;
            case f.KEYBOARD_CODE.A:
                snake.changeDirection(false);
                break;
            default:
               break;
        }

        // let direction: boolean;
        // direction = f.Keyboard.mapToValue(true, false, [f.KEYBOARD_CODE.D]);
        // direction = f.Keyboard.mapToValue(false, false, [f.KEYBOARD_CODE.A]);
        // if (_event.code == f.KEYBOARD_CODE.D || _event.code == f.KEYBOARD_CODE.A) {
        //     snake.changeDirection(direction);
        // }

        // direction.add(f.Keyboard.mapToValue(f.Vector3.Y(-1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN]));
    
        // if (direction.y == 0) {
        //   direction = f.Keyboard.mapToValue(f.Vector3.X(), f.Vector3.ZERO(), [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]);
        //   direction.add(f.Keyboard.mapToValue(f.Vector3.X(-1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT]));
        // }
    
        // if (!direction.equals(f.Vector3.ZERO()))
        //   snake.direction = direction;
      }
}