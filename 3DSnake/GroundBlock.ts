namespace Snake3D {
    import f = FudgeCore;
    export class GroundBlock extends f.Node {

        public position: f.Vector3;
        public _collisionEvents: CollisionEvents[];
        
        
        constructor(_position: f.Vector3) {
            super("Ground");
            console.log("Creating Ground");

            //maybe define the resources in a builder superclass that manages building the levels
            let mesh: f.MeshCube = new f.MeshCube();
            let mat: f.Material = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(new f.Color(0.8, 0.8, 0.8, 1)));

            //add mesh and material to the node
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
            let cmpMat: f.ComponentMaterial = new f.ComponentMaterial(mat);
            this.addComponent(cmpMesh); 
            this.addComponent(cmpMat);

            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));

            this._collisionEvents = [CollisionEvents.WALL, CollisionEvents.GROUND];

        }
    }
}