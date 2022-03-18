import { AxesHelper, Scene, Sphere } from "three";
import { DEBUG } from "../constants/constants";
import { BrickComponent } from "../views/brick-component";
import { CoinComponent } from "../views/coin-component";
import { GroundComponent } from "../views/ground-component";
import { PlayerView } from "../views/player-view";

export class GameScene extends Scene {
  private _player: PlayerView;
  private _ground: GroundComponent;
  private _groundBounds: Sphere;
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

  public updateLoop(): void {
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
    this._buildPlayer();
    this._buildBricks();
    this._buildCoins();
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
