// Author: Patricio Gonzalez Vivo
// Title: 10 PRINT

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random (in vec2 st) { 
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float ratio = u_resolution.x/u_resolution.y;
    float scale = 50.;
    st.x *= ratio;
    
    float time = u_time*0.3;
    vec2 vel = vec2(0.,-floor(time));

    st *= scale;
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);

    vec2 tile = mix(fpos,vec2(1.0-fpos.x,fpos.y),step(.5,random(ipos + vel)));

    float color = 0.0;
    if (ipos.y > 0.0 || ipos.x < fract(time)*scale*ratio) {
        color = smoothstep(tile.x-0.2,tile.x,tile.y)-smoothstep(tile.x,tile.x+0.2,tile.y);
    }    

    gl_FragColor = vec4(vec3(color),1.0);
}