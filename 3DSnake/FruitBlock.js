"use strict";
var Snake3D;
(function (Snake3D) {
    var f = FudgeCore;
    class FruitBlock extends f.Node {
        constructor(_position) {
            super("Fruit");
            console.log("Creating Fruit Block");
            //maybe define the resources in a builder superclass that manages building the levels
            let mesh = new f.MeshSphere();
            let mat = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(new f.Color(0.8, 0, 0, 1)));
            //add mesh and material to the node
            let cmpMesh = new f.ComponentMesh(mesh);
            let cmpMat = new f.ComponentMaterial(mat);
            this.addComponent(cmpMesh);
            this.addComponent(cmpMat);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            this._collisionEvents = [Snake3D.CollisionEvents.FRUIT];
        }
    }
    Snake3D.FruitBlock = FruitBlock;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=FruitBlock.js.map