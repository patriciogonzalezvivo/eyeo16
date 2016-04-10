// Author: 
// Title: 

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 random3 (in vec2 st) {
    return texture2D(u_tex0,fract(st/u_tex0Resolution)).xyz;
}

vec2 random2 (in vec2 st) {
    vec3 rnd = random3(st);
    return max(rnd.xy,rnd.zz);
}

float random (in vec2 st) {
    return dot(random3(st),vec3(.49,.00246,.01432));
}

float random (in float x) { 
    return random(vec2(0.5,x));
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    if (u_resolution.y > u_resolution.x ) {
        st.y *= u_resolution.y/u_resolution.x;
    } else {
        st.x *= u_resolution.x/u_resolution.y;
    }
    
    st.y += u_time*0.05;
    float t = 1.0 + u_time*1.0;
    vec2 grid = vec2(50.0,80.);
    st *= grid;
    
    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction
    
    vec2 vel = vec2(t*50.); // Speed 
    vel *= vec2(-1.,0.) * random(1.+ipos.y); // Acceleration

    vec2 pos = floor(st+vel);
    vec3 color = vec3(0.);
    color = smoothstep(0.116,1.,random3(pos));
    color *= step(0.4,fpos.y);
    
    gl_FragColor = vec4(color,1.0);
}