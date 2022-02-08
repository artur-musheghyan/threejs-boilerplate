import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { CustomStats } from "../utils/custom-stats";

export class App {
  private _scene: Scene;
  private _camera: PerspectiveCamera;
  private _renderer: WebGLRenderer;
  private _stats: CustomStats;

  constructor() {
    this._initScene();
    this._initCamera();
    this._initRenderer();
    this._initStats();

    // Start update loop
    this._render();

    addEventListener("resize", this._onResize);
  }

  private _onResize = (): void => {
    this._adjustCanvasSize();
  };

  private _adjustCanvasSize = (): void => {
    this._renderer.setSize(innerWidth, innerHeight);

    this._camera.aspect = innerWidth / innerHeight;
    this._camera.updateProjectionMatrix();
  };

  private _render = (): void => {
    this._stats.update();

    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(() => this._render());
  };

  private _initScene = (): void => {
    this._scene = new Scene();
  };

  private _initRenderer = (): void => {
    this._renderer = new WebGLRenderer({
      antialias: true,
      canvas: <HTMLCanvasElement>document.getElementById("main-canvas"),
    });
    this._renderer.setSize(innerWidth, innerHeight);
    this._renderer.setClearColor(new Color("rgb(160,160,160)"));
  };

  private _initCamera = (): void => {
    this._camera = new PerspectiveCamera(
      60,
      innerWidth / innerHeight,
      0.1,
      10000
    );

    this._camera.position.set(-40, 40, 40);
    this._camera.lookAt(new Vector3(0, 0, 0));
  };

  private _initStats = (): void => {
    this._stats = new CustomStats(this._renderer);
  };
}
