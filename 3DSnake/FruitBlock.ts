namespace Snake3D {
    import f = FudgeCore;
    export class FruitBlock extends Block {

        public position: f.Vector3;
        public _collisionEvents: SnakeEvents[];
        
        constructor(_position: f.Vector3) {
            super("Fruit");
            console.log("Creating Fruit Block");

            //maybe define the resources in a builder superclass that manages building the levels
            let mesh: f.MeshSphere = new f.MeshSphere(10, 10);
            let mat: f.Material = new f.Material("SolidRed", f.ShaderFlat, new f.CoatColored(new f.Color(1, 0, 0, 1)));

            //add mesh and material to the node
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
            cmpMesh.pivot.scale(f.Vector3.ONE(0.6));
            let cmpMat: f.ComponentMaterial = new f.ComponentMaterial(mat);
            this.addComponent(cmpMesh); 
            this.addComponent(cmpMat);

            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));

            this._collisionEvents = [SnakeEvents.FRUIT];
        }
    }
}