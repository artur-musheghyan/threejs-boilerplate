import { Euler, Group } from "three";
import { Brick } from "../views/brick";

export class GameView extends Group {
  constructor() {
    super();

    const brick = new Brick();
    brick.setRotationFromEuler(new Euler(0, Math.PI / 3, 0));
    this.add(brick);

    const brick2 = new Brick();
    brick2.position.set(0, 0, -10);
    this.add(brick2);
  }
}
