namespace Snake3D {
    import f = FudgeCore;
    export class RampBlock extends Block {

        public position: f.Vector3;
        public _collisionEvents: SnakeEvents[];
        public direction: f.Vector3;
        
        constructor(_position: f.Vector3, _direction: f.Vector3) {
            super("Ground");
            console.log("Creating Ground");

            //maybe define the resources in a builder superclass that manages building the levels
            let mesh: MeshRamp = new MeshRamp();
            let mat: f.Material = new f.Material("GREEN", f.ShaderFlat, new f.CoatColored(new f.Color(0.1, 0.6, 0.2, 1)));

            //add mesh and material to the node
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
            let cmpMat: f.ComponentMaterial = new f.ComponentMaterial(mat);
            this.addComponent(cmpMesh); 
            this.addComponent(cmpMat);

            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
            
            this.position = _position;
            this._collisionEvents = [SnakeEvents.RAMP];
            this.direction = _direction;
        }
    }
}