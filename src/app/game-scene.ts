import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  Euler,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Vector3,
} from "three";
import { degToRad } from "three/src/math/MathUtils";
import { DEBUG } from "../constants/constants";
import { GroundComponent } from "../views/ground-component";

export class GameScene extends Scene {
  private _ground: GroundComponent;

  constructor() {
    super();

    if (DEBUG) {
      const axesHelper = new AxesHelper(5);
      this.add(axesHelper);
    }

    this.background = new Color(0x506680);

    this._build();
  }

  public get ground(): GroundComponent {
    return this._ground;
  }

  private _build(): void {
    this._buildLight();
    this._buildGridHelper();
    this._buildGround();
    this._buildPlane();
  }

  _buildLight(): void {
    this.add(new AmbientLight(0xffffff, 0.4));
    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 80;
    this.add(dirLight);

    const v = new Vector3(0, 0, 40);
    v.applyEuler(new Euler(degToRad(-30), degToRad(-30), degToRad(0), "YZX"));
    dirLight.castShadow = true;
    dirLight.position.copy(v);

    this.add(new DirectionalLightHelper(dirLight));
    // this.add(new CameraHelper(dirLight.shadow.camera));
  }

  private _buildGround(): void {
    const ground = new GroundComponent();
    this.add((this._ground = ground));

    ground.geometry.computeBoundingSphere();
  }

  private _buildGridHelper(): void {
    this.add(new GridHelper(100, 10, 0x9f1414, 0x0c1445));
  }

  private _buildPlane(): void {
    // const geom = new PlaneGeometry(10, 3, 1, 1);
    const geom = new BoxGeometry(2, 2, 2);
    const mat = new MeshStandardMaterial({
      side: DoubleSide,
    });
    const mesh = new Mesh(geom, mat);
    mesh.position.set(0, 3, 0);
    mesh.castShadow = true;

    this.add(mesh);
  }
}
