import { PerspectiveCamera, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DEBUG, miniCameraSize } from "../constants/constants";
import { CustomStats } from "../utils/custom-stats";
import { GameCamera } from "./game-camera";
import { GameScene } from "./game-scene";

export class App {
  private _scene: GameScene;
  private _camera: GameCamera;
  private _debugCamera: PerspectiveCamera;
  private _renderer: WebGLRenderer;
  private _stats: CustomStats;
  private _controls: OrbitControls;

  constructor() {
    //
  }

  public get scene(): GameScene {
    return this._scene;
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
    this._initViewPortCamera();
    this._initRenderer();
    this._initStats();
    this._initControls();

    // Start update loop
    this._render();
  }

  private _adjustCanvasSize = (): void => {
    this._renderer.setSize(innerWidth, innerHeight);
  };

  private _render = (): void => {
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
    this._renderer.render(this._scene, this._camera);

    requestAnimationFrame(() => this._render());
  };

  private _initScene = (): void => {
    this._scene = new GameScene();
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

  private _initViewPortCamera = (): void => {
    if (DEBUG) {
      this._debugCamera = new PerspectiveCamera(
        60,
        innerWidth / innerHeight,
        0.1,
        10000
      );
      this._debugCamera.position.set(70, 120, 100);
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
}
