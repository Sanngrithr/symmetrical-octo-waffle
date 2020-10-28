namespace FirstFudge {

    import f = FudgeCore;

    export class Block extends f.Node {

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
        }
    }
}