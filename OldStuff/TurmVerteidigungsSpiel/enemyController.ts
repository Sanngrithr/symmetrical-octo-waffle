namespace TowerDefense {

    import f = FudgeCore;
    
    export class EnemyController extends f.Node {

        private mesh: f.MeshQuad = new f.MeshQuad();
        private material: f.Material = new f.Material("solidRed", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("Red")));
        private cmpMaterialEnemy: f.ComponentMaterial = new f.ComponentMaterial(this.material);
        private cmpmeshEnemy: f.ComponentMesh = new f.ComponentMesh(this.mesh);

        private speed: number = 0.1;

        // private enemyList: Enemy[] = new Array<Enemy>();
        

        constructor(_sceneRoot: f.Node) {
            super("EnemyController");

            _sceneRoot.addChild(this);
        }


        public spawnEnemy(): void {
            let enemy: Enemy = new Enemy(this.cmpmeshEnemy, this.cmpMaterialEnemy);
            this.addChild(enemy);
        }

        public moveEnemy( enemy: f.Node, player: f.Node): void {
            let goal: f.Vector3 = player.mtxLocal.translation.copy;
            let start: f.Vector3 = enemy.mtxLocal.translation.copy;

            goal.subtract(start);
            goal.normalize();
            goal.scale(this.speed * 0.6);

            enemy.mtxLocal.translate(goal);
        }
    }
}