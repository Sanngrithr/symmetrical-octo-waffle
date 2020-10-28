"use strict";
var Snake3D;
(function (Snake3D) {
    var f = FudgeCore;
    class RampBlock extends Snake3D.Block {
        constructor(_position, _direction) {
            super("Ground");
            console.log("Creating Ground");
            //maybe define the resources in a builder superclass that manages building the levels
            let mesh = new Snake3D.MeshRamp();
            let mat = new f.Material("GREEN", f.ShaderFlat, new f.CoatColored(new f.Color(0.1, 0.6, 0.2, 1)));
            //add mesh and material to the node
            let cmpMesh = new f.ComponentMesh(mesh);
            let cmpMat = new f.ComponentMaterial(mat);
            this.addComponent(cmpMesh);
            this.addComponent(cmpMat);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            this.position = _position;
            this._collisionEvents = [Snake3D.SnakeEvents.RAMP];
            this.direction = _direction;
        }
    }
    Snake3D.RampBlock = RampBlock;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=RampBlock.js.map