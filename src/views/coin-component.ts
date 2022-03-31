import { BoxGeometry, Mesh, RawShaderMaterial, Vector3 } from "three";
// @ts-ignore
import fragmentShader from "../shaders/coin/fragment.glsl";
// @ts-ignore
import vertexShader from "../shaders/coin/vertex.glsl";

export class CoinComponent extends Mesh {
  private static customGeometry: BoxGeometry = new BoxGeometry(1, 1, 1);

  constructor() {
    super();
    this.geometry = CoinComponent.customGeometry;
    this.material = new RawShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      // wireframe: true,
      uniforms: {
        uEpicenter: { value: new Vector3(0, 0, 0) },
      },
    });
  }

  public update(position: Vector3): void {
    // @ts-ignore
    this.material.uniforms.uEpicenter.value = position;
  }
}
