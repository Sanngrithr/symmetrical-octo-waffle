"use strict";
var FirstFudge;
(function (FirstFudge) {
    var f = FudgeCore;
    class Block extends f.Node {
        constructor(_position) {
            super("Block");
            this.boundingBox = new Array(4);
            let mesh = new f.MeshCube();
            let cmpMesh = new f.ComponentMesh(mesh);
            let material = new f.Material("solid white", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
            let cmpMaterial = new f.ComponentMaterial(material);
            this.addComponent(cmpMesh);
            this.addComponent(cmpMaterial);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            this.mtxLocal.scaleX(2);
            this.mtxLocal.scaleY(0.75);
            let center = new f.Vector2(_position.x, _position.y);
            let p1 = new f.Vector2(center.x - (this.mtxLocal.scaling.x / 2), center.y - (this.mtxLocal.scaling.y / 2));
            let p2 = new f.Vector2(center.x - (this.mtxLocal.scaling.x / 2), center.y + (this.mtxLocal.scaling.y / 2));
            let p3 = new f.Vector2(center.x + (this.mtxLocal.scaling.x / 2), center.y + (this.mtxLocal.scaling.y / 2));
            let p4 = new f.Vector2(center.x + (this.mtxLocal.scaling.x / 2), center.y - (this.mtxLocal.scaling.y / 2));
            this.boundingBox.push(p1);
            this.boundingBox.push(p2);
            this.boundingBox.push(p3);
            this.boundingBox.push(p4);
        }
    }
    FirstFudge.Block = Block;
})(FirstFudge || (FirstFudge = {}));
//# sourceMappingURL=Block.js.map