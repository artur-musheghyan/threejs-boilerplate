import { CameraHelper, PerspectiveCamera, Vector3 } from "three";
import { app, gui } from "../main";
import { DEBUG } from "./constants";

export class GameCamera extends PerspectiveCamera {
  private _helper: CameraHelper;

  constructor() {
    super(45, innerWidth / innerHeight, 30, 65);
    this.position.set(0, 40, 20);
    this._centralize();

    if (DEBUG) {
      // Add camera helper
      this._helper = new CameraHelper(this);
      app.scene.add(this._helper);

      // Add camera GUI
      const cameraUI = gui.addFolder("camera");
      cameraUI.add(this, "fov", 20, 100, 0.001).onChange(this._updateHelper);
      cameraUI.add(this, "near", 1, 30, 0.001).onChange(this._updateHelper);
      cameraUI.add(this, "far", 40, 200, 0.001).onChange(this._updateHelper);
      cameraUI.add(this.position, "x", -100, 100, 0.001);
      // .onChange(this._centralize);
      cameraUI.add(this.position, "y", -100, 100, 0.001);
      // .onChange(this._centralize);
      cameraUI.add(this.position, "z", -100, 100, 0.001);
      // .onChange(this._centralize);
      cameraUI.add(
        {
          lookAt: () => {
            this._centralize();
          },
        },
        "lookAt"
      );
    }
  }

  private _centralize = (): void => {
    this.lookAt(new Vector3(0, 0, 0));
  };

  private _updateHelper = (): void => {
    this._helper.update();
  };
}
