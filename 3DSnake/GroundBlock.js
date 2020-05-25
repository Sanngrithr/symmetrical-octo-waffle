"use strict";
var Snake3D;
(function (Snake3D) {
    var f = FudgeCore;
    class GroundBlock extends Snake3D.Block {
        constructor(_position, _isFruitSpawn, _material) {
            super("Ground");
            console.log("Creating Ground");
            //maybe define the resources in a builder superclass that manages building the levels
            let mesh = new f.MeshCube();
            //add mesh and material to the node
            let cmpMesh = new f.ComponentMesh(mesh);
            let cmpMat = new f.ComponentMaterial(_material);
            this.addComponent(cmpMesh);
            this.addComponent(cmpMat);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            if (_isFruitSpawn) {
                this._collisionEvents = [Snake3D.SnakeEvents.WALL, Snake3D.SnakeEvents.GROUND, Snake3D.SnakeEvents.FRUITSPAWN];
            }
            else {
                this._collisionEvents = [Snake3D.SnakeEvents.WALL, Snake3D.SnakeEvents.GROUND];
            }
        }
    }
    Snake3D.GroundBlock = GroundBlock;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=GroundBlock.js.map