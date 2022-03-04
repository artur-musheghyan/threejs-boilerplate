import {
  AxesHelper,
  Scene,
  Sprite,
  SpriteMaterial,
  TextureLoader,
} from "three";
import { DEBUG } from "../constants/constants";
import { Brick } from "../views/brick";

export class UIScene extends Scene {
  public button: Sprite;
  public brick: Brick;

  constructor() {
    super();

    if (DEBUG) {
      const axesHelper = new AxesHelper(5);
      this.add(axesHelper);
    }

    const map = new TextureLoader().load("assets/images/button.png");

    const spriteMaterial = new SpriteMaterial({ map: map, color: 0xffffff });
    const sprite = new Sprite(spriteMaterial);
    sprite.scale.set(25.0, 9.0, 1.0);
    sprite.name = "button";
    this.add((this.button = sprite));

    const mapContent = new TextureLoader().load("assets/images/button.png");
    const contentMaterial = new SpriteMaterial({
      map: mapContent,
      color: 0xbbbbbb,
    });
    const content = new Sprite(contentMaterial);
    content.scale.set(0.4, 0.4, 1.0);
    // content.position.z = 2;
    content.name = "content";
    this.button.add(content);

    const brick = new Brick();
    brick.name = "cube";
    brick.position.set(1, 2, 1);
    this.add((this.brick = brick));
  }
}
