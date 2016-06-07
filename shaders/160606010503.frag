#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot (float value, float pct);
vec2 skew (vec2 st);
vec3 simplexGrid (vec2 st);
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d );

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = (st-.5)*0.75+.5;
    if (u_resolution.y > u_resolution.x ) {
        st.y *= u_resolution.y/u_resolution.x;
        st.y -= (u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x;
    } else {
        st.x *= u_resolution.x/u_resolution.y;
        st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
    }
    
    vec2 pos = vec2(0.5)-st;
	float time = u_time*.5;
    float r = dot(pos,pos)*2.;
    
    vec3 color = vec3(0.0);
    float t = smoothstep(0.,1.,abs(cos(time)));
	float pattern = sin(fract(r-time*0.5)*3.1415);

    st.y += 0.655;
    vec3 S = simplexGrid(st*2.);
    float df0 = abs(min(dot(S.zz,S.yy),min(dot(S.zz,S.xx),dot(S.xx,S.yy))));
    float df1 = max(dot(S.xxx,S.zzz),max(dot(S.yyy,S.xxx),dot(S.yyy,S.zzz)));
    float df2 = min(dot(S.xxx,S.zzz),min(dot(S.yyy,S.xxx),dot(S.yyy,S.zzz)));
    float df4 = max(dot(S.xy,S.xy),max(dot(S.xz,S.xz),dot(S.yz,S.yz)));
    float df6 = max(dot(S.xy,S.xz),max(dot(S.xz,S.yz),dot(S.yz,S.yx)));
    float df9 = abs(max(sin(S.x),max(sin(S.y),sin(S.z))));

    float pct = mix(df9,df6,sin(time*0.1))-
        		mix(df1,df2,abs(cos(time*0.2)))+
                mix(df4,df0,abs(cos(time*0.3)));
    
    float thr = step(0.5,plot(abs(cos(pct*5.+time)),r+0.06+pattern*0.4));
    
    color = palette(smoothstep(r,thr,pct),vec3(0.5,r,.5),vec3(0.5,pct,.5),vec3(2.,1.,thr),vec3(.5,.2,0.25))*(1.-r*2.);
    
    gl_FragColor = vec4(color,1.0);
}

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

// cosine based palette, 4 vec3 params
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
    return a + b*cos( 6.28318*(c*t+d) );
}














