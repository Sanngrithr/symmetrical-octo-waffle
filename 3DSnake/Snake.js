"use strict";
var Snake3D;
(function (Snake3D) {
    var f = FudgeCore;
    class Snake extends f.Node {
        constructor() {
            super("Snake");
            this.direction = f.Vector3.X(); //tells the snake in which direction it's going to move
            this.newDirection = this.direction; //for self-collision checking purposes
            this.grounded = true;
            console.log("Creating Snake");
            this.createSegments(12);
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
        getHeadPosition() {
            let headNode = this.getChildren()[0];
            let headTransform = headNode.getComponent(f.ComponentTransform);
            return headTransform.local;
        }
        //ground the snake if possible
        snakesDontFly(_collisionMap) {
            let tmpHead = this.getHeadPosition().copy;
            this.grounded = false;
            if (_collisionMap.has(new f.Vector3(tmpHead.translation.x, tmpHead.translation.y - 1, tmpHead.translation.z))) {
                f.Debug.log("Object found");
                let tmpCol = _collisionMap.get(tmpHead.translation);
                for (let i = 0; i < tmpCol.length; i++) {
                    if (tmpCol[i] == Snake3D.CollisionEvents.GROUND) {
                        f.Debug.log("Snake knows it*s place");
                        this.grounded = true;
                    }
                }
            }
        }
        move() {
            //find the transform of the snake head
            let headNode = this.getChildren()[0];
            let cmpPrev = headNode.getComponent(f.ComponentTransform);
            let mtxHead = cmpPrev.local.copy;
            //lock in the new direction and move towards it
            this.direction = this.newDirection;
            //can't move in a direction unless grounded, cause snakes don't fly... for now
            if (this.grounded) {
                mtxHead.translate(this.direction);
            }
            else {
                mtxHead.translateY(-1);
            }
            let cmpNew = new f.ComponentTransform(mtxHead);
            //now that the snake knows where it's going, move the rest of it
            for (let segment of this.getChildren()) {
                cmpPrev = segment.getComponent(f.ComponentTransform);
                segment.removeComponent(cmpPrev);
                segment.addComponent(cmpNew);
                cmpNew = cmpPrev;
            }
        }
        createSegments(_segments) {
            let mesh = new f.MeshCube();
            let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderFlat, new f.CoatColored(f.Color.CSS("WHITE")));
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
    Snake3D.Snake = Snake;
})(Snake3D || (Snake3D = {}));
//# sourceMappingURL=Snake.js.map