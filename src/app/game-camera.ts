import { CameraHelper, PerspectiveCamera, Vector3 } from "three";
import { DEBUG } from "../constants/constants";
import { app } from "./main";

export class GameCamera extends PerspectiveCamera {
  private _helper: CameraHelper;

  constructor() {
    super(60, innerWidth / innerHeight, 10, 65);
    this.position.set(0, 20, 20);
    this.lookAt(new Vector3(0, 0, 0));
    this._centralize();

    if (DEBUG) {
      // Add camera helper
      this._helper = new CameraHelper(this);
      app.scene.add(this._helper);

      // Add camera GUI
      // const cameraUI = gui.addFolder("camera");
      // cameraUI.add(this, "fov", 20, 100, 0.001).onChange(this._updateHelper);
      // cameraUI.add(this, "near", 1, 30, 0.001).onChange(this._updateHelper);
      // cameraUI.add(this, "far", 40, 200, 0.001).onChange(this._updateHelper);
      // cameraUI.add(this.position, "x", -100, 100, 0.001);
      // // .onChange(this._centralize);
      // cameraUI.add(this.position, "y", -100, 100, 0.001);
      // // .onChange(this._centralize);
      // cameraUI.add(this.position, "z", -100, 100, 0.001);
      // // .onChange(this._centralize);
      // cameraUI.add(
      //   {
      //     lookAt: () => {
      //       this._centralize();
      //     },
      //   },
      //   "lookAt"
      // );
    }
  }

  private _centralize = (): void => {
    this.lookAt(new Vector3(0, 0, 0));
  };

  private _updateHelper = (): void => {
    this._helper.update();
  };
}
