"use strict";
var Snake3D;
(function (Snake3D) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake;
    let world = new f.Node("World");
    let collisionMap = new Map();
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.Debug.log(canvas);
        snake = new Snake3D.Snake();
        world.addChild(snake);
        //create some ground blocks
        for (let _i = -10; _i <= 10; _i++) {
            for (let _j = -10; _j <= 10; _j++) {
                let block = new Snake3D.GroundBlock(new f.Vector3(_i, -1, _j));
                world.addChild(block);
                collisionMap.set(block.cmpTransform.local.translation.toString(), block);
            }
        }
        f.Debug.log(new f.Vector3(-10, -1, -10).toString());
        //add ambient lightsource
        let mainLight = new f.LightAmbient(new f.Color(0.4, 0.4, 0.4, 1));
        let cmpLight = new f.ComponentLight(mainLight);
        world.addComponent(cmpLight);
        //add directional lightsource for sun shadows
        let dirLight = new f.LightDirectional(new f.Color(0.8, 0.8, 0.8, 1));
        let cmpDirLight = new f.ComponentLight(dirLight);
        cmpDirLight.pivot.rotateX(40);
        cmpDirLight.pivot.rotateY(-160);
        world.addComponent(cmpDirLight);
        //initialize camera
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateY(10);
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.rotateY(180);
        cmpCamera.pivot.rotateX(40);
        Snake3D.viewport = new f.Viewport();
        Snake3D.viewport.initialize("Viewport", world, cmpCamera, canvas);
        f.Debug.log(Snake3D.viewport);
        document.addEventListener("keydown", control);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 2);
    }
    function update(_event) {
        Snake3D.viewport.draw();
        snake.move();
        snake.snakesDontFly(collisionMap);
    }
    function control(_event) {
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
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=Main.js.map