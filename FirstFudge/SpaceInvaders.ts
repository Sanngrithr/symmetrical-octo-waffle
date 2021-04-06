namespace SpaceInvaders {
  import f = FudgeCore;
  window.addEventListener("load", init);
  let viewport: f.Viewport = new f.Viewport();
  let ship: Ship;
  let speedShip: number = 5;

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let space: f.Node = new f.Node("Space");
    ship = Ship.getInstance();
    space.addChild(ship);
    space.addChild(MotherShip.getInstance());

    let invaders: f.Node = new f.Node("Invaders");
    let columnCount: number = 11;
    let rowCount: number = 5;

    for (let row: number = 0; row < rowCount; ++row) {
      for (let column: number = 0; column < columnCount; ++column) {
        let pos: f.Vector2 = new f.Vector2();
        pos.x = (column - (columnCount - 1) / 2) * 15 / 13;
        pos.y = (row * 15 + 65) / 13;

        invaders.addChild(new Invader(pos));
      }
    }

    space.addChild(invaders);

    let barricades: f.Node = new f.Node("Barricades");
    let nBarricade: number = 4;

    for (let iBarricade: number = 0; iBarricade < nBarricade; ++iBarricade) {
      let pos: f.Vector2 = new f.Vector2();
      pos.x = (iBarricade - (nBarricade - 1) / 2) * 53 / 13;
      pos.y = 24 / 13;

      barricades.addChild(new Barricade(pos));
    }

    space.addChild(barricades);

    let projectiles: f.Node = new f.Node("Projectiles");

    let projectile0Pos: f.Vector2 = new f.Vector2();
    projectile0Pos.x = 0;
    projectile0Pos.y = 1;

    projectiles.addChild(new Projectile(projectile0Pos));

    let projectile1Pos: f.Vector2 = new f.Vector2();
    projectile1Pos.x = -45 / 13;
    projectile1Pos.y = 4;

    projectiles.addChild(new Projectile(projectile1Pos));

    space.addChild(projectiles);

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(18);
    cmpCamera.mtxPivot.translateY(77 / 13);
    cmpCamera.mtxPivot.rotateY(180);
    console.log(cmpCamera);

    viewport.initialize("Viewport", space, cmpCamera, canvas);
    viewport.draw();

    console.log(space);

    f.Loop.start(f.LOOP_MODE.TIME_REAL, 30);
    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
  }

  function update(_event: Event): void {
    // console.log(_event);
    let offset: number = speedShip * f.Loop.timeFrameReal / 1000;

    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT]))
      ship.mtxLocal.translateX(-offset);

    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]))
      ship.mtxLocal.translateX(+offset);

    viewport.draw();
  }
}