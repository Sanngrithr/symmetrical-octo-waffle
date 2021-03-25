namespace FirstFudge21 {

    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;
    let rotato0: f.Node = null;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.Debug.log(canvas);

        let root: f.Node = new f.Node("root");
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(-10);

        let object: f.Node = new f.Node("Object");
        let objMesh: f.Mesh = new f.MeshCube();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(objMesh);
        let objMaterial: f.Material = new f.Material("materialWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(objMaterial);

        object.addComponent(cmpMesh);
        object.addComponent(cmpMaterial);
        object.addComponent(new f.ComponentTransform());

        let object2: f.Node = new f.Node("Object2");
        object2.addComponent(new f.ComponentMesh(objMesh));
        object2.addComponent(new f.ComponentMaterial(objMaterial));
        object2.addComponent(new f.ComponentTransform());

        object.addChild(object2);
        object2.cmpTransform.local.translateX(2);

        let object3: f.Node = new f.Node("Object3");
        object3.addComponent(new f.ComponentMesh(objMesh));
        object3.addComponent(new f.ComponentMaterial(objMaterial));
        object3.addComponent(new f.ComponentTransform());

        object.addChild(object3);
        object3.cmpTransform.local.translateX(-2);

        root.addChild(object);
        rotato0 = object;

        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, rotateCube);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update2);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 60);
    }

    function update(): void {
        //rotateCube();
        viewport.draw();
        f.Debug.log("update drawing executed @" + f.Loop.timeStartReal);
    }

    function update2(): void {
        f.Debug.log("update 2 executed @" + f.Loop.timeStartReal);
    }

    function rotateCube(): void {
        let rotationSpeed: number = 90 / 1000;
        rotato0.mtxLocal.rotateZ(rotationSpeed * (f.Loop.timeFrameReal));
    }
}