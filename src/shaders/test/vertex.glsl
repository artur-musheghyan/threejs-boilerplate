uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;
uniform vec3 uEpicenter;

// attribute vec2 uv;
// attribute vec3 normal;
attribute vec3 position;
attribute float aRandom;

varying float vRandom;
varying float vTime;
varying float vDistance;

void main() 
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float dist = distance(uEpicenter, vec3(modelPosition));

  modelPosition.z += aRandom * 0.2;
  // modelPosition = uEpicenter


  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vRandom = aRandom;
  vTime = uTime;
  vDistance = dist;
}