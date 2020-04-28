namespace FirstFudge {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: f.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let node: f.Node = new f.Node("Quad");

        let mesh: f.MeshQuad = new f.MeshQuad();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        node.addComponent(cmpMesh);
        
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        node.addComponent(cmpMaterial);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.translateY(1);
        cmpCamera.pivot.translateX(-1);
        cmpCamera.pivot.rotateY(170);
        cmpCamera.pivot.rotateX(10);

        //make a cube
        
        let cube: f.Node = new f.Node("Cube");
        
        let mesh2: f.Mesh = new f.MeshCube();
        let cmpMesh2: f.ComponentMesh = new f.ComponentMesh(mesh2);
        cube.addComponent(cmpMesh2);
        cube.addComponent(cmpMaterial);

        cube.addComponent(new f.ComponentTransform(new f.Matrix4x4()));
        cube.mtxLocal.translateX(1);

        node.addChild(cube);

        //create scene lighting

        let lightNode: f.Node = new f.Node("light");
        let light: f.LightDirectional = new f.LightDirectional(new f.Color(1, 0 , 0, 1));

        let cmpLight: f.ComponentLight = new f.ComponentLight(light);
        lightNode.addComponent(cmpLight);

        lightNode.addComponent(new f.ComponentTransform(new f.Matrix4x4()));
        lightNode.mtxLocal.translateY(10);
        
        viewport = new f.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        f.Debug.log(viewport);

        viewport.draw();
    }
}