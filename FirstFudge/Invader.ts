namespace SpaceInvaders {
  import f = FudgeCore;

  export class Invader extends QuadNode {
    private static count: number = 0;

    constructor(_pos: f.Vector2) {
      let scale: f.Vector2 = new f.Vector2(12 / 13, 8 / 13);
      super("Invader" + (++Invader.count), _pos, scale);

      this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0.5, 1, 0.1, 1);
    }
  }
}