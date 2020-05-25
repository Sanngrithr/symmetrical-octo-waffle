namespace Snake3D {
    import f = FudgeCore;
    export class Snake extends f.Node {

        public isAlive: boolean = true;
        public score: number = 0;


        public direction: f.Vector3 = f.Vector3.X(); //tells the snake in which direction it's going to move
        private newDirection: f.Vector3 = this.direction; //for self-collision checking purposes; the snake can't invert itself
        private grounded: boolean = true;
        private wasClimbing: boolean = false;
        private lastRampPositionKey: string;

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

        public getHeadPosition(): f.Matrix4x4 {
            let headNode: f.Node = this.getChildren()[0];
            let headTransform: f.ComponentTransform = headNode.getComponent(f.ComponentTransform);
            return headTransform.local.copy;
        }

        //ground the snake if possible
        public snakesDontFly(_collisionMap: Map<string, GroundBlock>): void {
            let tmpHead: f.Matrix4x4 = this.getHeadPosition();
            this.grounded = false;

            if (_collisionMap.has(new f.Vector3(tmpHead.translation.x, tmpHead.translation.y - 1, tmpHead.translation.z).toString())) {
                let tmpCol: SnakeEvents[] = _collisionMap.get(new f.Vector3(tmpHead.translation.x, tmpHead.translation.y - 1, tmpHead.translation.z).toString())._collisionEvents;
                for (let i: number = 0; i < tmpCol.length; i++) {
                   if (tmpCol[i] == SnakeEvents.GROUND) {
                       this.grounded = true;
                   }
                }
            }
        }
        
        public move(_collMap: Map<string, GroundBlock>): void {
            //find the transform of the snake head
            let headNode: f.Node = this.getChildren()[0];
            let cmpPrev: f.ComponentTransform = headNode.getComponent(f.ComponentTransform);
            let mtxHead: f.Matrix4x4 = cmpPrev.local.copy;

            //lock in the new direction and move towards it
            this.direction = this.newDirection;
            if (this.wasClimbing) {
                this.setClimbingStatus(false, _collMap);
            }
            //can't move in a direction unless grounded, cause snakes don't fly... for now
            if (this.grounded) {     
                mtxHead.translate(this.direction);
            }
            else {
                mtxHead.translateY(-1);
            }

            let cmpNew: f.ComponentTransform = new f.ComponentTransform(mtxHead);

            //after moving the head, check if you have collided with something and handle it
            //this is the best time to create a new segment after growing
            this.checkCollision(_collMap);
            
            //now that the snake knows where it's going, move the rest of it
            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(f.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNew);
                cmpNew = cmpPrev;
            }
        }

        // private updateSnakeColliders(_collMap: Map<string, GroundBlock>) {
            //collisionmap only accepts groundblock atm, maybe extend it to node or a block superclass?
        // }

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
        
        private checkCollision(collisionMap: Map<string, GroundBlock>): void {
            let headPos: f.Vector3 = this.getHeadPosition().translation;

            if (collisionMap.has(headPos.toString())) {
                let tmpBlock: Block = collisionMap.get(headPos.toString());

                for (let _i: number = 0; _i < tmpBlock._collisionEvents.length; _i++) {
                    switch (tmpBlock._collisionEvents[_i]) {
                        case SnakeEvents.FRUIT:
                            this.grow();
                            //destroy the fruit after eating
                            tmpBlock.getParent().removeChild(tmpBlock);
                            collisionMap.delete(headPos.toString());
                            this.setClimbingStatus(false, collisionMap);
                            break;
                        case SnakeEvents.RAMP:
                            this.setClimbingStatus(true, collisionMap);
                            //set key to remember last ramp for direction checks after leaving it
                            this.lastRampPositionKey = tmpBlock.position.toString();
                            break;
                        case SnakeEvents.WALL:
                            this.isAlive = false;
                            break;
                    }
                }
            } else {
                this.setClimbingStatus(false, collisionMap);
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

        private setClimbingStatus(_bool: boolean, collisionMap: Map<string, GroundBlock>): void {
            if (this.wasClimbing) {
                if (!_bool) {
                    this.leaveRamp(collisionMap.get(this.lastRampPositionKey));
                    this.wasClimbing = _bool;
                }
            } else {
                if (_bool) {
                    this.wasClimbing = _bool;
                    this.climbRamp();
                }
            }
        }

        private climbRamp(): void {
            let cmpMeshHead: f.ComponentMesh = this.getChildren()[0].getComponent<f.ComponentMesh>(f.ComponentMesh);
            cmpMeshHead.pivot.translateY(0.5);
        }

        private leaveRamp(_ramp: RampBlock): void {
            let cmpMeshHead: f.ComponentMesh = this.getChildren()[0].getComponent<f.ComponentMesh>(f.ComponentMesh);
            
            if (this.direction == _ramp.direction) {
                this.getChildren()[0].mtxLocal.translateY(1);
            }
            
            cmpMeshHead.pivot.translateY(-0.5);
        }
    }
}