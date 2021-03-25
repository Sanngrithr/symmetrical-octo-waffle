"use strict";
var FirstFudge21;
(function (FirstFudge21) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let rotato0 = null;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.Debug.log(canvas);
        let root = new f.Node("root");
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(-10);
        let object = new f.Node("Object");
        let objMesh = new f.MeshCube();
        let cmpMesh = new f.ComponentMesh(objMesh);
        let objMaterial = new f.Material("materialWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let cmpMaterial = new f.ComponentMaterial(objMaterial);
        object.addComponent(cmpMesh);
        object.addComponent(cmpMaterial);
        object.addComponent(new f.ComponentTransform());
        let object2 = new f.Node("Object2");
        object2.addComponent(new f.ComponentMesh(objMesh));
        object2.addComponent(new f.ComponentMaterial(objMaterial));
        object2.addComponent(new f.ComponentTransform());
        object.addChild(object2);
        object2.cmpTransform.local.translateX(2);
        let object3 = new f.Node("Object3");
        object3.addComponent(new f.ComponentMesh(objMesh));
        object3.addComponent(new f.ComponentMaterial(objMaterial));
        object3.addComponent(new f.ComponentTransform());
        object.addChild(object3);
        object3.cmpTransform.local.translateX(-2);
        root.addChild(object);
        rotato0 = object;
        FirstFudge21.viewport = new f.Viewport();
        FirstFudge21.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);
    }
    function update() {
        rotateCube();
        FirstFudge21.viewport.draw();
    }
    function rotateCube() {
        rotato0.mtxLocal.rotateZ(1.5);
    }
})(FirstFudge21 || (FirstFudge21 = {}));
//# sourceMappingURL=Main.js.map