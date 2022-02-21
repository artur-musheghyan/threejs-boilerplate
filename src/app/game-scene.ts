import { AxesHelper, Scene } from "three";
import { Brick } from "./brick";
import { DEBUG } from "./constants";

export class GameScene extends Scene {
  constructor() {
    super();

    if (DEBUG) {
      const axesHelper = new AxesHelper(5);
      this.add(axesHelper);
    }

    const brick = new Brick();
    this.add(brick);
  }
}
