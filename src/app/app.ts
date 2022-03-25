import {
  PerspectiveCamera,
  Raycaster,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { RotationJoystickControls } from "three-joystick";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { DEBUG, miniCameraSize } from "../constants/constants";
import { CustomStats } from "../utils/custom-stats";
import { GameCamera } from "./game-camera";
import { GameScene } from "./game-scene";
import { UICamera } from "./ui-camera";
import { UIScene } from "./ui-scene";

export class App {
  private _scene: GameScene;
  private _uiScene: UIScene;
  private _camera: GameCamera;
  private _debugCamera: PerspectiveCamera;
  private _uiCamera: UICamera;
  private _renderer: WebGLRenderer;
  private _stats: CustomStats;
  private _controls: OrbitControls;
  private _raycaster: Raycaster;
  private _joystickControls: RotationJoystickControls;
  private _effectComposer: EffectComposer;
  private _renderPass: RenderPass;
  private _outlinePass: OutlinePass;

  constructor() {
    // addEventListener("resize", this._onResize);
    document.addEventListener("pointermove", this._onPointerMove);
  }

  public get scene(): GameScene {
    return this._scene;
  }

  public get outlinePass(): OutlinePass {
    return this._outlinePass;
  }

  public get camera(): GameCamera {
    return this._camera;
  }

  public get renderer(): WebGLRenderer {
    return this._renderer;
  }

  public get stats(): CustomStats {
    return this._stats;
  }

  public initialize(): void {
    this._initScene();
    this._initGameCamera();
    this._initUICamera();
    this._initViewPortCamera();
    this._initRenderer();
    this._initStats();
    this._initControls();
    this._initJoystick();
    this._initEffectComposer();

    this._raycaster = new Raycaster();

    // Start update loop
    this._render();
  }

  private _initEffectComposer(): void {
    this._effectComposer = new EffectComposer(this._renderer);
    this._renderPass = new RenderPass(this._scene, this._camera);
    this._effectComposer.setSize(innerWidth, innerHeight);
    this._effectComposer.addPass(this._renderPass);
    this._outlinePass = new OutlinePass(
      new Vector2(innerWidth, innerHeight),
      this._scene,
      this._camera
    );

    this._effectComposer.addPass(this._outlinePass);
  }

  private _onPointerMove = (event: PointerEvent) => {
    const pointer = new Vector2();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this._raycaster.setFromCamera(pointer, this._uiCamera);
    const intersects = this._raycaster.intersectObjects(
      this._uiScene.children,
      false
    );

    if (intersects.length > 0) {
      // console.log("HIT", ...intersects.map((i) => i.object.name), intersects);
    }
  };

  // private _onResize = (): void => {
  //   this._adjustCanvasSize();
  // };

  private _adjustCanvasSize = (): void => {
    this._renderer.setSize(innerWidth, innerHeight);
    this._effectComposer.setSize(innerWidth, innerHeight);

    // this._camera.aspect = innerWidth / innerHeight;
    // this._camera.updateProjectionMatrix();
  };

  private _render = (): void => {
    // this._joystickControls.update();
    this._scene.updateLoop();

    const cameraDimensions = {
      width: innerWidth,
      height: innerHeight,
    };

    this._stats.update();
    this._adjustCanvasSize();

    this._renderer.autoClear = false;

    if (DEBUG) {
      cameraDimensions.width *= miniCameraSize;
      cameraDimensions.height *= miniCameraSize;
      this._renderer.setViewport(0, 0, innerWidth, innerHeight);
      this._debugCamera.aspect = innerWidth / innerHeight;
      this._debugCamera.updateProjectionMatrix();
      this._renderer.setScissor(0, 0, innerWidth, innerHeight);
      this._renderer.setScissorTest(true);
      // this._renderer.setClearColor(new Color(0.7, 0.5, 0.5));
      this._renderer.render(this._scene, this._debugCamera);
      this._renderer.render(this._uiScene, this._debugCamera);
    }

    // GameCamera
    this._renderer.setViewport(
      0,
      0,
      cameraDimensions.width,
      cameraDimensions.height
    );
    this._camera.aspect = innerWidth / innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setScissor(
      0,
      0,
      cameraDimensions.width,
      cameraDimensions.height
    );
    this._renderer.setScissorTest(true);
    // this._renderer.setClearColor(new Color(0.5, 0.5, 0.7));
    // this._renderer.render(this._scene, this._camera);
    this._effectComposer.render();

    // UICamera
    this._renderer.setViewport(
      0,
      0,
      cameraDimensions.width,
      cameraDimensions.height
    );

    this._uiCamera.updateRatio(innerWidth / innerHeight);
    this._uiCamera.updateProjectionMatrix();
    this._renderer.setScissor(
      0,
      0,
      cameraDimensions.width,
      cameraDimensions.height
    );
    this._renderer.setScissorTest(true);
    this._renderer.render(this._uiScene, this._uiCamera);

    requestAnimationFrame(() => this._render());
  };

  private _initScene = (): void => {
    this._scene = new GameScene();

    this._uiScene = new UIScene();

    this._uiScene.position.set(0, 0, 100);
  };

  private _initRenderer = (): void => {
    this._renderer = new WebGLRenderer({
      antialias: true,
      canvas: <HTMLCanvasElement>document.getElementById("main-canvas"),
    });
    this._renderer.setSize(innerWidth, innerHeight);
  };

  private _initGameCamera = (): void => {
    this._camera = new GameCamera();
  };

  private _initUICamera = (): void => {
    this._uiCamera = new UICamera();
  };

  private _initViewPortCamera = (): void => {
    if (DEBUG) {
      this._debugCamera = new PerspectiveCamera(
        60,
        innerWidth / innerHeight,
        0.1,
        10000
      );
      this._debugCamera.position.set(3, 3, 20);
      this._debugCamera.lookAt(new Vector3(0, 0, 0));
    }
  };

  private _initStats = (): void => {
    this._stats = new CustomStats(this._renderer);
  };

  private _initControls = (): void => {
    if (DEBUG) {
      this._controls = new OrbitControls(
        this._debugCamera,
        document.getElementById("main-canvas") as HTMLCanvasElement
      );
    }
  };

  private _initJoystick = (): void => {
    // this._joystickControls = new Joystick(this._camera, this._scene);
  };
}
