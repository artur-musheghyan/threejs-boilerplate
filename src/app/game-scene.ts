import { AxesHelper, Euler, Scene } from "three";
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
    brick.setRotationFromEuler(new Euler(0, Math.PI / 3, 0));
    this.add(brick);

    const brick2 = new Brick();
    brick2.position.set(0, 0, -10);
    this.add(brick2);
  }
}
