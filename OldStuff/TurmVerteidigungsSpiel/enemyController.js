"use strict";
var TowerDefense;
(function (TowerDefense) {
    var f = FudgeCore;
    class EnemyController extends f.Node {
        // private enemyList: Enemy[] = new Array<Enemy>();
        constructor(_sceneRoot) {
            super("EnemyController");
            this.mesh = new f.MeshQuad();
            this.material = new f.Material("solidRed", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("Red")));
            this.cmpMaterialEnemy = new f.ComponentMaterial(this.material);
            this.cmpmeshEnemy = new f.ComponentMesh(this.mesh);
            this.speed = 0.1;
            _sceneRoot.addChild(this);
        }
        spawnEnemy() {
            let enemy = new TowerDefense.Enemy(this.cmpmeshEnemy, this.cmpMaterialEnemy);
            this.addChild(enemy);
        }
        moveEnemy(enemy, player) {
            let goal = player.mtxLocal.translation.copy;
            let start = enemy.mtxLocal.translation.copy;
            goal.subtract(start);
            goal.normalize();
            goal.scale(this.speed * 0.6);
            enemy.mtxLocal.translate(goal);
        }
    }
    TowerDefense.EnemyController = EnemyController;
})(TowerDefense || (TowerDefense = {}));
//# sourceMappingURL=enemyController.js.map