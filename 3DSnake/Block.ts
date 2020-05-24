namespace Snake3D {
    import f = FudgeCore;
    export abstract class Block extends f.Node {

        public position: f.Vector3;
        public _collisionEvents: SnakeEvents[];
    }
}