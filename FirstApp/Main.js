"use strict";
var FirstFudge;
(function (FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let node = new f.Node("Quad");
        let mesh = new f.MeshQuad();
        let cmpMesh = new f.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.translateY(1);
        cmpCamera.pivot.translateX(-1);
        cmpCamera.pivot.rotateY(170);
        cmpCamera.pivot.rotateX(10);
        //make a cube
        let cube = new f.Node("Cube");
        let mesh2 = new f.MeshCube();
        let cmpMesh2 = new f.ComponentMesh(mesh2);
        cube.addComponent(cmpMesh2);
        cube.addComponent(cmpMaterial);
        cube.addComponent(new f.ComponentTransform(new f.Matrix4x4()));
        cube.mtxLocal.translateX(1);
        node.addChild(cube);
        //create scene lighting
        let lightNode = new f.Node("light");
        let light = new f.LightDirectional(new f.Color(1, 0, 0, 1));
        let cmpLight = new f.ComponentLight(light);
        lightNode.addComponent(cmpLight);
        lightNode.addComponent(new f.ComponentTransform(new f.Matrix4x4()));
        lightNode.mtxLocal.translateY(10);
        FirstFudge.viewport = new f.Viewport();
        FirstFudge.viewport.initialize("Viewport", node, cmpCamera, canvas);
        f.Debug.log(FirstFudge.viewport);
        FirstFudge.viewport.draw();
    }
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=Main.js.map