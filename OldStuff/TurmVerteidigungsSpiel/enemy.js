"use strict";
var TowerDefense;
(function (TowerDefense) {
    var f = FudgeCore;
    class Enemy extends f.Node {
        // private health: number = 1;
        constructor(_componentMesh, _componentMaterial) {
            super("Enemy");
            this.addComponent(_componentMaterial);
            this.addComponent(_componentMesh);
        }
    }
    TowerDefense.Enemy = Enemy;
})(TowerDefense || (TowerDefense = {}));
//# sourceMappingURL=enemy.js.map