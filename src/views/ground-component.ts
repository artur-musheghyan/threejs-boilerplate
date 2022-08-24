import { CircleGeometry, Mesh, MeshStandardMaterial } from "three";

export class GroundComponent extends Mesh {
  private static customGeometry: CircleGeometry = new CircleGeometry(20, 30);

  constructor() {
    super();
    this.geometry = GroundComponent.customGeometry;
    this.material = new MeshStandardMaterial();
    this.rotation.x = -Math.PI * 0.5;
    this.receiveShadow = true;
  }
}
