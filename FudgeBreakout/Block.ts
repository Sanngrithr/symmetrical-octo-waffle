namespace FirstFudge {

    import f = FudgeCore;

    export class Block extends f.Node {

        public boundingBox: Array<f.Vector2> = new Array<f.Vector2>(4);

        constructor(_position: f.Vector3) {
            super("Block");

            let mesh: f.MeshCube = new f.MeshCube();
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
            let material: f.Material = new f.Material("solid white", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(material);

            this.addComponent(cmpMesh);
            this.addComponent(cmpMaterial);
            this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));

            this.mtxLocal.scaleX(2);
            this.mtxLocal.scaleY(0.75);

            let center: f.Vector2 = new f.Vector2(_position.x, _position.y);
            let p1: f.Vector2 = new f.Vector2(center.x - (this.mtxLocal.scaling.x / 2), center.y - (this.mtxLocal.scaling.y / 2));
            let p2: f.Vector2 = new f.Vector2(center.x - (this.mtxLocal.scaling.x / 2), center.y + (this.mtxLocal.scaling.y / 2));
            let p3: f.Vector2 = new f.Vector2(center.x + (this.mtxLocal.scaling.x / 2), center.y + (this.mtxLocal.scaling.y / 2));
            let p4: f.Vector2 = new f.Vector2(center.x + (this.mtxLocal.scaling.x / 2), center.y - (this.mtxLocal.scaling.y / 2));
        
            this.boundingBox.push(p1);
            this.boundingBox.push(p2);
            this.boundingBox.push(p3);
            this.boundingBox.push(p4);
        }
    }
}