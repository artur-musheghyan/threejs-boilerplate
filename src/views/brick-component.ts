import { BoxGeometry, Mesh, MeshMatcapMaterial } from "three";

export class BrickComponent extends Mesh {
  private static customGeometry: BoxGeometry = new BoxGeometry(1, 1, 1);

  constructor() {
    super();
    this.geometry = BrickComponent.customGeometry;
    this.material = new MeshMatcapMaterial({ color: 0x00ff00 });

    this.geometry.computeBoundingSphere();
  }
}
