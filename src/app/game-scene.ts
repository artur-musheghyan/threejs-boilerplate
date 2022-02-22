import { AxesHelper, Scene } from "three";
import { DEBUG } from "../constants/constants";
import { GameView } from "./game-view";
import { UIView } from "./ui-view";

export class GameScene extends Scene {
  constructor() {
    super();

    if (DEBUG) {
      const axesHelper = new AxesHelper(5);
      this.add(axesHelper);
    }

    const gameView = new GameView();
    this.add(gameView);

    const uiView = new UIView();
    uiView.position.set(-100, -100, -120);
    this.add(uiView);
  }
}
