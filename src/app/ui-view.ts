import { Group, Sprite, SpriteMaterial, TextureLoader } from "three";
import { Brick } from "../views/brick";

export class UIView extends Group {
  constructor() {
    super();

    const brick2 = new Brick();
    brick2.position.set(0, 0, -10);
    this.add(brick2);

    const map = new TextureLoader().load("assets/images/button.png");
    const spriteMaterial = new SpriteMaterial({ map: map, color: 0xffffff });
    const sprite = new Sprite(spriteMaterial);
    sprite.position.set(0, 0, -10);
    sprite.scale.set(25, 9, 0);
    this.add(sprite);
  }
}
