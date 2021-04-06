"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class QuadNode extends f.Node {
        constructor(_name, _pos, _scale) {
            super(_name);
            this.addComponent(new f.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            let cmpMesh = new f.ComponentMesh(QuadNode.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            this.addComponent(cmpMesh);
            this.addComponent(new f.ComponentMaterial(QuadNode.material));
        }
    }
    QuadNode.mesh = new f.MeshQuad("Quad");
    QuadNode.material = new f.Material("White", f.ShaderUniColor, new f.CoatColored());
    SpaceInvaders.QuadNode = QuadNode;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=QuadNode.js.map