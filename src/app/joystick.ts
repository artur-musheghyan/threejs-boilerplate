import { lego } from "@armathai/lego";
import { Object3D, PerspectiveCamera, Scene, Vector2 } from "three";
import { RotationJoystickControls } from "three-joystick";
import { JoystickEvent } from "../events/view";

export class Joystick extends RotationJoystickControls {
  constructor(camera: PerspectiveCamera, scene: Scene) {
    super(camera, scene, new Object3D());
  }

  public update = () => {
    const movement = this.getJoystickMovement();

    if (movement) {
      const { moveX, moveY } = movement;
      const vec = new Vector2(moveX, moveY);
      vec.normalize();

      lego.event.emit(JoystickEvent.update, vec);
      return;
    }

    lego.event.emit(JoystickEvent.update, new Vector2(0, 0));
    return;
  };
}
