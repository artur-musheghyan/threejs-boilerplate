import { BoxGeometry, Mesh, MeshMatcapMaterial } from "three";

export class Brick extends Mesh {
  private static customGeometry: BoxGeometry = new BoxGeometry(3, 3, 3);

  constructor() {
    super();
    this.geometry = Brick.customGeometry;
    this.material = new MeshMatcapMaterial();
  }
}
