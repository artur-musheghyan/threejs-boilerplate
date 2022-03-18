import { lego } from "@armathai/lego";
import { JoystickEvent } from "../events/view";
import { onJoystickUpdateCommand } from "./on-joystick-update-command";

export const mapPlayCommandsCommand = (): void => {
  lego.command.on(JoystickEvent.update, onJoystickUpdateCommand);
};
