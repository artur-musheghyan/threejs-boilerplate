import { CircleGeometry, Mesh, MeshMatcapMaterial, Vector3 } from "three";

export class GroundComponent extends Mesh {
  private static customGeometry: CircleGeometry = new CircleGeometry(10, 30);

  constructor() {
    super();
    this.geometry = GroundComponent.customGeometry;
    this.material = new MeshMatcapMaterial();
    // this.material = new RawShaderMaterial({
    //   vertexShader,
    //   fragmentShader,
    //   transparent: true,
    //   // wireframe: true,
    //   uniforms: {
    //     uEpicenter: { value: new Vector3(0, 0, 0) },
    //   },
    // });
    this.rotation.x = -Math.PI * 0.5;
  }

  public update(position: Vector3): void {
    // @ts-ignore
    // this.material.uniforms.uEpicenter.value = position;
  }
}
