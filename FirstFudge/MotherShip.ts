namespace SpaceInvaders {
  import f = FudgeCore;

  export class MotherShip extends QuadNode {
    static instance: MotherShip;
    static material: f.Material = new f.Material("MotherShipMat", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0.2, 0.2, 1)));

    private constructor() {
      let pos: f.Vector2 = new f.Vector2(75 / 13, 140 / 13);
      let scale: f.Vector2 = new f.Vector2(14 / 13, 7 / 13);
      super("MotherShip", pos, scale);
      this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 0.2, 0.2, 1);
    }

    static getInstance(): MotherShip {
      if (this.instance == null) this.instance = new MotherShip();
      return this.instance;
    }
  }
}