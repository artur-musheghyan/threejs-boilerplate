precision mediump float;

varying float vDistance;

void main() 
{
  float a = smoothstep(0.0, 0.9, vDistance - 3.0 );

  gl_FragColor = vec4(1.000, 0.833, 0.224, 1.0);
  
  if(a > 0.9) {
    gl_FragColor.rgb = vec3(0.8, 0.6, 0.1);
  }
}