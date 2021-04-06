namespace SpaceInvaders {
  import f = FudgeCore;
  
  export class QuadNode extends f.Node {
    static mesh: f.Mesh = new f.MeshQuad("Quad");
    static material: f.Material = new f.Material("White", f.ShaderUniColor, new f.CoatColored());

    constructor(_name: string, _pos: f.Vector2, _scale: f.Vector2) {
      super(_name);

      this.addComponent(new f.ComponentTransform());
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);

      let cmpMesh: f.ComponentMesh = new f.ComponentMesh(QuadNode.mesh);
      cmpMesh.mtxPivot.scaleX(_scale.x);
      cmpMesh.mtxPivot.scaleY(_scale.y);
      this.addComponent(cmpMesh);

      this.addComponent(new f.ComponentMaterial(QuadNode.material));
    }
  }
}