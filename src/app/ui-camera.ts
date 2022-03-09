import { CameraHelper, OrthographicCamera } from "three";
import { DEBUG } from "../constants/constants";
import { app } from "./main";

const pixelSize = 100;

export class UICamera extends OrthographicCamera {
  private _helper: CameraHelper;

  constructor() {
    super(0, 0, 4, 4);
    this.position.set(0, 0, 200);
    this.updateRatio(innerWidth / innerHeight);
    this.near = 5;
    this.far = 300;

    if (DEBUG) {
      // Add camera helper
      this._helper = new CameraHelper(this);
      app.scene.add(this._helper);
      this.updateRatio(innerWidth / innerHeight);

      // Add camera GUI
      // const cameraUI = gui.addFolder("ui camera");
      // cameraUI.add(this, "near", 1, 200, 0.001).onChange(this._updateHelper);
      // cameraUI.add(this, "far", 10, 200, 0.001).onChange(this._updateHelper);
      // cameraUI.add(this.position, "x", -100, 100, 0.001);
      // cameraUI.add(this.position, "y", -100, 100, 0.001);
      // cameraUI.add(this.position, "z", -100, 100, 0.001);
    }
  }

  public updateRatio(ratio: number): void {
    const w = pixelSize * ratio;
    const h = pixelSize;
    this.left = -w / 2;
    this.right = w / 2;
    this.top = h / 2;
    this.bottom = -h / 2;
  }

  private _updateHelper = (): void => {
    this._helper.update();
  };
}
