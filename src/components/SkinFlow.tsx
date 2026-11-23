"use client";
import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uScroll; uniform vec2 uMouse; uniform float uMouseOn;
uniform vec3 uRipple; uniform vec3 uBgA; uniform vec3 uBgB; uniform vec3 uLine; uniform float uDensity; uniform float uDim;
out vec4 o;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
 const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0.,.5,1.,2.);
 vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
 vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
 vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
 i=mod289(i);
 vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
 float n_=.142857142857; vec3 ns=n_*D.wyz-D.xzx;
 vec4 j=p-49.*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
 vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.-abs(x)-abs(y);
 vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
 vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.; vec4 sh=-step(h,vec4(0.));
 vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
 vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
 vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
 p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
 vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
 return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){ float a=.55,s=0.; for(int i=0;i<4;i++){ s+=a*snoise(p); p*=2.03; a*=.48; } return s; }
void main(){
 vec2 uv=gl_FragCoord.xy/uRes;
 vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y;
 vec2 m=(uMouse-.5*uRes)/uRes.y;
 vec2 d=p-m; float r=length(d);
 float press=uMouseOn*exp(-r*r*14.);
 p-=d*press*.55;
 // ripple de toque
 if(uRipple.z>0.){ vec2 rp=(uRipple.xy-.5*uRes)/uRes.y; vec2 rd=p-rp; float rr=length(rd); float age=uRipple.z;
   p+=normalize(rd+1e-5)*sin(rr*34.-age*9.)*exp(-age*1.4)*exp(-rr*2.5)*.025; }
 float v=fbm(vec3(p*1.25,uTime*.02+uScroll*.6));
 float n=v*uDensity;
 float w=fwidth(n);
 float line=1.-clamp(abs(fract(n)-.5)/(w*1.15),0.,1.);
 float alpha=mix(.07,.15,smoothstep(-.4,.6,v));
 alpha=mix(alpha,.42,press);
 alpha*=mix(1.,uDim,smoothstep(.62,.1,uv.x));
 vec3 bg=mix(uBgA,uBgB,smoothstep(0.,1.,uv.y*.8+.1));
 vec3 col=mix(bg,uLine,line*alpha);
 col+=uLine*.10*uMouseOn*exp(-r*r*5.);
 o=vec4(col,1.);
}`;

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

export default function SkinFlow({ className = "", bgA = "#08211D", bgB = "#0C2E29", line = "#C8B08A", density = 9, dim = 0.5 }:
  { className?: string; bgA?: string; bgB?: string; line?: string; density?: number; dim?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    const scale = 0.75; const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let w = 0, h = 0, raf = 0, visible = true, running = true, last = 0, slow = false, frames = 0, acc = 0;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: 0, ton: 0 };
    const ripple = { x: 0, y: 0, t: -1 };
    const start = performance.now();
    const resize = () => { const r = canvas.getBoundingClientRect(); w = Math.max(1, Math.floor(r.width * dpr * scale)); h = Math.max(1, Math.floor(r.height * dpr * scale)); canvas.width = w; canvas.height = h; };
    resize();

    if (!gl) { // fallback canvas 2D: curvas estáticas de fluxo
      const c = canvas.getContext("2d")!; c.fillStyle = bgA; c.fillRect(0, 0, w, h);
      c.strokeStyle = line; c.globalAlpha = 0.12; c.lineWidth = 1;
      for (let k = 0; k < 28; k++) { c.beginPath(); for (let x = 0; x <= w; x += 8) { const y = (k / 28) * h + Math.sin(x * 0.006 + k * 0.7) * 30 + Math.sin(x * 0.013 + k) * 12; if (x) c.lineTo(x, y); else c.moveTo(x, y); } c.stroke(); }
      return;
    }
    const sh = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const prog = gl.createProgram()!; gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = { res: U("uRes"), time: U("uTime"), scroll: U("uScroll"), mouse: U("uMouse"), on: U("uMouseOn"), rip: U("uRipple") };
    gl.uniform3fv(U("uBgA"), hex(bgA)); gl.uniform3fv(U("uBgB"), hex(bgB)); gl.uniform3fv(U("uLine"), hex(line));
    gl.uniform1f(U("uDensity"), density); gl.uniform1f(U("uDim"), dim);

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.08; mouse.y += (mouse.ty - mouse.y) * 0.08; mouse.on += (mouse.ton - mouse.on) * 0.05;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(u.res, w, h); gl.uniform1f(u.time, t * 20 * 0.05);
      gl.uniform1f(u.scroll, window.scrollY / window.innerHeight);
      gl.uniform2f(u.mouse, mouse.x, mouse.y); gl.uniform1f(u.on, mouse.on);
      gl.uniform3f(u.rip, ripple.x, ripple.y, ripple.t >= 0 ? t - ripple.t : -1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !running) return;
      const dt = now - last;
      if (slow && dt < 1000 / 45) return;
      if (frames < 60) { acc += dt; frames++; if (frames === 60 && acc / 60 > 24) { slow = true; } }
      last = now; draw(now);
    };
    // Performance: 1 quadro estático quando o navegador fica ocioso; a animação só começa
    // na primeira interação real (mouse, toque, scroll, teclado). Mantém o LCP/TBT limpos.
    const idle = (cb: () => void) => ("requestIdleCallback" in window ? (window as unknown as { requestIdleCallback: (c: () => void, o: object) => number }).requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 600));
    idle(() => draw(start + 4000));
    let started = false;
    const kick = () => { if (started || reduce) return; started = true; raf = requestAnimationFrame(loop); evs.forEach((e) => window.removeEventListener(e, kick)); };
    const evs = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"];
    evs.forEach((e) => window.addEventListener(e, kick, { passive: true }));

    const toLocal = (cx: number, cy: number) => { const r = canvas.getBoundingClientRect(); return [(cx - r.left) * (w / r.width), h - (cy - r.top) * (h / r.height)]; };
    const onMove = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; const [x, y] = toLocal(e.clientX, e.clientY); mouse.tx = x; mouse.ty = y; if (mouse.x < -999) { mouse.x = x; mouse.y = y; } mouse.ton = 1; };
    const onLeave = () => { mouse.ton = 0; };
    const onDown = (e: PointerEvent) => { if (e.pointerType === "mouse") return; const [x, y] = toLocal(e.clientX, e.clientY); ripple.x = x; ripple.y = y; ripple.t = (performance.now() - start) / 1000; };
    const host = canvas.parentElement!;
    host.addEventListener("pointermove", onMove); host.addEventListener("pointerleave", onLeave); host.addEventListener("pointerdown", onDown);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "100px" }); io.observe(canvas);
    const onVis = () => { running = !document.hidden; }; document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(start + 4000); }); ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); evs.forEach((e) => window.removeEventListener(e, kick)); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); host.removeEventListener("pointerdown", onDown); };
  }, [bgA, bgB, line, density, dim]);
  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
}
