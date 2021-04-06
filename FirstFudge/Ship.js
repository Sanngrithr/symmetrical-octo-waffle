"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class Ship extends SpaceInvaders.QuadNode {
        // static material: ƒ.Material = new ƒ.Material("ShipMat", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.3, 0.7, 1, 1)));
        constructor() {
            let scale = new f.Vector2(1, 7 / 13);
            super("Ship", new f.Vector2(), scale);
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0.3, 0.7, 1, 1);
        }
        static getInstance() {
            if (this.instance == null)
                this.instance = new Ship();
            return this.instance;
        }
    }
    SpaceInvaders.Ship = Ship;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Ship.js.map