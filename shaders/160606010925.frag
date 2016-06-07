// Author: Patricio Gonzalez Vivo
// Title: Spring

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359	

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 skew (vec2 st) {
    vec2 r = vec2(0.0);
    r.x = 1.1547*st.x;
    r.y = st.y+0.5*r.x;
    return r;
}

vec3 simplexGrid (vec2 st) {
    st *= 1.733;
    vec3 xyz = vec3(0.0);
    vec2 p = fract(skew(st));
    if (p.x > p.y) {
        xyz.xy = 1.0-vec2(p.x,p.y-p.x);
        xyz.z = p.y;
    } else {
        xyz.yz = 1.0-vec2(p.x-p.y,p.y);
        xyz.x = p.x;
    }

    return fract(xyz);
}

float aastep(float threshold, float value) {
  	float afwidth = 0.05;
  	return smoothstep(threshold-afwidth, threshold+afwidth, value);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = (st-.5)*.75+.5;
    st.x *= u_resolution.x/u_resolution.y;
    st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
    
    vec3 color = vec3(0.0);
	vec2 pos = vec2(0.5)-st;
    float r = dot(pos,pos)*2.;
    
    float time = 39.624+u_time*.33;
    float pattern = abs(sin((r-time*.5)));
    
    st += vec2(0.0,0.655);
    vec3 S = simplexGrid(st*2.);

    float df2 = max(dot(S.xxx,S.zzz),max(dot(S.yyy,S.xxx),dot(S.yyy,S.zzz)));	// star to petals
    float df3 = min(dot(S.xy,S.xy),min(dot(S.xz,S.xz),dot(S.yz,S.yz)));	// Flower
    float df4 = max(dot(S.xy,S.xy),max(dot(S.xz,S.xz),dot(S.yz,S.yz)));	// Triangles to circle
    float df5 = min(dot(S.xy,S.xz),min(dot(S.xz,S.yz),dot(S.yz,S.yx)));	// Flower to star
    float pct = mix(max(df2,df4),df5,abs(sin(time*.3)))-mix(-1.,df3,sin(time*0.1));
    
    color = mix(mix(vec3(0.930,0.054,0.027),
                    vec3(0.015,0.7452,0.738),  
                	vec3(smoothstep(0.,.8, pct*pattern),
                    	 sin(pct*3.1415)*pattern,
                     	 pct*pattern)),
                mix(vec3(0.000,0.912,0.886), 
                	vec3(1.000,0.008, 0.06), 
                	vec3(smoothstep(0.,0.808, pct),
                    	 sin(pct*3.1415),
                     	 pct*pct)),
                aastep(r+.8,abs(cos(pct*10.-time))) )*smoothstep(0.112,0.540,1.-r);
    
    gl_FragColor = vec4(color,1.0);
}