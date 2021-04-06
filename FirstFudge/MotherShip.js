"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class MotherShip extends SpaceInvaders.QuadNode {
        constructor() {
            let pos = new f.Vector2(75 / 13, 140 / 13);
            let scale = new f.Vector2(14 / 13, 7 / 13);
            super("MotherShip", pos, scale);
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(1, 0.2, 0.2, 1);
        }
        static getInstance() {
            if (this.instance == null)
                this.instance = new MotherShip();
            return this.instance;
        }
    }
    MotherShip.material = new f.Material("MotherShipMat", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0.2, 0.2, 1)));
    SpaceInvaders.MotherShip = MotherShip;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=MotherShip.js.map