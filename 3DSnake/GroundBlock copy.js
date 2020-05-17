"use strict";
var Snake3D;
(function (Snake3D) {
    var f = FudgeCore;
    class GroundBlock extends f.Node {
        constructor(_position) {
            super("Ground");
            console.log("Creating Ground");
            //maybe define the resources in a builder superclass that manages building the levels
            let mesh = new f.MeshCube();
            let mat = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(new f.Color(0.8, 0.8, 0.8, 1)));
            //add mesh and material to the node
            let cmpMesh = new f.ComponentMesh(mesh);
            let cmpMat = new f.ComponentMaterial(mat);
            this.addComponent(cmpMesh);
            this.addComponent(cmpMat);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            this._collisionEvents = [Snake3D.CollisionEvents.WALL, Snake3D.CollisionEvents.GROUND];
        }
    }
    Snake3D.GroundBlock = GroundBlock;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=GroundBlock copy.js.map