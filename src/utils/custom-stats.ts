import { WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module";

export class CustomStats {
  private _stats: Stats;
  private _renderer: WebGLRenderer;
  private _drawCallsPanel: Stats.Panel;

  constructor(renderer: WebGLRenderer) {
    this._renderer = renderer;
    this._stats = Stats();
    document.body.appendChild(this._stats.dom);
    // @ts-ignore
    this._drawCallsPanel = new Stats.Panel("DC", "#0ff", "#002");
    this._stats.addPanel(this._drawCallsPanel);
    this._stats.showPanel(3);
  }

  public update(): void {
    this._stats.update();
    this._drawCallsPanel.update(this._renderer.info.render.calls, 0);
  }
}
