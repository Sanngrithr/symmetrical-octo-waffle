"use strict";
var TowerDefense;
(function (TowerDefense) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    //testing variables
    let speed = 0.1;
    let player = new f.Node("Player");
    let enemy = new f.Node("Enemy");
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.Debug.log(canvas);
        let root = new f.Node("SceneRoot");
        //define game field
        let world = new f.Node("World");
        let mesh = new f.MeshQuad();
        let cmpMesh = new f.ComponentMesh(mesh);
        let material = new f.Material("solidGray", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("Gray")));
        let cmpMaterial = new f.ComponentMaterial(material);
        world.addComponent(cmpMesh);
        world.addComponent(cmpMaterial);
        world.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.ZERO())));
        world.mtxLocal.scale(f.Vector3.ONE(15));
        root.addChild(world);
        //define player
        let meshPlayer = new f.MeshQuad();
        let cmpMeshPlayer = new f.ComponentMesh(meshPlayer);
        let materialPlayer = new f.Material("solidGreen", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("Green")));
        let cmpMaterialPlayer = new f.ComponentMaterial(materialPlayer);
        player.addComponent(cmpMeshPlayer);
        player.addComponent(cmpMaterialPlayer);
        player.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.ZERO())));
        player.mtxLocal.scale(f.Vector3.ONE(0.5));
        player.mtxLocal.translateZ(1);
        root.addChild(player);
        //define enemy
        let materialEnemy = new f.Material("solidRed", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("Red")));
        let cmpMaterialEnemy = new f.ComponentMaterial(materialEnemy);
        let cmpmeshEnemy = new f.ComponentMesh(meshPlayer);
        enemy.addComponent(cmpmeshEnemy);
        enemy.addComponent(cmpMaterialEnemy);
        enemy.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.ZERO())));
        enemy.mtxLocal.translate(new f.Vector3(10, 0, 1));
        enemy.mtxLocal.scale(f.Vector3.ONE(0.5));
        root.addChild(enemy);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(20);
        cmpCamera.pivot.rotateY(180);
        window.addEventListener("keypress", controlPlayer);
        TowerDefense.viewport = new f.Viewport();
        TowerDefense.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Debug.log(TowerDefense.viewport);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
    }
    function update(_event) {
        TowerDefense.viewport.draw();
        moveEnemy();
    }
    function controlPlayer(_event) {
        let direction;
        direction = f.Keyboard.mapToValue(f.Vector3.Y(1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.W]);
        direction.add(f.Keyboard.mapToValue(f.Vector3.Y(-1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.S]));
        direction.add(f.Keyboard.mapToValue(f.Vector3.X(-1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.A]));
        direction.add(f.Keyboard.mapToValue(f.Vector3.X(1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.D]));
        direction.scale(speed);
        player.mtxLocal.translate(direction);
    }
    function moveEnemy() {
        let goal = player.mtxLocal.translation.copy;
        let start = enemy.mtxLocal.translation.copy;
        goal.subtract(start);
        goal.normalize();
        goal.scale(speed * 0.6);
        enemy.mtxLocal.translate(goal);
    }
})(TowerDefense || (TowerDefense = {}));
//# sourceMappingURL=main.js.map