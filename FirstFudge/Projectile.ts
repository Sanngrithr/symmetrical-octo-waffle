namespace SpaceInvaders {
    import f = FudgeCore;
    
    export class Projectile extends QuadNode {
      private static count: number = 0;
  
      constructor(_pos: f.Vector2) {
        let scale: f.Vector2 = new f.Vector2(1 / 13, 5 / 13);  
        super("Projectile" + (++Projectile.count), _pos, scale);
      }
    }
  }