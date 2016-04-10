// Author: Patricio Gonzalez Vivo
// Title: Jared Tarbell's Fractal Invaders 
// http://www.levitated.net/daily/levInvaderFractal.html

#ifdef GL_ES
precision mediump float;
#endif
                
uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(texture2D(u_tex0,fract(st/u_tex0Resolution)).xyz,vec3(-0.107,0.662,-0.336)))*43758.5453123);
}

float randomChar(vec2 outer,vec2 inner){
    float grid = 7.;
    vec2 margin = vec2(.15,.15);
    vec2 borders = step(margin,inner)*step(margin,1.-inner);
    vec2 ipos = floor(inner*grid);
    ipos = abs(ipos-vec2(3.,0.));
    return step(.5,random(outer*64.+ipos)) * borders.x * borders.y;
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
    vec3 color = vec3(0.0);

    float rows = 1.0;
    rows += floor(mod(u_time*0.1,12.));
    
    vec2 ipos = floor(st*rows);
    vec2 fpos = fract(st*rows);
    
    ipos.y += floor(u_time);

    float pct = 1.0;
    pct *= randomChar(ipos,fpos);

    color = vec3(pct);

    gl_FragColor = vec4(color , 1.0);
}