import { BoxGeometry, Mesh, MeshMatcapMaterial } from "three";

export class CoinComponent extends Mesh {
  private static customGeometry: BoxGeometry = new BoxGeometry(1, 1, 1);

  constructor() {
    super();
    this.geometry = CoinComponent.customGeometry;
    this.material = new MeshMatcapMaterial({ color: "yellow" });

    this.geometry.computeBoundingSphere();
  }
}
