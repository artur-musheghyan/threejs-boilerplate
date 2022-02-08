import { WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module";

export class CustomStats {
  private _stats: Stats;
  private _renderer: WebGLRenderer;
  private _drawCallsPanel: Stats.Panel;
  private _texturesPanel: Stats.Panel;
  private _geometriesPanel: Stats.Panel;

  constructor(renderer: WebGLRenderer) {
    this._renderer = renderer;
    this._stats = Stats();
    document.body.appendChild(this._stats.dom);

    // @ts-ignore
    this._drawCallsPanel = new Stats.Panel("DC", "#0ff", "#002");
    // @ts-ignore
    this._texturesPanel = new Stats.Panel("TXTRS", "#0ff", "#002");
    // @ts-ignore
    this._geometriesPanel = new Stats.Panel("GEOM", "#0ff", "#002");

    this._stats.addPanel(this._drawCallsPanel);
    this._stats.addPanel(this._texturesPanel);
    this._stats.addPanel(this._geometriesPanel);

    this._stats.showPanel(3);
  }

  public update(): void {
    this._stats.update();
    this._drawCallsPanel.update(this._renderer.info.render.calls, 0);
    this._texturesPanel.update(this._renderer.info.memory.textures, 0);
    this._geometriesPanel.update(this._renderer.info.memory.geometries, 0);
  }
}
