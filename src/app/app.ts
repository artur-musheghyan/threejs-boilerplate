import {
  AmbientLight,
  AnimationMixer,
  Color,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Brick } from "./brick";

export class App {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
    60,
    innerWidth / innerHeight,
    0.1,
    10000
  );
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });

  private brick: Brick;

  constructor() {
    const gltfLoader = new GLTFLoader();
    this.scene.add(new AmbientLight(0x404040));

    const light = new PointLight(0xffffff, 1, 100);

    light.position.set(15, 15, 10);

    this.scene.add(light);

    this.brick = new Brick();
    this.scene.add(this.brick);

    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color("rgb(0,0,0)"));

    gltfLoader.load("/assets/Fox/glTF/Fox.gltf", (gltf) => {
      gltf.scene.scale.set(0.025, 0.025, 0.025);
      gltf.scene.position.set(-2, 0, 1);
      this.scene.add(gltf.scene);

      // Animation
      const mixer = new AnimationMixer(gltf.scene);
      const action = mixer.clipAction(gltf.animations[2]);
      action.play();
    });

    this.render();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());

    this.adjustCanvasSize();
  }
}
