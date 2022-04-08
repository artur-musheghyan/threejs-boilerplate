import {
  AxesHelper,
  BoxGeometry,
  Mesh,
  MeshMatcapMaterial,
  Vector3,
} from "three";

export class PlayerView extends Mesh {
  private static customGeometry: BoxGeometry = new BoxGeometry(1.5, 1, 1);

  constructor() {
    super();
    this.geometry = PlayerView.customGeometry;
    this.geometry.translate(0, 0.5, 0);
    this.material = new MeshMatcapMaterial({ color: 0xff0000 });

    this.add(new AxesHelper(3));
  }

  public get direction(): Vector3 {
    return this.getWorldDirection(new Vector3());
  }

  public updatePosition(x: number, y: number, z: number): void {
    this.position.set(x, y, z);
  }
}
