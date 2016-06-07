#define PI 3.14159265359	
#define TWO_PI 6.28318530718

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float cosLine(vec2 st, float freq, float width) {
    float d = (cos(st.x*3.)*.4*freq)+0.8;
    return smoothstep(d-width,d,st.y)-smoothstep(d,d+width,st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = (st-.5)*2.360+.5;
    if (u_resolution.y > u_resolution.x ) {
        st.y *= u_resolution.y/u_resolution.x;
        st.y -= (u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x;
    } 
    
	vec3 color = vec3(0.0);
    
    float width = 0.02;
    float t = u_time*.2;
    
    st = vec2(0.5)-st;
    float r = dot(st,st);
    float a = atan(st.y,st.x);
    vec2 polar =  vec2(a,r);
    
    float m = abs(mod(polar.x+t,PI))/PI;
    color += cosLine(polar,m,0.02)-m;

    polar.x += .31415;
    color = max(color,vec3(1.0)*cosLine(polar,m,0.022)*(1.-m));
    
    polar.x += .31415;
    color = max(color,vec3(1.0)*cosLine(polar,m,0.025)*(1.-m));
    
	gl_FragColor = vec4( color, 1.0 );
}