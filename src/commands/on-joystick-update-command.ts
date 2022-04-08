import { Vector2, Vector3 } from "three";
import { app } from "../app/main";

export const onJoystickUpdateCommand = (normal: Vector2): void => {
  if (!normal.length()) {
    return;
  }

  const velocityScalar = 0.04;
  normal.multiplyScalar(velocityScalar);

  const angle = normal.angle();

  const { x: dx, y: dy } = normal;

  const { camera, scene } = app;
  const { player, groundBounds } = scene;

  const { x, z } = player.position;

  if (groundBounds.containsPoint(new Vector3(x + dx, 0, z + dy))) {
    player.updatePosition(x + dx, 0, z + dy);
    camera.updateFollowingPosition(player.position);
  }

  player.rotation.set(0, -angle + Math.PI / 2, 0);
};
