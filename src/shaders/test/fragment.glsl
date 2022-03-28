precision mediump float;

uniform vec3 uEpicenter;

varying float vRandom;
varying float vTime;
varying float vDistance;

void main() 
{
  float a = smoothstep(0.0, 0.9, vDistance - 3.0 );

  gl_FragColor = vec4(0.0, 0.0, vRandom, 0.9);
  if(a > 0.9) {
    gl_FragColor.rgb = vec3(0.6, 0.6, 0.6);
  }
}