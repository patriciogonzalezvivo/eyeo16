// Author: Patricio Gonzalez Vivo
// Title: Transmutatio

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


float plot(float value, float pct){
  return  smoothstep( pct-0.15, pct, value) - 
          smoothstep( pct, pct+0.15, value);
}

float aastep(float threshold, float value) {
  float afwidth = 0.1;
  return smoothstep(threshold-afwidth, threshold+afwidth, value);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = (st-.5)*.75+.5;
    if (u_resolution.y > u_resolution.x ) {
        st.y *= u_resolution.y/u_resolution.x;
        st.y -= (u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x;
    } else {
        st.x *= u_resolution.x/u_resolution.y;
        st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
    }
    
    vec3 color = vec3(0.0);
	vec2 pos = vec2(0.5)-st;
    float r = dot(pos,pos)*2.;
    
    float time = u_time*.33;
    float pattern = abs(sin((r-time*0.1)*PI));
    
    st.y += 0.655;
    vec3 S = simplexGrid(st*2.);

    float df2 = max(dot(S.xxx,S.zzz),max(dot(S.yyy,S.xxx),dot(S.yyy,S.zzz)));	// star to petals
    float df4 = max(dot(S.xy,S.xy),max(dot(S.xz,S.xz),dot(S.yz,S.yz)));	// Triangles to circle
    float df6 = max(dot(S.xy,S.xz),max(dot(S.xz,S.yz),dot(S.yz,S.yx)));	// Circles to Hexagons
    float df9 = abs(max(sin(S.x),max(sin(S.y),sin(S.z))));	// Hexagons IN

    float pct = mix(df9,1.,sin(time*0.1))*mix(df2,df4,abs(cos(time*0.2)))*mix(df6,1.,abs(cos(time*0.3)));
    float thr = aastep(0.5,plot(abs(cos(pct*5.+time)),r+0.06+pattern*0.4));
    
    color = mix(mix(vec3(0.550,0.008,0.374), 
                	vec3(0.000,1.000,0.991),
                	vec3(smoothstep(0., pct, time),
                    	 abs(cos(pct*5.+time)),
                     	 pct*pct)*pattern),
            	mix(vec3(0.000,0.912,0.886), 
                	vec3(1.000,0.989,0.000), 
                	vec3(smoothstep(0.,0.808, pct),
                    	 sin(pct*PI),
                     	 pct*pct))*thr,
                1.-smoothstep(thr-0.5,thr,pct))*smoothstep(0.336,0.556,1.-r);

    
    gl_FragColor = vec4(color,1.0);
}
