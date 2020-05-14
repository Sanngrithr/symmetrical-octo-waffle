"use strict";
var Snake;
(function (Snake_1) {
    var f = FudgeCore;
    class Snake extends f.Node {
        constructor() {
            super("Snake");
            this.direction = f.Vector3.X();
            console.log("Creating Snake");
            this.createSegments(4);
        }
        changeDirection(_right) {
            f.Debug.log("Changing Direction!");
            if (_right == false) {
                let x = Math.round(Math.cos(90) * this.direction.x - Math.sin(90) * this.direction.y);
                let y = Math.round(Math.sin(90) * this.direction.x + Math.cos(90) * this.direction.y);
                this.direction = new f.Vector3(x, y, 0);
                return;
            }
            else {
                let x = Math.round(Math.cos(-90) * this.direction.x - Math.sin(-90) * this.direction.y);
                let y = Math.round(Math.sin(-90) * this.direction.x + Math.cos(-90) * this.direction.y);
                this.direction = new f.Vector3(x, y, 0);
                return;
            }
        }
        move() {
            let child = this.getChildren()[0];
            let cmpPrev = child.getComponent(f.ComponentTransform);
            let mtxHead = cmpPrev.local.copy;
            mtxHead.translate(this.direction);
            let cmpNew = new f.ComponentTransform(mtxHead);
            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(f.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNew);
                cmpNew = cmpPrev;
            }
        }
        createSegments(_segments) {
            let mesh = new f.MeshQuad();
            let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
            for (let i = 0; i < _segments; i++) {
                let node = new f.Node("Segment");
                let cmpMesh = new f.ComponentMesh(mesh);
                node.addComponent(cmpMesh);
                cmpMesh.pivot.scale(f.Vector3.ONE(0.8));
                let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
                node.addComponent(cmpMaterial);
                node.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-1 * i, 0, 0))));
                this.appendChild(node);
            }
        }
    }
    Snake_1.Snake = Snake;
})(Snake || (Snake = {}));
// Control snake (absolute/relative?)
// Concept on eating things
//# sourceMappingURL=Snake.js.map