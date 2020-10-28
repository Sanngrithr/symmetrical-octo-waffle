namespace Snake3D {
    import f = FudgeCore;
    
    export enum SnakeState {
        GROUNDED,
        CLIMBING,
        FALLING,
        FLYING,
        RAMPING,
        DEAD
    }

    export class Snake extends f.Node {

        public isAlive: boolean = true;
        public score: number = 0;
        public state: SnakeState = SnakeState.GROUNDED;


        public direction: f.Vector3 = f.Vector3.X(); //tells the snake in which direction it's going to move
        private newDirection: f.Vector3 = this.direction; //for self-collision checking purposes; the snake can't invert itself

        private snakeMesh: f.MeshSphere = new f.MeshSphere(36, 36);
        private mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(f.Color.CSS("WHITE")));

        constructor() {
            super("Snake");
            console.log("Creating Snake");
            this.createSegments(3);
        }

        /* Snake Movement
        The Movement controls need to be adjusted later,
        so they can feel better.
        - any point in pressing w?
        - if you want to change your mind and go left instead of right
          you would need to press left twice, since once rotates you back forward
        - some sort of indication of where the head is heading may be useful?
        */
        public changeDirection(_right: boolean): void {
            f.Debug.log("Changing Direction!");
            let x: number;
            let z: number;
            let newDir: f.Vector3;
            if (_right) { //snake goes right --> rotate direction by 90deg around y
                x = -this.direction.z;
                z =  this.direction.x;
                newDir = new f.Vector3(x, 0, z);
            }
            else { //snake goes left --> rotate direction by -90deg around y
                x =  this.direction.z;
                z = -this.direction.x;
                newDir = new f.Vector3(x, 0, z);
            }

            //check where the head's back direction is
            let reverseDirection: f.Vector3 = this.direction.copy;
            reverseDirection.scale(-1);

            //now that you found out, don't go there
            if (newDir != reverseDirection) {
                this.newDirection = newDir;
            }
        }

        public resetDirection(): void {
            this.newDirection = this.direction;
        }

        public getHeadPosition(): f.Matrix4x4 {
            let headNode: f.Node = this.getChildren()[0];
            let headTransform: f.ComponentTransform = headNode.getComponent(f.ComponentTransform);
            return headTransform.local.copy;
        }
        
        public move(_collMap: Map<string, SnakeEvents[]>, _fruitMap: Map<string, FruitBlock>): void {
            
            this.setSnakeState(_collMap);     

            switch (this.state) {
                case SnakeState.GROUNDED:
                    this.moveHead(_collMap);
                    break;
                case SnakeState.CLIMBING:
                    this.getChildren()[0].cmpTransform.local.translateY(1);
                    break;
                case SnakeState.RAMPING:
                    this.moveHead(_collMap);                  
                    break;
                case SnakeState.FLYING:
                    break;
                case SnakeState.FALLING:
                    this.dragTail(this.getHeadPosition(), _collMap);
                    this.getChildren()[0].cmpTransform.local.translateY(-1);
                    break;
                default:
                    f.Debug.log("Something broke in move(), we shouldn't be in here. Did I forget to implement a State?");
                    break;
            }
      
            this.checkCollision(_collMap, _fruitMap);

        }

        private checkCollision(collisionMap: Map<string, SnakeEvents[]>, fruitMap: Map<string, FruitBlock>): void {
            let headPos: f.Vector3 = this.getHeadPosition().translation;

            if (collisionMap.has(headPos.toString())) {
                let tmpBlock: SnakeEvents[] = collisionMap.get(headPos.toString());

                if (tmpBlock == null || tmpBlock == undefined) {
                    return;
                }

                for (let _i: number = 0; _i < tmpBlock.length; _i++) {
                    switch (tmpBlock[_i]) {
                        case SnakeEvents.FRUIT:
                            this.grow();
                            //destroy the fruit after eating
                            let fruit: FruitBlock = fruitMap.get(headPos.toString());
                            fruit.getParent().removeChild(fruit);
                            fruitMap.delete(headPos.toString());
                            break;
                        case SnakeEvents.RAMP:
                            //this.getChildren()[0].mtxLocal.translateY(0.7);
                            this.state = SnakeState.RAMPING;
                            break;
                        case SnakeEvents.WALL:
                            this.isAlive = false;
                            break;
                        case SnakeEvents.ELEVATOR:
                            this.getChildren()[0].mtxLocal.translateY(1);
                            break;
                        case SnakeEvents.PUSHDOWN:
                            this.getChildren()[0].mtxLocal.translateY(-1);
                            break;
                    }
                }
            }
        }

        private setSnakeState(_collisionMap: Map<string, SnakeEvents[]>): void {
            let tmpHead: f.Matrix4x4 = this.getHeadPosition();

            // if (this.state == SnakeState.RAMPING) {
            //     tmpHead.translateY(-0.7);
            //     tmpHead.translation.y = Math.round(tmpHead.translation.y);
            // }

            if (_collisionMap.has(new f.Vector3(tmpHead.translation.x, tmpHead.translation.y - 1, tmpHead.translation.z).toString())) {
                let tmpCol: SnakeEvents[] = _collisionMap.get(new f.Vector3(tmpHead.translation.x, tmpHead.translation.y - 1, tmpHead.translation.z).toString());

                if (tmpCol == null || tmpCol == undefined) {
                    return;
                }

                for (let i: number = 0; i < tmpCol.length; i++) {
                   if (tmpCol[i] == SnakeEvents.GROUND) {
                       this.state = SnakeState.GROUNDED;
                   }
                }
            }
            else {
                this.state = SnakeState.FALLING;
            }
        }


        private moveHead(_collMap: Map<string, SnakeEvents[]>): void {
            //find the transform of the snake head
            let headNode: f.Node = this.getChildren()[0];
            let cmpPrev: f.ComponentTransform = headNode.getComponent(f.ComponentTransform);
            let mtxHead: f.Matrix4x4 = cmpPrev.local.copy;

            //lock in the new direction and move towards it
            this.direction = this.newDirection;
            mtxHead.translate(this.direction);
            //now that the snake knows where it's going, move the rest of it
            this.dragTail(mtxHead, _collMap);
        }


        private dragTail(_newHeadPosition: f.Matrix4x4, _collMap: Map<string, SnakeEvents[]>): void {
            let cmpNew: f.ComponentTransform = new f.ComponentTransform(_newHeadPosition);
            

            for (let segment of this.getChildren()) {
                let cmpPrev: f.ComponentTransform = segment.getComponent(f.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNew);
                cmpNew = cmpPrev;
            }
        }

        private createSegments(_segments: number): void {
            for (let i: number = 0; i < _segments; i++) {
                let node: f.Node = new f.Node("Segment");

                let cmpMesh: f.ComponentMesh = new f.ComponentMesh(this.snakeMesh);
                
                node.addComponent(cmpMesh);
                cmpMesh.pivot.scale(f.Vector3.ONE(0.8));

                let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(this.mtrSolidWhite);
                node.addComponent(cmpMaterial);

                node.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-1 * i, 0, 0))));

                this.appendChild(node);
            }
        }
        
        private grow(): void {
            let node: f.Node = new f.Node("Segment");

            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(this.snakeMesh);
            node.addComponent(cmpMesh);
            cmpMesh.pivot.scale(f.Vector3.ONE(0.8));
            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(this.mtrSolidWhite);
            node.addComponent(cmpMaterial);

            let index: number = this.getChildren().length - 1;
            node.addComponent(new f.ComponentTransform(this.getChildren()[index].mtxLocal));

            this.appendChild(node);

            this.score += 10;
        }
    }
}