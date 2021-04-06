namespace SpaceInvaders {
  import f = FudgeCore;

  export class Ship extends QuadNode {
    static instance: Ship;
    // static material: ƒ.Material = new ƒ.Material("ShipMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.3, 0.7, 1, 1)));

    private constructor() {
      let scale: f.Vector2 = new f.Vector2(1, 7 / 13);
      super("Ship", new f.Vector2(), scale);
      this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0.3, 0.7, 1, 1);
    }

    static getInstance(): Ship {
      if (this.instance == null) this.instance = new Ship();
      return this.instance;
    }
  }
}