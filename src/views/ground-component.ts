import { CircleGeometry, Mesh, MeshMatcapMaterial } from "three";

export class GroundComponent extends Mesh {
  private static geometry: CircleGeometry = new CircleGeometry(10, 30);

  constructor() {
    super();
    this.geometry = GroundComponent.geometry;
    this.material = new MeshMatcapMaterial();
    this.rotation.x = -Math.PI * 0.5;
  }
}
