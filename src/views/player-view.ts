import {
  BoxGeometry,
  Mesh,
  MeshMatcapMaterial,
  Ray,
  Sphere,
  Triangle,
  Vector3,
} from "three";

export class PlayerView extends Mesh {
  private static customGeometry: BoxGeometry = new BoxGeometry(1.5, 1, 1);

  private _visibleArea: Sphere;
  private _selectionArea: Triangle;
  private _ray: Ray;

  constructor() {
    super();
    this.geometry = PlayerView.customGeometry;
    this.geometry.translate(0, 0.5, 0);
    this.material = new MeshMatcapMaterial({ color: 0xff0000 });

    this._visibleArea = new Sphere(new Vector3(0, 0, 0), 3);
    this._selectionArea = new Triangle(
      new Vector3(0, 0, 0),
      new Vector3(1, 0, 0.5),
      new Vector3(1, 0, -0.5)
    );
    this._ray = new Ray(new Vector3(0, 0, 0));
  }

  public updatePosition(x: number, y: number, z: number): void {
    this.position.set(x, y, z);
    this._visibleArea.center.set(x, 0, z);
    this._selectionArea.set(
      new Vector3(x, y, z),
      new Vector3(x + 1, y, z + 0.5),
      new Vector3(x + 1, y, z - 0.5)
    );
    this._ray.applyMatrix4(this.matrix);
    this._ray.origin.normalize();
  }

  public get visibleArea(): Sphere {
    return this._visibleArea;
  }

  public get selectionArea(): Triangle {
    return this._selectionArea;
  }
}
