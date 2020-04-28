"use strict";
var FirstFudge;
(function (FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let snake = new f.Node("Snake");
        let mesh = new f.MeshQuad();
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        for (let _i = 0; _i <= 3; _i++) {
            let snakeSquare = new f.Node("square");
            let cmpMesh = new f.ComponentMesh(mesh);
            snakeSquare.addComponent(cmpMesh);
            let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
            snakeSquare.addComponent(cmpMaterial);
            snakeSquare.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-_i, 0, 0))));
            snake.appendChild(snakeSquare);
        }
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        FirstFudge.viewport = new f.Viewport();
        FirstFudge.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        f.Debug.log(FirstFudge.viewport);
        FirstFudge.viewport.draw();
    }
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=Snake.js.map