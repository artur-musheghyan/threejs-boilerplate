import { AxesHelper, Color, DirectionalLight, Scene } from "three";
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
    this._buildGround();
    this._buildLight();
  }

  _buildLight(): void {
    const dirLight = new DirectionalLight(0xffffff);
    dirLight.position.set(-3, 4, 4);
    dirLight.intensity = 2;
    this.add(dirLight);
  }

  private _buildGround(): void {
    const ground = new GroundComponent();
    this.add((this._ground = ground));

    ground.geometry.computeBoundingSphere();
  }
}
