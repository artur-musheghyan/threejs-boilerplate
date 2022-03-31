precision mediump float;

varying float vDistance;

void main() 
{
  float a = smoothstep(0.0, 0.9, vDistance - 3.0 );

  gl_FragColor = vec4(0.0, 0.0, 1.0, 0.9);
  if(a > 0.9) {
    gl_FragColor = vec4(0.0, 0.0, 1.0, 0.0);
    // gl_FragColor.rgb = vec3(0.0, 0.0, 0.6);
  }
}