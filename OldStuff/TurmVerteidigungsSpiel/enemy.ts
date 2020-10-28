namespace TowerDefense {

    import f = FudgeCore;
    export class Enemy extends f.Node {

        // private health: number = 1;

        constructor(_componentMesh: f.ComponentMesh, _componentMaterial: f.ComponentMaterial) {
            super("Enemy");

            this.addComponent(_componentMaterial);
            this.addComponent(_componentMesh);
        }
    }
}