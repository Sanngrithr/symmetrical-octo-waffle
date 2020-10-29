namespace FirstFudge {

    import f = FudgeCore;
    
    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;

    let player: f.Node = new f.Node("Cube");
    let ball: f.Node = new f.Node("Ball");
    let ballEdges: Array<f.Vector2> = new Array<f.Vector2>();
    let colliderRoot: f.Node = new f.Node("Collider Root");
    let speed: number = 0.2;
    let velocity: f.Vector3 = new f.Vector3(0.5, 0.5, 0);

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        let root: f.Node = new f.Node("Root");

        let mesh: f.MeshCube = new f.MeshCube();
        let ballMesh: f.MeshSphere = new f.MeshSphere(10, 10);
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let cmpBallMesh: f.ComponentMesh = new f.ComponentMesh(ballMesh);

        let material: f.Material = new f.Material("solid white", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(material);
        let cmpBallMaterial: f.ComponentMaterial = new f.ComponentMaterial(material);

        player.addComponent(cmpMesh);
        player.addComponent(cmpMaterial);
        player.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 0, 0))));

        ball.addComponent(cmpBallMesh);
        ball.addComponent(cmpBallMaterial);
        ball.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(0, 0, 0))));

        player.mtxLocal.translateY(-5);
        player.mtxLocal.scaleX(2);
        player.mtxLocal.scaleY(0.75);

        root.addChild(player);
        root.addChild(ball);
        root.addChild(colliderRoot);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.rotateY(180);

        calculateBallEdges(ball, 16);
        createBlocks(colliderRoot, new f.Vector3(-5, 4, 0), 6, 0.4);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);

        window.addEventListener("keydown", control);

        //set the render loop
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, collisionCheck);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
    }

    function update(_event: f.Eventƒ): void {
        let elapsedTime: number = f.Time.game.getElapsedSincePreviousCall() / 1000;
        
        let scaledVelocity: f.Vector3 = velocity.copy;
        scaledVelocity.scale(elapsedTime);

        ball.mtxLocal.translate(scaledVelocity);
        
        viewport.draw();
    }

    function collisionCheck(_event: f.Eventƒ): void {

        // get ball position and calculate edges
        // get all objects the ball can collide from "collisionRoot"'s children
        // check if ball collides with an object
        // check on what edge the ball collides with the objeect
        // reflect ball in appropriate direction 
    }

    function createBlocks(_colliderRoot: f.Node, _position: f.Vector3, _numberOfBlocks: number, _spacing: number): void {
        for (let i: number = 0; i < _numberOfBlocks; i++) {
            let tmpBlock: Block = new Block(_position);
            _colliderRoot.addChild(tmpBlock);
            _position.x = _position.x + (tmpBlock.mtxLocal.scaling.x + _spacing);
        }
    }

    function calculateBallEdges(_ball: f.Node, _numOfEdges: number): void {
        let center: f.Vector2 = new f.Vector2(_ball.mtxLocal.translation.x, _ball.mtxLocal.translation.y); 

        for (let i: number = 0; i < _numOfEdges; i++) {
            let tmpEdge: f.Vector2 = new f.Vector2(center.x + Math.cos(2 * Math.PI / i), center.y + Math.sin(2 * Math.PI / i));
            ballEdges.push(tmpEdge);
        }
    }

    function control(_event: KeyboardEvent): void {

        let direction: f.Vector3 = f.Vector3.ZERO();
        direction.add(f.Keyboard.mapToValue(f.Vector3.X(-1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.A]));
        direction.add(f.Keyboard.mapToValue(f.Vector3.X(1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.D]));

        direction.scale(speed);
        player.mtxLocal.translate(direction);
    }
}