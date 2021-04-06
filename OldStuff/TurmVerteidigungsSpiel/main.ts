namespace TowerDefense {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;

    //testing variables
    let speed: number = 0.1;
    
    let player: f.Node = new f.Node("Player");
    let enemy: f.Node = new f.Node("Enemy");

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.Debug.log(canvas);

        let root: f.Node = new f.Node("SceneRoot");

        //define game field
        let world: f.Node = new f.Node("World");

        let mesh: f.MeshQuad = new f.MeshQuad();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let material: f.Material = new f.Material("solidGray", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("Gray")));
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(material);

        world.addComponent(cmpMesh);
        world.addComponent(cmpMaterial);

        world.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.ZERO())));
        world.mtxLocal.scale(f.Vector3.ONE(15));

        root.addChild(world);

        //define player
        let meshPlayer: f.MeshQuad = new f.MeshQuad();
        let cmpMeshPlayer: f.ComponentMesh = new f.ComponentMesh(meshPlayer);
        let materialPlayer: f.Material = new f.Material("solidGreen", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("Green")));
        let cmpMaterialPlayer: f.ComponentMaterial = new f.ComponentMaterial(materialPlayer);

        player.addComponent(cmpMeshPlayer);
        player.addComponent(cmpMaterialPlayer);
        player.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.ZERO())));

        player.mtxLocal.scale(f.Vector3.ONE(0.5));
        player.mtxLocal.translateZ(1);
        root.addChild(player);

        //define enemy
        let materialEnemy: f.Material = new f.Material("solidRed", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("Red")));
        let cmpMaterialEnemy: f.ComponentMaterial = new f.ComponentMaterial(materialEnemy);
        let cmpmeshEnemy: f.ComponentMesh = new f.ComponentMesh(meshPlayer);

        enemy.addComponent(cmpmeshEnemy);
        enemy.addComponent(cmpMaterialEnemy);
        enemy.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.ZERO())));

        enemy.mtxLocal.translate(new f.Vector3(10, 0, 1));
        enemy.mtxLocal.scale(f.Vector3.ONE(0.5));
        root.addChild(enemy);
    
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.rotateY(180);

        window.addEventListener("keypress", controlPlayer);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Debug.log(viewport);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
    }

    function update(_event: f.Eventƒ): void {
        viewport.draw();
        moveEnemy();
    }

    function controlPlayer(_event: f.EventKeyboard): void {
        let direction: f.Vector3;
        direction = f.Keyboard.mapToValue(f.Vector3.Y(1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.W]);
        direction.add(f.Keyboard.mapToValue(f.Vector3.Y(-1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.S]));
        direction.add(f.Keyboard.mapToValue(f.Vector3.X(-1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.A]));
        direction.add(f.Keyboard.mapToValue(f.Vector3.X(1), f.Vector3.ZERO(), [f.KEYBOARD_CODE.D]));

        direction.scale(speed);
        player.mtxLocal.translate(direction);
    }
    

    function moveEnemy(): void {
        let goal: f.Vector3 = player.mtxLocal.translation.copy;
        let start: f.Vector3 = enemy.mtxLocal.translation.copy;

        goal.subtract(start);
        goal.normalize();
        goal.scale(speed * 0.6);

        enemy.mtxLocal.translate(goal);
    }
}