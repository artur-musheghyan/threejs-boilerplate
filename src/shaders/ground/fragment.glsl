precision mediump float;

varying float vDistance;

void main() 
{
  float a = smoothstep(0.0, 0.9, vDistance - 3.0 );

  gl_FragColor = vec4(0.8, 0.8, 0.8, 1.0);
  
  if(a > 0.9) {
    gl_FragColor.rgb = vec3(0.6, 0.6, 0.6);
  }
}