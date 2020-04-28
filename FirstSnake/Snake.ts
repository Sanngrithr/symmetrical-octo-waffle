namespace FirstFudge {
    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let snakeViewport: f.Viewport;

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let snake: f.Node = new f.Node("Snake");

        
        let mesh: f.MeshQuad = new f.MeshQuad();
        
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));

        for (let _i: number = 0; _i <= 3; _i++) {

            let snakeSquare: f.Node = new f.Node("square");

            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
            snakeSquare.addComponent(cmpMesh);

            let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
            snakeSquare.addComponent(cmpMaterial);

            snakeSquare.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(new f.Vector3(-_i, 0, 0))));

            snake.appendChild(snakeSquare);
        }

        

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        
        viewport = new f.Viewport();
        viewport.initialize("Viewport", snake, cmpCamera, canvas);
        f.Debug.log(viewport);

        viewport.draw();
    }
}