namespace Snake3D {
    import f = FudgeCore;
    export class GroundBlock extends Block {

        public position: f.Vector3;
        public _collisionEvents: SnakeEvents[];
        
        constructor(_position: f.Vector3, _isFruitSpawn: boolean, _material: f.Material) {
            super("Ground");
            console.log("Creating Ground");

            //maybe define the resources in a builder superclass that manages building the levels
            let mesh: f.MeshCube = new f.MeshCube();

            //add mesh and material to the node
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
            let cmpMat: f.ComponentMaterial = new f.ComponentMaterial(_material);
            this.addComponent(cmpMesh); 
            this.addComponent(cmpMat);

            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));

            if (_isFruitSpawn) {
                this._collisionEvents = [SnakeEvents.WALL, SnakeEvents.GROUND, SnakeEvents.FRUITSPAWN];
            } else {
                this._collisionEvents = [SnakeEvents.WALL, SnakeEvents.GROUND];
            }
        }
    }
}