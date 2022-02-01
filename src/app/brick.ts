import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

export class Brick extends Mesh {
  constructor() {
    super();
    this.geometry = new BoxGeometry(3, 3, 3);
    this.material = new MeshPhongMaterial({
      color: 0x4040c0,
      shininess: 0.4,
      specular: 0x808080,
    });
  }
}
