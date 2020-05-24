"use strict";
var Snake3D;
(function (Snake3D) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let snake;
    let world = new f.Node("World");
    //seperate time for updating the snake to uncouple it from drawing updates
    let snakeTime = new f.Time();
    let collisionMap = new Map();
    let blockarray = [];
    //camera setup
    let cameraAnchor;
    let cmpCamera = new f.ComponentCamera();
    let anchorTransformation = new f.Vector3(0, 15, 20);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.Debug.log(canvas);
        snake = new Snake3D.Snake();
        world.addChild(snake);
        //create some ground blocks
        for (let _i = -10; _i <= 10; _i++) {
            for (let _j = -10; _j <= 10; _j++) {
                let block = new Snake3D.GroundBlock(new f.Vector3(_i, -1, _j), true);
                world.addChild(block);
                blockarray.push(block);
                collisionMap.set(block.cmpTransform.local.translation.toString(), block);
            }
        }
        //second, lower platform
        for (let _i = -5; _i <= 15; _i++) {
            for (let _j = -5; _j <= 15; _j++) {
                let block = new Snake3D.GroundBlock(new f.Vector3(_i, -6, _j), false);
                world.addChild(block);
                collisionMap.set(block.cmpTransform.local.translation.toString(), block);
            }
        }
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
        //set up initial camera rotation
        cmpCamera.pivot.translate(anchorTransformation);
        cameraAnchor = snake.getHeadPosition();
        cmpCamera.pivot.rotateY(180);
        cmpCamera.pivot.rotateX(40);
        Snake3D.viewport = new f.Viewport();
        Snake3D.viewport.initialize("Viewport", world, cmpCamera, canvas);
        //keyboard input-handling
        document.addEventListener("keydown", control);
        //set the render loop
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);
        //set the snake update loop --> snake moves only 2 times per second
        snakeTime.setTimer(500, 0, snakeUpdate);
        snakeTime.setTimer(5000, 0, spawnFruit);
    }
    function update(_event) {
        controlCamera();
        Snake3D.viewport.draw();
        //lerp the camera position in the draw update towards the snake head
    }
    function snakeUpdate(_event) {
        snake.move(collisionMap);
        snake.snakesDontFly(collisionMap);
    }
    function spawnFruit() {
        let continueLoop = true;
        while (continueLoop) {
            let rand = Math.random();
            let index = Math.round(blockarray.length * rand) - 1;
            if (blockarray[index]._collisionEvents.includes(Snake3D.SnakeEvents.FRUITSPAWN)) {
                let fruit = new Snake3D.FruitBlock(blockarray[index].mtxLocal.translation);
                fruit.mtxLocal.translateY(1);
                world.addChild(fruit);
                collisionMap.set(fruit.mtxLocal.translation.toString(), fruit);
                f.Debug.log("spawning fruit at " + fruit.mtxLocal.translation.toString());
                continueLoop = false;
            }
        }
    }
    function control(_event) {
        switch (_event.code) {
            case f.KEYBOARD_CODE.D || f.KEYBOARD_CODE.ARROW_RIGHT:
                snake.changeDirection(true);
                break;
            case f.KEYBOARD_CODE.A || f.KEYBOARD_CODE.ARROW_LEFT:
                snake.changeDirection(false);
                break;
            default:
                break;
        }
    }
    function controlCamera() {
        cameraAnchor = snake.getHeadPosition();
        cameraAnchor.translate(anchorTransformation);
        cmpCamera.pivot.translation = lerp(cmpCamera.pivot.translation, cameraAnchor.translation, 0.05);
    }
    function lerp(_from, _to, _percent) {
        let result = f.Vector3.ZERO();
        result.x = (_to.x - _from.x) * _percent + _from.x;
        result.y = (_to.y - _from.y) * _percent + _from.y;
        result.z = (_to.z - _from.z) * _percent + _from.z;
        if (result.magnitude < 0.01) {
            return f.Vector3.ZERO();
        }
        return result;
    }
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=Main.js.map