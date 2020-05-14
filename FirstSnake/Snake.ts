namespace Snake {
    import f = FudgeCore;
    export class Snake extends f.Node {

        public direction: f.Vector3 = f.Vector3.X();

        constructor() {
            super("Snake");
            console.log("Creating Snake");
            this.createSegments(4);
        }

        public changeDirection(_right: boolean): void {
            f.Debug.log("Changing Direction!");
            if (_right == false) {
                let x: number = Math.round(Math.cos(90) * this.direction.x - Math.sin(90) * this.direction.y);
                let y: number = Math.round(Math.sin(90) * this.direction.x + Math.cos(90) * this.direction.y);
                this.direction = new f.Vector3(x, y, 0);
                return;
            }
            else {
                let x: number = Math.round(Math.cos(-90) * this.direction.x - Math.sin(-90) * this.direction.y);
                let y: number = Math.round(Math.sin(-90) * this.direction.x + Math.cos(-90) * this.direction.y);
                this.direction = new f.Vector3(x, y, 0);
                return;
            }
        }
        
        public move(): void {
            let child: f.Node = this.getChildren()[0];
            let cmpPrev: f.ComponentTransform = child.getComponent(f.ComponentTransform);
            let mtxHead: f.Matrix4x4 = cmpPrev.local.copy;
            mtxHead.translate(this.direction);
            let cmpNew: f.ComponentTransform = new f.ComponentTransform(mtxHead);
            

            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(f.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNew);
                cmpNew = cmpPrev;
            }
        }

        private createSegments(_segments: number): void {
            let mesh: f.MeshQuad = new f.MeshQuad();
            let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));

            for (let i: number = 0; i < _segments; i++) {
                let node: f.Node = new f.Node("Segment");

                let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
                
                node.addComponent(cmpMesh);
                cmpMesh.pivot.scale(f.Vector3.ONE(0.8));

                let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
                node.addComponent(cmpMaterial);

                node.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-1 * i, 0, 0))));

                this.appendChild(node);
            }
        }

    }
}

// Control snake (absolute/relative?)
// Concept on eating things