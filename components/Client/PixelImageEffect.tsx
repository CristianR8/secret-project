"use client";

import { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import cn from "@/utils/cn";

interface PixelImageEffectProps {
  image: StaticImageData | string;
  alt?: string;
  className?: string;
  color?: string;
  gridSize?: number;
}

const vertexShaderSource = `
precision highp float;

attribute vec2 aPosition;
attribute vec2 aUv;
varying vec2 vUv;

void main() {
  vUv = aUv;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform sampler2D uTexture;
varying vec2 vUv;

uniform vec2 uResolution;
uniform float uProgress;
uniform vec3 uColor;

uniform vec2 uContainerRes;
uniform float uGridSize;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec2 squaresGrid(vec2 vUv)
{
    float imageAspectX = 1.;
    float imageAspectY = 1.;

    float containerAspectX = uResolution.x/uResolution.y;
    float containerAspectY = uResolution.y/uResolution.x;

    vec2 ratio = vec2(
        min(containerAspectX / imageAspectX, 1.0),
        min(containerAspectY / imageAspectY, 1.0)
    );

    vec2 squareUvs = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    return squareUvs;
}

void main()
{
    float imageAspectX = uResolution.x/uResolution.y;
    float imageAspectY = uResolution.y/uResolution.x;
    
    float containerAspectX = uContainerRes.x/uContainerRes.y;
    float containerAspectY = uContainerRes.y/uContainerRes.x;

    vec2 ratio = vec2(
        min(containerAspectX / imageAspectX, 1.0),
        min(containerAspectY / imageAspectY, 1.0)
    );

    vec2 coverUvs = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // generate grid
    vec2 squareUvs = squaresGrid(coverUvs);
    float gridSize = uGridSize;
    vec2 grid = vec2(floor(squareUvs.x*gridSize)/gridSize,floor(squareUvs.y*gridSize)/gridSize);
    vec4 gridTexture = vec4(uColor,0.);
    
    // image texture    
    vec4 texture = texture2D(uTexture,coverUvs);
    float height = 0.2;

    float progress = (1.+height)-(uProgress*(1.+height+height)); //goes from 1+height to -height

    float dist = 1.-distance(grid.y,progress);

    float clampedDist = smoothstep(height,0.,distance(grid.y,progress));

    float randDist=step(1.-height*random(grid),dist);
    dist=step(1.-height,dist);
    
    float rand = random(grid); 

    float alpha = dist*(clampedDist+rand-0.5*(1.-randDist));
    alpha=max(0.,alpha);
    gridTexture.a = alpha;

    texture.rgba *= step(progress,grid.y);
    
    gl_FragColor = vec4(mix(texture,gridTexture,gridTexture.a));
}
`;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const hexToRgb = (hex: string) => {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16) / 255,
    g: parseInt(clean.slice(2, 4), 16) / 255,
    b: parseInt(clean.slice(4, 6), 16) / 255,
  };
};

const createShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (
  gl: WebGLRenderingContext,
  vertex: string,
  fragment: string,
) => {
  const vs = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
};

export default function PixelImageEffect({
  image,
  alt = "",
  className,
  color = "#ffffff",
  gridSize = 60,
}: PixelImageEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    }) as WebGLRenderingContext | null;
    if (!gl) {
      setHasError(true);
      return;
    }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
      setHasError(true);
      return;
    }

    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, "aPosition");
    const uvLoc = gl.getAttribLocation(program, "aUv");
    const uTextureLoc = gl.getUniformLocation(program, "uTexture");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uContainerResLoc = gl.getUniformLocation(program, "uContainerRes");
    const uProgressLoc = gl.getUniformLocation(program, "uProgress");
    const uGridSizeLoc = gl.getUniformLocation(program, "uGridSize");
    const uColorLoc = gl.getUniformLocation(program, "uColor");

    const buffer = gl.createBuffer();
    if (!buffer) {
      setHasError(true);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const quad = new Float32Array([
      -1, -1, 0, 0,
      1, -1, 1, 0,
      -1, 1, 0, 1,
      -1, 1, 0, 1,
      1, -1, 1, 0,
      1, 1, 1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

    const texture = gl.createTexture();
    if (!texture) {
      setHasError(true);
      return;
    }
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = typeof image === "string" ? image : image.src;

    const setCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uContainerResLoc) {
        gl.uniform2f(uContainerResLoc, rect.width, rect.height);
      }
    };

    const render = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress =
        (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const eased = easeOutCubic(clamp(progress, 0, 1));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      if (uProgressLoc) gl.uniform1f(uProgressLoc, eased);
      if (uGridSizeLoc) gl.uniform1f(uGridSizeLoc, gridSize);
      if (uColorLoc) {
        const rgb = hexToRgb(color);
        gl.uniform3f(uColorLoc, rgb.r, rgb.g, rgb.b);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const scheduleRender = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        render();
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
      scheduleRender();
    });
    resizeObserver.observe(container);

    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender);

    const handleImageReady = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img,
      );
      if (uTextureLoc) gl.uniform1i(uTextureLoc, 0);
      if (uResolutionLoc) {
        gl.uniform2f(uResolutionLoc, img.naturalWidth, img.naturalHeight);
      }
      setCanvasSize();
      setReady(true);
      scheduleRender();
    };

    img.onload = handleImageReady;
    img.onerror = () => {
      setHasError(true);
    };

    if (img.complete && img.naturalWidth > 0) {
      handleImageReady();
    }

    setCanvasSize();
    scheduleRender();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", scheduleRender);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [image, color, gridSize]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full transition-opacity duration-300",
          ready && !hasError ? "opacity-100" : "opacity-0",
        )}
      />
      <img
        src={typeof image === "string" ? image : image.src}
        alt={alt}
        className={cn(
          "absolute inset-0 z-0 h-full w-full object-cover",
          ready && !hasError && "invisible",
        )}
      />
    </div>
  );
}
