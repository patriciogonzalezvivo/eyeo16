// Author: Paitricio Gonzalez Vivo
// Title: I Ching

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    // return texture2D(u_tex0,fract(st/u_tex0Resolution)).z;
    return fract(sin(dot(texture2D(u_tex0,fract(st/u_tex0Resolution)).yz,vec2(0.107,0.662)))*43758.5453123);
    // return fract(sin(dot(texture2D(u_tex0,fract(st/u_tex0Resolution)).xyz,vec3(-0.107,0.662,-0.336)))*43758.5453123);
}

float rect(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

float box(vec2 st, vec2 size){
    return 1.-rect(st,size);
}

float hex(vec2 st, float t){
    st = st*vec2(2.,6.);
    vec2 fpos = fract(st);
    vec2 ipos = floor(st);
    
    if (ipos.x == 1.0) {
        fpos.x = 1.-fpos.x;
    }
    fpos.x += .2;
    
    if (ipos.y < 0. || ipos.y > 5. || 
        ipos.x < 0. || ipos.x > 1. ) {
        return 1.;
    }
    
    float value = random(vec2(ipos.y, floor(t)));
    value = step(.5,value);
    
    return 1.0- mix(rect(fpos, vec2(1.,.7)),
            		rect(fpos, vec2(1.5,.7)),
               		value);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st = (st-.5)*1.328+.5;
    st.x *= u_resolution.x/u_resolution.y;
    st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
    
    float t = 1.+u_time;
    float df = mix(hex(st,t), hex(st,t+1.), fract(t));

    gl_FragColor = vec4(mix(vec3(0.),vec3(1.),step(0.7,df)),1.0);
}