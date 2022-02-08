import {
  AmbientLight,
  AnimationMixer,
  Color,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CustomStats } from "../utils/custom-stats";
import { Brick } from "./brick";

export class App {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
    60,
    innerWidth / innerHeight,
    0.1,
    10000
  );
  public readonly canvasElement = document.getElementById(
    "main-canvas"
  ) as HTMLCanvasElement;

  public readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: this.canvasElement,
  });

  private brick!: Brick;
  private fox!: GLTF;
  private _mixer!: AnimationMixer;
  private _stats: CustomStats;

  constructor() {
    var controls = new OrbitControls(this.camera, this.canvasElement);

    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.9;

    controls.minDistance = 0.2;
    controls.maxDistance = 200;

    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = Math.PI / 2; // radians

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // renderCalls.push(function () {
    //   controls.update();
    // });

    const gltfLoader = new GLTFLoader();
    this.scene.add(new AmbientLight(0x404040));

    const light = new PointLight(0xffffff, 1, 100);

    light.position.set(15, 15, 10);

    this.scene.add(light);

    // this.brick = new Brick();
    // this.scene.add(this.brick);

    // const a = new Brick();
    // this.scene.add(a);
    // a.position.set(4, 0, 0);
    // a.scale.set(2, 0.4, 1);

    // const b = new Brick();
    // this.scene.add(b);
    // b.position.set(-4, 0, 0);

    this.camera.position.set(-40, 40, 40);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color("rgb(160,160,160)"));

    // setTimeout(() => {
    //   console.warn(this.renderer.info.memory);
    //   // this.scene.remove(this.brick);
    // }, 1000);

    gltfLoader.load("/assets/FlightHelmet/glTF/FlightHelmet.gltf", (data) => {
      let object = data.scene;
      object.scale.set(10, 10, 10);
      object.position.set(0, 0, 0);
      this.scene.add(object);
      setTimeout(() => {
        object.children.forEach((mesh) => {
          (<Mesh>mesh).geometry.dispose();
          data.scene.traverse((child) => {
            // @ts-ignore
            if (child.material) {
              const {
                alphaMap,
                aoMap,
                bumpMap,
                displacementMap,
                emissiveMap,
                envMap,
                lightMap,
                map,
                metalnessMap,
                normalMap,
                roughnessMap,
              } = <MeshStandardMaterial>(<Mesh>child).material;
              alphaMap?.dispose();
              aoMap?.dispose();
              bumpMap?.dispose();
              displacementMap?.dispose();
              emissiveMap?.dispose();
              envMap?.dispose();
              lightMap?.dispose();
              map?.dispose();
              metalnessMap?.dispose();
              normalMap?.dispose();
              roughnessMap?.dispose();
            }
          });
        });

        this.scene.remove(object);
      }, 2000);
    });

    this._stats = new CustomStats(this.renderer);

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

    if (this._mixer) {
      this._mixer.update(0.01);
    }

    this.adjustCanvasSize();
    this._stats.update();
  }
}
