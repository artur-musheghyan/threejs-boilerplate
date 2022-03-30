import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  Group,
  LoopOnce,
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { app } from "../app/main";

export class AvatarComponent extends Group {
  private _loader: GLTFLoader;
  private _dracoLoader = new DRACOLoader();
  private _model: Group;
  private _mixer: AnimationMixer;
  private _clips: Record<string, AnimationClip> | null = null;
  private _actions: Record<string, AnimationAction> | null = null;

  constructor() {
    super();
    this._loader = new GLTFLoader();

    this._dracoLoader.setDecoderPath("src/libs/draco/");
    this._dracoLoader.setDecoderConfig({ type: "js" });
    this._loader.setDRACOLoader(this._dracoLoader);

    this._loader.load("../../assets/character.glb", (gltf) => {
      this._model = gltf.scene;
      this._mixer = new AnimationMixer(this._model);
      this.add(this._model);

      this._initActions(gltf.animations);

      this.idle();
    });
  }

  public update(deltaTime: number): void {
    this._mixer && this._mixer.update(deltaTime);
  }

  public idle(): void {
    this._actions.run.fadeOut(0.3);
    this._actions.attack.fadeOut(0.3);
    this._actions.idle
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.3)
      .play();
  }

  public run(): void {
    this._actions.idle.fadeOut(0.3);
    this._actions.attack.fadeOut(0.3);
    this._actions.run
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.3)
      .play();
  }

  public attack(): void {
    this._actions.idle.fadeOut(0.3);
    this._actions.run.fadeOut(0.3);
    this._actions.attack
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.3)
      .play();
  }

  public showOutline(): void {
    app.outlinePass.selectedObjects = [this._model];
  }

  // public hideOutline(): void {
  //   // app.outlinePass.selectedObjects.find()
  // }

  private _initActions(animations: AnimationClip[]) {
    // Init clips array
    this._clips = {
      attack: animations[0],
      death: animations[1],
      hammerHide: animations[2],
      hammerShow: animations[3],
      hideRunning: animations[4],
      idle: animations[5],
      run: animations[6],
    };

    // Set up actions
    const hammerHideAction = this._mixer.clipAction(this._clips.hammerHide); // Additional animation
    const hammerShowAction = this._mixer.clipAction(this._clips.hammerShow); // Additional animation
    const hideRunningAction = this._mixer.clipAction(this._clips.hideRunning); // Additional animation
    const idleAction = this._mixer.clipAction(this._clips.idle);
    const runAction = this._mixer.clipAction(this._clips.run);

    const attackAction = this._mixer.clipAction(this._clips.attack);
    attackAction.clampWhenFinished = true;
    attackAction.loop = LoopOnce;

    const deathAction = this._mixer.clipAction(this._clips.death);
    deathAction.clampWhenFinished = true;
    deathAction.loop = LoopOnce;

    // Init actions array
    this._actions = {
      attack: attackAction,
      death: deathAction,
      hammerHide: hammerHideAction,
      hammerShow: hammerShowAction,
      hideRunning: hideRunningAction,
      idle: idleAction,
      run: runAction,
    };
  }
}
