"use strict";
var Snake3D;
(function (Snake3D) {
    var f = FudgeCore;
    class FruitBlock extends Snake3D.Block {
        constructor(_position) {
            super("Fruit");
            console.log("Creating Fruit Block");
            //maybe define the resources in a builder superclass that manages building the levels
            let mesh = new f.MeshSphere("Fruit", 10, 10);
            let mat = new f.Material("SolidRed", f.ShaderFlat, new f.CoatColored(new f.Color(1, 0, 0, 1)));
            //add mesh and material to the node
            let cmpMesh = new f.ComponentMesh(mesh);
            cmpMesh.mtxPivot.scale(f.Vector3.ONE(0.6));
            let cmpMat = new f.ComponentMaterial(mat);
            this.addComponent(cmpMesh);
            this.addComponent(cmpMat);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            this._collisionEvents = [Snake3D.SnakeEvents.FRUIT];
        }
    }
    Snake3D.FruitBlock = FruitBlock;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=FruitBlock.js.map