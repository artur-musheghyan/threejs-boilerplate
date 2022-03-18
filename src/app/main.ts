import { lego } from "@armathai/lego";
import * as dat from "dat.gui";
import { mapPlayCommandsCommand } from "../commands/map-play-commands-command";
import { App } from "./app";

lego.command.execute(mapPlayCommandsCommand);

export const gui = new dat.GUI();

export const app = new App();
app.initialize();
