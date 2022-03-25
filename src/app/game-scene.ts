import {
  AnimationMixer,
  AxesHelper,
  DirectionalLight,
  LoopOnce,
  Scene,
  Sphere,
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { DEBUG } from "../constants/constants";
import { BrickComponent } from "../views/brick-component";
import { CoinComponent } from "../views/coin-component";
import { GroundComponent } from "../views/ground-component";
import { PlayerView } from "../views/player-view";
import { app } from "./main";

export class GameScene extends Scene {
  public mixer: AnimationMixer;
  public loader = new GLTFLoader();
  public dracoLoader = new DRACOLoader();

  private _player: PlayerView;
  private _ground: GroundComponent;
  private _groundBounds: Sphere;
  private _bricks: BrickComponent[] = [];
  private _coins: CoinComponent[] = [];

  constructor() {
    super();

    this.dracoLoader.setDecoderPath("src/libs/draco/");
    this.dracoLoader.setDecoderConfig({ type: "js" });
    this.loader.setDRACOLoader(this.dracoLoader);

    if (DEBUG) {
      const axesHelper = new AxesHelper(5);
      this.add(axesHelper);
    }

    this._build();

    const dirLight = new DirectionalLight(0xffffff);
    dirLight.position.set(-3, 4, 4);
    dirLight.intensity = 2;
    this.add(dirLight);

    this.loader.load("../../assets/test_pers.glb", (gltf) => {
      const model = gltf.scene;
      const animations = gltf.animations;
      app.outlinePass.selectedObjects = [model];

      setInterval(() => {
        model.rotateY(0.001);
      });

      this.mixer = new AnimationMixer(model);

      const attackAction = this.mixer.clipAction(animations[0]);
      attackAction.clampWhenFinished = true;
      attackAction.loop = LoopOnce;

      const idleAction = this.mixer.clipAction(animations[1]);
      const runAction = this.mixer.clipAction(animations[2]);

      idleAction.play();

      this.mixer.addEventListener("finished", () => {
        attackAction.fadeOut(0.3);
        runAction.fadeIn(0.3);
        runAction
          .reset()
          .setEffectiveTimeScale(1)
          .setEffectiveWeight(1)
          .fadeIn(0.3)
          .play();
      });

      setInterval(() => {
        console.warn("attack");
        idleAction.fadeOut(0.3);
        runAction.fadeOut(0.3);

        attackAction.fadeIn(0.3);
        attackAction
          .reset()
          .setEffectiveTimeScale(1)
          .setEffectiveWeight(1)
          .fadeIn(0.3)
          .play();
      }, 4000);

      this.add(model);
    });
  }

  public get player(): PlayerView {
    return this._player;
  }

  public get ground(): GroundComponent {
    return this._ground;
  }

  public get groundBounds(): Sphere {
    return this._groundBounds;
  }

  public updateLoop(): void {
    this.mixer && this.mixer.update(0.04);

    this._bricks.forEach((brick) => {
      const sphere = new Sphere();
      // @ts-ignore
      sphere.copy(brick.geometry.boundingSphere);
      sphere.applyMatrix4(brick.matrix);

      if (this._player.visibleArea.intersectsSphere(sphere)) {
        brick.visible = true;
      } else {
        brick.visible = false;
      }
    });
  }

  private _build(): void {
    this._buildGround();
    // this._buildPlayer();
    // this._buildBricks();
    // this._buildCoins();
  }

  private _buildGround(): void {
    const ground = new GroundComponent();
    this.add((this._ground = ground));

    ground.geometry.computeBoundingSphere();
    // @ts-ignore
    const { center, radius } = ground.geometry.boundingSphere;
    this._groundBounds = new Sphere().set(center, radius);
  }

  private _buildPlayer(): void {
    const player = new PlayerView();
    this.add((this._player = player));
  }

  private _buildBricks(): void {
    for (let i = 0; i < 20; i++) {
      const brick = new BrickComponent();
      this.add(brick);
      this._bricks.push(brick);
      const { radius: r } = this._groundBounds;
      brick.position.set(
        Math.random() * 2 * r - r,
        0,
        Math.random() * 2 * r - r
      );
    }
  }

  private _buildCoins(): void {
    for (let i = 0; i < 10; i++) {
      const brick = new CoinComponent();
      this.add(brick);
      this._coins.push(brick);
      const { radius: r } = this._groundBounds;
      brick.position.set(
        Math.random() * 2 * r - r,
        0,
        Math.random() * 2 * r - r
      );
    }
  }
}
