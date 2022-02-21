import { CameraHelper, OrthographicCamera } from "three";
import { DEBUG } from "../constants/constants";
import { app, gui } from "./main";

const pixelSize = 20;

export class UICamera extends OrthographicCamera {
  private _helper: CameraHelper;

  constructor() {
    super(-2, 4, -2, 4);
    this.position.set(-100, -100, -100);
    this.updateRatio(innerWidth / innerHeight);
    this.near = 5;
    this.far = 60;

    if (DEBUG) {
      // Add camera helper
      this._helper = new CameraHelper(this);
      app.scene.add(this._helper);

      // Add camera GUI
      const cameraUI = gui.addFolder("ui camera");
      cameraUI.add(this, "near", 1, 30, 0.001).onChange(this._updateHelper);
      cameraUI.add(this, "far", 40, 200, 0.001).onChange(this._updateHelper);
      cameraUI.add(this.position, "x", -100, 100, 0.001);
      cameraUI.add(this.position, "y", -100, 100, 0.001);
      cameraUI.add(this.position, "z", -100, 100, 0.001);
    }
  }

  public updateRatio(ratio: number): void {
    const w = pixelSize * ratio;
    const h = pixelSize;

    this.left = -w / 2;
    this.right = w;
    this.top = -h / 2;
    this.bottom = h;
  }

  private _updateHelper = (): void => {
    this._helper.update();
  };
}
