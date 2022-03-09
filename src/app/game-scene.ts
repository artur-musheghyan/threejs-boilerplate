// @ts-ignore
import anime from "animejs";
import { AxesHelper, Scene } from "three";
import { DEBUG } from "../constants/constants";
import { Easings } from "../utils/easings";
import { Brick } from "../views/brick";

export class GameScene extends Scene {
  constructor() {
    super();

    if (DEBUG) {
      const axesHelper = new AxesHelper(5);
      this.add(axesHelper);
    }
    this.scale.set(2, 2, 2);

    const brick = new Brick();
    brick.scale.set(1, 2, 4);
    this.add(brick);

    anime({
      targets: brick.position,
      z: -20,
      delay: 0,
      duration: 1000,
      direction: "alternate",
      easing: Easings.linear,
      loop: true,
    });

    const brick2 = new Brick();
    brick2.position.set(0, 0, -10);
    this.add(brick2);
  }
}
