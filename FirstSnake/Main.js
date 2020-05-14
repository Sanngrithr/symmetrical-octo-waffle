"use strict";
var Snake;
(function (Snake) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.Debug.log(canvas);
        snake = new Snake.Snake();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.rotateY(180);
        Snake.viewport = new f.Viewport();
        Snake.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        f.Debug.log(Snake.viewport);
        document.addEventListener("keydown", control);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 3);
    }
    function update(_event) {
        Snake.viewport.draw();
        snake.move();
        f.Debug.log(snake.direction.toString);
    }
    // //fudge keyboard.maptovalue(active state: vector3.y(), inactive state: vector3.zero, [keyboard_code.w, keyboard_code.arrow_up]) returns vector3
    // function hndKeydown(_event: KeyboardEvent): void {
    //     switch (_event.code) {
    //         case f.KEYBOARD_CODE.A:
    //             //snake.getChildren()[0].getComponent(f.ComponentTransform).local.rotateZ(90);
    //             //snake.direction = snake.direction * new f.Matrix3x3();
    //             break;
    //         case f.KEYBOARD_CODE.D:
    //             snake.getChildren()[0].getComponent(f.ComponentTransform).local.rotateZ(-90);
    //             break;
    //         case f.KEYBOARD_CODE.W:
    //             //paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
    //             break;
    //         case f.KEYBOARD_CODE.S:
    //             //paddleLeft.cmpTransform.local.translate(ƒ.Vector3.Y(-0.3));
    //             break;
    //     }
    // }
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
})(Snake || (Snake = {}));
//# sourceMappingURL=Main.js.map