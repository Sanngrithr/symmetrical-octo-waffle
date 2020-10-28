"use strict";
var FirstFudge;
(function (FirstFudge) {
    var f = FudgeCore;
    class Block extends f.Node {
        constructor(_position) {
            super("Block");
            let mesh = new f.MeshCube();
            let cmpMesh = new f.ComponentMesh(mesh);
            let material = new f.Material("solid white", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
            let cmpMaterial = new f.ComponentMaterial(material);
            this.addComponent(cmpMesh);
            this.addComponent(cmpMaterial);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            this.mtxLocal.scaleX(2);
            this.mtxLocal.scaleY(0.75);
        }
    }
    FirstFudge.Block = Block;
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=Block.js.map