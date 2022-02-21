import * as dat from "dat.gui";
import { App } from "./app/app";

export const gui = new dat.GUI();

export const app = new App();
app.initialize();
