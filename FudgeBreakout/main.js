"use strict";
var FirstFudge;
(function (FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let player = new f.Node("Cube");
    let ball = new f.Node("Ball");
    let ballEdges = new Array();
    let colliderRoot = new f.Node("Collider Root");
    let speed = 0.2;
    let velocity = new f.Vector3(0.5, 0.5, 0);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let root = new f.Node("Root");
        let mesh = new f.MeshCube();
        let ballMesh = new f.MeshSphere(10, 10);
        let cmpMesh = new f.ComponentMesh(mesh);
        let cmpBallMesh = new f.ComponentMesh(ballMesh);
        let material = new f.Material("solid white", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let cmpMaterial = new f.ComponentMaterial(material);
        let cmpBallMaterial = new f.ComponentMaterial(material);
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
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.rotateY(180);
        calculateBallEdges(ball, 16);
        createBlocks(colliderRoot, new f.Vector3(-5, 4, 0), 6, 0.4);
        FirstFudge.viewport = new f.Viewport();
        FirstFudge.viewport.initialize("Viewport", root, cmpCamera, canvas);
        window.addEventListener("keydown", control);
        //set the render loop
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, collisionCheck);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
    }
    function update(_event) {
        let elapsedTime = f.Time.game.getElapsedSincePreviousCall() / 1000;
        let scaledVelocity = velocity.copy;
        scaledVelocity.scale(elapsedTime);
        ball.mtxLocal.translate(scaledVelocity);
        FirstFudge.viewport.draw();
    }
    function collisionCheck(_event) {
        // for (let block of colliderRoot.getChildren()) {
        //     if (block instanceof Block) {
        //         for (let ballEdge of ballEdges) {
        //             for (let blockEdge of block.boundingBox) {
        //                 if (ballEdge.x <= blockEdge.x )
        //             }
        //         }
        //     }
        // }
        // get all objects the ball can collide from "collisionRoot"'s children
        // check if ball collides with an object
        // check on what edge the ball collides with the objeect
        // reflect ball in appropriate direction
    }
    function createBlocks(_colliderRoot, _position, _numberOfBlocks, _spacing) {
        for (let i = 0; i < _numberOfBlocks; i++) {
            let tmpBlock = new FirstFudge.Block(_position);
            _colliderRoot.addChild(tmpBlock);
            _position.x = _position.x + (tmpBlock.mtxLocal.scaling.x + _spacing);
        }
    }
    function calculateBallEdges(_ball, _numOfEdges) {
        let center = new f.Vector2(_ball.mtxLocal.translation.x, _ball.mtxLocal.translation.y);
        for (let i = 0; i < _numOfEdges; i++) {
            let tmpEdge = new f.Vector2(center.x + Math.cos(2 * Math.PI / i), center.y + Math.sin(2 * Math.PI / i));
            ballEdges.push(tmpEdge);
        }
    }
    function control(_event) {
        let direction = f.Vector3.ZERO();
        direction.add(f.Keyboard.mapToValue(f.Vector3.X(-1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.A]));
        direction.add(f.Keyboard.mapToValue(f.Vector3.X(1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.D]));
        direction.scale(speed);
        player.mtxLocal.translate(direction);
    }
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=main.js.map