import { BoxGeometry, Mesh, MeshMatcapMaterial, Vector3 } from "three";
import { lerp } from "three/src/math/MathUtils";
// // @ts-ignore
// import fragmentShader from "../shaders/item/fragment.glsl";
// // @ts-ignore
// import vertexShader from "../shaders/item/vertex.glsl";

export class BrickComponent extends Mesh {
  private static customGeometry: BoxGeometry = new BoxGeometry(1, 1, 1);

  public alpha: number = 1;

  constructor() {
    super();
    this.geometry = BrickComponent.customGeometry;
    this.material = new MeshMatcapMaterial({
      color: 0x0000ff,
      transparent: true,
    });

    // new RawShaderMaterial({
    //   vertexShader,
    //   fragmentShader,
    //   transparent: true,
    //   uniforms: {
    //     uEpicenter: { value: new Vector3(0, 0, 0) },
    //   },
    // });
    // this.rotateY(Math.random() * Math.PI * 2);

    // const vertexCount = this.geometry.attributes.position.count;
    // const randoms = new Float32Array(vertexCount);
    // for (let i = 0; i < vertexCount; i++) {
    //   randoms[i] = Math.random();
    // }
  }

  public update(position: Vector3): void {
    // @ts-ignore
    const op = lerp(this.material.opacity, this.alpha, 0.1);
    // @ts-ignore
    this.material.opacity = op;

    // this.material.uniforms.uEpicenter.value = position;
  }
}
