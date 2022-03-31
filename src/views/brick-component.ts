import { BoxGeometry, Mesh, RawShaderMaterial, Vector3 } from "three";
// @ts-ignore
import fragmentShader from "../shaders/item/fragment.glsl";
// @ts-ignore
import vertexShader from "../shaders/item/vertex.glsl";

export class BrickComponent extends Mesh {
  private static customGeometry: BoxGeometry = new BoxGeometry(1, 1, 1);

  constructor() {
    super();
    this.geometry = BrickComponent.customGeometry;
    this.material = new RawShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uEpicenter: { value: new Vector3(0, 0, 0) },
      },
    });

    this.onAfterRender = () => {
      //
    };

    console.log(this.geometry);

    // const vertexCount = this.geometry.attributes.position.count;
    // const randoms = new Float32Array(vertexCount);
    // for (let i = 0; i < vertexCount; i++) {
    //   randoms[i] = Math.random();
    // }
  }

  public update(position: Vector3): void {
    // @ts-ignore
    this.material.uniforms.uEpicenter.value = position;
  }
}
