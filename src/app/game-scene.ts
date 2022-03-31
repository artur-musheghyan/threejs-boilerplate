import {
  AnimationMixer,
  AxesHelper,
  DirectionalLight,
  Scene,
  Sphere,
} from "three";
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { DEBUG } from "../constants/constants";
import { AvatarComponent } from "../views/avatar-component";
import { BrickComponent } from "../views/brick-component";
import { CoinComponent } from "../views/coin-component";
import { GroundComponent } from "../views/ground-component";
import { PlayerView } from "../views/player-view";

export class GameScene extends Scene {
  public mixer: AnimationMixer;

  private _player: PlayerView;
  private _ground: GroundComponent;
  private _groundBounds: Sphere;
  private _avatar: AvatarComponent;
  private _bricks: BrickComponent[] = [];
  private _coins: CoinComponent[] = [];

  constructor() {
    super();

    if (DEBUG) {
      const axesHelper = new AxesHelper(5);
      this.add(axesHelper);
    }

    this._build();
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

  public update(deltaTime: number): void {
    this._avatar && this._avatar.update(deltaTime);

    this._bricks.forEach((b) => b.update(this._player.position));
    this._coins.forEach((c) => c.update(this._player.position));
    this._ground.update(this._player.position);

    // Manually hide/show bricks depended on the distance from player
    // this._bricks.forEach((brick) => {
    //   const sphere = new Sphere();
    //   // @ts-ignore
    //   sphere.copy(brick.geometry.boundingSphere);
    //   sphere.applyMatrix4(brick.matrix);

    //   if (this._player.visibleArea.intersectsSphere(sphere)) {
    //     brick.visible = true;
    //   } else {
    //     brick.visible = false;
    //   }
    // });
  }

  private _build(): void {
    this._buildGround();
    this._buildLight();
    this._buildAvatar();
    this._buildPlayer();
    this._buildBricks();
    this._buildCoins();
  }

  _buildLight(): void {
    const dirLight = new DirectionalLight(0xffffff);
    dirLight.position.set(-3, 4, 4);
    dirLight.intensity = 2;
    this.add(dirLight);
  }

  private _buildAvatar(): void {
    this._avatar = new AvatarComponent();
    this.add(this._avatar);
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
        1,
        Math.random() * 2 * r - r
      );
    }
  }
}
