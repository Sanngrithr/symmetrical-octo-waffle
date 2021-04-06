namespace SpaceInvaders {
    import f = FudgeCore;
    
    export class Barricade extends f.Node {      
      private static count: number = 0;
      private static stripeCount: number = 21;
      private static stripeHeights: number[] = [14, 15, 16, 17, 17, 12, 11, 10, 9, 8, 8, 8, 9, 10, 11, 12, 17, 17, 16, 15, 14];
      private static stripeYOffsets: number[] = [-1.5, -1, -0.5, 0, 0, 2.5, 3, 3.5, 4, 4.5, 4.5, 4.5, 4, 3.5, 3, 2.5, 0, 0, -0.5, -1, -1.5];

      constructor(_pos: f.Vector2) {  
        super("Barricade" + (++Barricade.count));

        this.addComponent(new f.ComponentTransform());
        this.mtxLocal.translateX(_pos.x);
        this.mtxLocal.translateY(_pos.y);

        for (let iStripe: number = 0; iStripe < Barricade.stripeCount; ++iStripe) {
            let id: number = iStripe + Barricade.count * Barricade.stripeCount;
            let width: number = 21 / (Barricade.stripeCount * 13);

            let pos: f.Vector2 = new f.Vector2((iStripe - (Barricade.stripeCount - 1) / 2) * width, Barricade.stripeYOffsets[iStripe] / 13);
            let scale: f.Vector2 = new f.Vector2(width, Barricade.stripeHeights[iStripe] / 13);
            let stripe: f.Node = new QuadNode("BarricadeStripe" + id, pos, scale);
            stripe.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0.6, 0.4, 0.4, 1);

            this.addChild(stripe);
        }
      }
    }
  }