"use strict";
var Snake3D;
(function (Snake3D) {
    var f = FudgeCore;
    let SnakeState;
    (function (SnakeState) {
        SnakeState[SnakeState["GROUNDED"] = 0] = "GROUNDED";
        SnakeState[SnakeState["CLIMBING"] = 1] = "CLIMBING";
        SnakeState[SnakeState["FALLING"] = 2] = "FALLING";
        SnakeState[SnakeState["FLYING"] = 3] = "FLYING";
        SnakeState[SnakeState["RAMPING"] = 4] = "RAMPING";
        SnakeState[SnakeState["DEAD"] = 5] = "DEAD";
    })(SnakeState = Snake3D.SnakeState || (Snake3D.SnakeState = {}));
    class Snake extends f.Node {
        constructor() {
            super("Snake");
            this.isAlive = true;
            this.score = 0;
            this.state = SnakeState.GROUNDED;
            this.direction = f.Vector3.X(); //tells the snake in which direction it's going to move
            this.newDirection = this.direction; //for self-collision checking purposes; the snake can't invert itself
            this.snakeMesh = new f.MeshSphere("Sphere", 36, 36);
            this.mtrSolidWhite = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(f.Color.CSS("WHITE")));
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
        changeDirection(_right) {
            f.Debug.log("Changing Direction!");
            let x;
            let z;
            let newDir;
            if (_right) { //snake goes right --> rotate direction by 90deg around y
                x = -this.direction.z;
                z = this.direction.x;
                newDir = new f.Vector3(x, 0, z);
            }
            else { //snake goes left --> rotate direction by -90deg around y
                x = this.direction.z;
                z = -this.direction.x;
                newDir = new f.Vector3(x, 0, z);
            }
            //check where the head's back direction is
            let reverseDirection = this.direction.copy;
            reverseDirection.scale(-1);
            //now that you found out, don't go there
            if (newDir != reverseDirection) {
                this.newDirection = newDir;
            }
        }
        resetDirection() {
            this.newDirection = this.direction;
        }
        getHeadPosition() {
            let headNode = this.getChildren()[0];
            let headTransform = headNode.getComponent(f.ComponentTransform);
            return headTransform.mtxLocal.copy;
        }
        move(_collMap, _fruitMap) {
            this.setSnakeState(_collMap);
            switch (this.state) {
                case SnakeState.GROUNDED:
                    this.moveHead(_collMap);
                    break;
                case SnakeState.CLIMBING:
                    this.getChildren()[0].cmpTransform.mtxLocal.translateY(1);
                    break;
                case SnakeState.RAMPING:
                    this.moveHead(_collMap);
                    break;
                case SnakeState.FLYING:
                    break;
                case SnakeState.FALLING:
                    this.dragTail(this.getHeadPosition(), _collMap);
                    this.getChildren()[0].cmpTransform.mtxLocal.translateY(-1);
                    break;
                default:
                    f.Debug.log("Something broke in move(), we shouldn't be in here. Did I forget to implement a State?");
                    break;
            }
            this.checkCollision(_collMap, _fruitMap);
        }
        checkCollision(collisionMap, fruitMap) {
            let headPos = this.getHeadPosition().translation;
            if (collisionMap.has(headPos.toString())) {
                let tmpBlock = collisionMap.get(headPos.toString());
                if (tmpBlock == null || tmpBlock == undefined) {
                    return;
                }
                for (let _i = 0; _i < tmpBlock.length; _i++) {
                    switch (tmpBlock[_i]) {
                        case Snake3D.SnakeEvents.FRUIT:
                            this.grow();
                            //destroy the fruit after eating
                            let fruit = fruitMap.get(headPos.toString());
                            fruit.getParent().removeChild(fruit);
                            fruitMap.delete(headPos.toString());
                            break;
                        case Snake3D.SnakeEvents.RAMP:
                            //this.getChildren()[0].mtxLocal.translateY(0.7);
                            this.state = SnakeState.RAMPING;
                            break;
                        case Snake3D.SnakeEvents.WALL:
                            this.isAlive = false;
                            break;
                        case Snake3D.SnakeEvents.ELEVATOR:
                            this.getChildren()[0].mtxLocal.translateY(1);
                            break;
                        case Snake3D.SnakeEvents.PUSHDOWN:
                            this.getChildren()[0].mtxLocal.translateY(-1);
                            break;
                    }
                }
            }
        }
        setSnakeState(_collisionMap) {
            let tmpHead = this.getHeadPosition();
            // if (this.state == SnakeState.RAMPING) {
            //     tmpHead.translateY(-0.7);
            //     tmpHead.translation.y = Math.round(tmpHead.translation.y);
            // }
            if (_collisionMap.has(new f.Vector3(tmpHead.translation.x, tmpHead.translation.y - 1, tmpHead.translation.z).toString())) {
                let tmpCol = _collisionMap.get(new f.Vector3(tmpHead.translation.x, tmpHead.translation.y - 1, tmpHead.translation.z).toString());
                if (tmpCol == null || tmpCol == undefined) {
                    return;
                }
                for (let i = 0; i < tmpCol.length; i++) {
                    if (tmpCol[i] == Snake3D.SnakeEvents.GROUND) {
                        this.state = SnakeState.GROUNDED;
                    }
                }
            }
            else {
                this.state = SnakeState.FALLING;
            }
        }
        moveHead(_collMap) {
            //find the transform of the snake head
            let headNode = this.getChildren()[0];
            let cmpPrev = headNode.getComponent(f.ComponentTransform);
            let mtxHead = cmpPrev.mtxLocal.copy;
            //lock in the new direction and move towards it
            this.direction = this.newDirection;
            mtxHead.translate(this.direction);
            //now that the snake knows where it's going, move the rest of it
            this.dragTail(mtxHead, _collMap);
        }
        dragTail(_newHeadPosition, _collMap) {
            let cmpNew = new f.ComponentTransform(_newHeadPosition);
            for (let segment of this.getChildren()) {
                let cmpPrev = segment.getComponent(f.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNew);
                cmpNew = cmpPrev;
            }
        }
        createSegments(_segments) {
            for (let i = 0; i < _segments; i++) {
                let node = new f.Node("Segment");
                let cmpMesh = new f.ComponentMesh(this.snakeMesh);
                node.addComponent(cmpMesh);
                cmpMesh.mtxPivot.scale(f.Vector3.ONE(0.8));
                let cmpMaterial = new f.ComponentMaterial(this.mtrSolidWhite);
                node.addComponent(cmpMaterial);
                node.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-1 * i, 0, 0))));
                this.appendChild(node);
            }
        }
        grow() {
            let node = new f.Node("Segment");
            let cmpMesh = new f.ComponentMesh(this.snakeMesh);
            node.addComponent(cmpMesh);
            cmpMesh.mtxPivot.scale(f.Vector3.ONE(0.8));
            let cmpMaterial = new f.ComponentMaterial(this.mtrSolidWhite);
            node.addComponent(cmpMaterial);
            let index = this.getChildren().length - 1;
            node.addComponent(new f.ComponentTransform(this.getChildren()[index].mtxLocal));
            this.appendChild(node);
            this.score += 10;
        }
    }
    Snake3D.Snake = Snake;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=Snake.js.map