// Author: Paitricio Gonzalez Vivo
// Title: DataStream

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in float x) {
    return fract(sin(x)*1e4);
}

float random (in vec2 st) { 
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float noise (in float x) {
    float i = floor(x);
    float f = fract(x);
    float u = f * f * (3.0 - 2.0 * f);
    return mix(random(i), random(i + 1.0), u);
}

float pattern(vec2 st, vec2 v, float t) {
    vec2 p = floor(st+v);
    return step(t, random(100.+p*.000001)+random(p.x)*0.5 );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    if (u_resolution.y > u_resolution.x ) {
        st.y *= u_resolution.y/u_resolution.x;
    } else {
        st.x *= u_resolution.x/u_resolution.y;
    }
    
    float t = 43.0 + u_time*1.0;
    vec2 grid = vec2(10.0,30.);
    st *= grid;
    
    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction
    
    vec2 vel = vec2(t*50.); // Speed 
    vel *= vec2(-1.,0.0) * random(1.0+ipos.y) - vec2(0.1,0.); // Acceleration

    float amount = .5+noise(t*0.05);	// Croudness
    
    vec3 color = vec3(0.);
    color = vec3(pattern(st,vel,amount));
    
    // Margins
    color *= step(0.4,fpos.y);

    gl_FragColor = vec4(color,1.0);
}