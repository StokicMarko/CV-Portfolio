import { useEffect, useRef } from "react";
import "./contour.css";

const FRAME_MS = 1000 / 30;
const FRAME_TOLERANCE_MS = 2;
const MAX_STEP_MS = FRAME_MS * 3;
const PAUSE_AFTER_SELECTOR = "#projects";

const VERTEX = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;
out vec4 outColor;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(11.7, 5.3);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.y;
  vec2 p = uv * 1.1 + vec2(0.0, u_scroll * 0.35);
  float t = u_time * 0.04;

  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  float f = fbm(p + 1.6 * q + t * 0.5);

  float md = length(uv - u_mouse);
  f += 0.04 * exp(-md * md * 4.0);

  float lv = f * 5.0;
  float g = abs(fract(lv - 0.5) - 0.5) / fwidth(lv);
  float line = 1.0 - smoothstep(0.3, 1.5, g);

  float major = step(abs(mod(floor(lv + 0.5), 3.0)), 0.5);
  float alpha = line * (0.26 + 0.16 * major);

  vec3 col = vec3(0.03, 0.02, 0.14);
  outColor = vec4(col * alpha, alpha);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function createProgram(gl) {
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  return program;
}

function whenLinked(gl, program, isDisposed) {
  const parallelCompile = gl.getExtension("KHR_parallel_shader_compile");

  return new Promise((resolve) => {
    const check = () => {
      if (isDisposed()) {
        resolve(false);
        return;
      }
      const stillCompiling =
        parallelCompile &&
        !gl.getProgramParameter(program, parallelCompile.COMPLETION_STATUS_KHR);
      if (stillCompiling) {
        requestAnimationFrame(check);
        return;
      }
      const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!linked) console.error(gl.getProgramInfoLog(program));
      resolve(linked);
    };
    check();
  });
}

function startRendering(gl, canvas, program) {
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const loc = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (name) => gl.getUniformLocation(program, name);
  const uRes = u("u_res");
  const uTime = u("u_time");
  const uMouse = u("u_mouse");
  const uScroll = u("u_scroll");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouse = { x: -10, y: -10, tx: -10, ty: -10 };
  let raf = 0;
  let clock = 0;
  let previousFrame = 0;
  let scrolledPastProjects = false;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  const draw = () => {
    mouse.x += (mouse.tx - mouse.x) * 0.1;
    mouse.y += (mouse.ty - mouse.y) * 0.1;

    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, clock / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uScroll, window.scrollY / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    const elapsed = now - previousFrame;
    if (elapsed < FRAME_MS - FRAME_TOLERANCE_MS) return;
    clock += Math.min(elapsed, MAX_STEP_MS);
    previousFrame = now;
    draw();
  };

  const syncLoop = () => {
    const shouldRun = !reduced && !document.hidden && !scrolledPastProjects;
    if (shouldRun && !raf) {
      previousFrame = performance.now();
      raf = requestAnimationFrame(tick);
    } else if (!shouldRun && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const onPointer = (e) => {
    mouse.tx = e.clientX / window.innerHeight;
    mouse.ty = 1 - e.clientY / window.innerHeight;
  };

  const onResize = () => {
    resize();
    draw();
  };

  const projectsSection = document.querySelector(PAUSE_AFTER_SELECTOR);
  const projectsObserver = new IntersectionObserver(([entry]) => {
    scrolledPastProjects =
      !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
    syncLoop();
  });
  if (projectsSection) projectsObserver.observe(projectsSection);

  resize();
  draw();
  syncLoop();
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", syncLoop);
  if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

  return () => {
    cancelAnimationFrame(raf);
    projectsObserver.disconnect();
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", syncLoop);
    window.removeEventListener("pointermove", onPointer);
  };
}

export default function ContourBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2", { antialias: false });
    if (!gl) return;

    let disposed = false;
    let stopRendering = () => {};

    const program = createProgram(gl);
    whenLinked(gl, program, () => disposed).then((linked) => {
      if (linked && !disposed) stopRendering = startRendering(gl, canvas, program);
    });

    return () => {
      disposed = true;
      stopRendering();
    };
  }, []);

  return <canvas ref={canvasRef} className="contour-bg" aria-hidden="true" />;
}
