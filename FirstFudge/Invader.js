"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class Invader extends SpaceInvaders.QuadNode {
        constructor(_pos) {
            let scale = new f.Vector2(12 / 13, 8 / 13);
            super("Invader" + (++Invader.count), _pos, scale);
            this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(0.5, 1, 0.1, 1);
        }
    }
    Invader.count = 0;
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map