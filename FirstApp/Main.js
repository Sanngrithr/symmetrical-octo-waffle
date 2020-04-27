"use strict";
var FirstFudge;
(function (FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        let node = new ƒ.Node("Quad");
        let mesh = new ƒ.MeshQuad();
        let cmpMesh = new ƒ.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        let cmpMaterial = new ƒ.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(2);
        cmpCamera.pivot.rotateY(180);
        FirstFudge.viewport = new ƒ.Viewport();
        FirstFudge.viewport.initialize("Viewport", node, cmpCamera, canvas);
        ƒ.Debug.log(FirstFudge.viewport);
        FirstFudge.viewport.draw();
    }
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=Main.js.map