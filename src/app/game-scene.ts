import { AxesHelper, Scene } from "three";
import { DEBUG } from "../constants/constants";
import { Brick } from "../views/brick";

export class GameScene extends Scene {
  constructor() {
    super();

    if (DEBUG) {
      const axesHelper = new AxesHelper(5);
      this.add(axesHelper);
    }

    const brick = new Brick();
    this.add(brick);

    const uiBrick = new Brick();
    uiBrick.position.set(-100, -100, -120);
    this.add(uiBrick);
  }
}
