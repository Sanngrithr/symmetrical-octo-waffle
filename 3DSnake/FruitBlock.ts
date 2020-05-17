namespace Snake3D {
    import f = FudgeCore;
    export class FruitBlock extends f.Node {

        public position: f.Vector3;
        public _collisionEvents: CollisionEvents[];
        
        constructor(_position: f.Vector3) {
            super("Fruit");
            console.log("Creating Fruit Block");

            //maybe define the resources in a builder superclass that manages building the levels
            let mesh: f.MeshSphere = new f.MeshSphere();
            let mat: f.Material = new f.Material("SolidRed", f.ShaderUniColor, new f.CoatColored(new f.Color(0.8, 0, 0, 1)));

            //add mesh and material to the node
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
            let cmpMat: f.ComponentMaterial = new f.ComponentMaterial(mat);
            this.addComponent(cmpMesh);
            this.addComponent(cmpMat);

            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));

            this._collisionEvents = [CollisionEvents.FRUIT];
        }
    }
}