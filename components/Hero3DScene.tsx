"use client";

import { usePortfolioStore } from "@/lib/store";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ── Helpers ─────────────────────────────────────────────────── */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function createLabelTexture(method: string, endpoint: string, color: string, hovered: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 520;
  canvas.height = 140;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = hovered ? "rgba(10,14,28,0.97)" : "rgba(10,14,26,0.90)";
  roundRect(ctx, 0, 0, canvas.width, canvas.height, 38);
  ctx.fill();

  // Border
  ctx.strokeStyle = hovered ? color : "rgba(255,255,255,0.1)";
  ctx.lineWidth = hovered ? 3 : 2;
  ctx.stroke();

  // Glow when hovered
  if (hovered) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Method badge background
  ctx.fillStyle = hovered ? color + "22" : "rgba(255,255,255,0.05)";
  roundRect(ctx, 28, 34, 120, 54, 14);
  ctx.fill();

  // Method text
  ctx.font = "700 30px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillStyle = color;
  ctx.fillText(method, 44, 70);

  // Endpoint text
  ctx.font = "600 30px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(endpoint, 162, 70);

  // Subtitle
  ctx.font = "500 16px Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(180,196,220,0.75)";
  ctx.fillText("portfolio endpoint", 32, 112);

  // Hover indicator
  if (hovered) {
    ctx.font = "600 16px Inter, system-ui, sans-serif";
    ctx.fillStyle = color;
    ctx.textAlign = "right";
    ctx.fillText("● active", canvas.width - 28, 112);
    ctx.textAlign = "left";
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/* ── Endpoint definitions ────────────────────────────────────── */
const ENDPOINTS = [
  { method: "GET",  path: "/profile",  color: "#00ff88", position: [-2.65, 1.75, 0.4],  href: "#api"     },
  { method: "GET",  path: "/stack",    color: "#4d8fff", position: [2.5,   1.2, -0.25],  href: "#api"     },
  { method: "GET",  path: "/projects", color: "#ffb347", position: [-2.35,-1.35, 0.1],   href: "#work"    },
  { method: "POST", path: "/contact",  color: "#ff6b9d", position: [2.45, -1.55, 0.35],  href: "#contact" },
] as const;

/* ── Component ───────────────────────────────────────────────── */
export function Hero3DScene() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const readyRef   = useRef(false);
  const [webglReady, setWebglReady] = useState(false);

  const { setActiveEndpoint } = usePortfolioStore();
  const hoveredRef = useRef<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8);

    const root = new THREE.Group();
    scene.add(root);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);
    const blueLight = new THREE.PointLight(0x4d8fff, 70, 15);
    blueLight.position.set(-4, -1, 4);
    scene.add(blueLight);
    const greenLight = new THREE.PointLight(0x00ff88, 50, 12);
    greenLight.position.set(3, 2, 4);
    scene.add(greenLight);

    // Core icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.45, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0e1a,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.95,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      emissive: 0x0a1428,
      emissiveIntensity: 0.3,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);

    const edgeGeo = new THREE.EdgesGeometry(coreGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x4d8fff, transparent: true, opacity: 0.45 });
    const edges   = new THREE.LineSegments(edgeGeo, edgeMat);
    root.add(edges);

    // Rings
    const rings = [
      { radius: 2.25, color: 0x4d8fff, rotation: [Math.PI/2.2, 0.2, 0.3]     },
      { radius: 2.78, color: 0x00ff88, rotation: [Math.PI/2.8, 0.8, -0.35]   },
      { radius: 3.18, color: 0x00e5ff, rotation: [Math.PI/2.05, -0.45, 0.9]  },
    ] as const;
    const ringMeshes: THREE.Mesh[] = [];
    rings.forEach((ring) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(ring.radius, 0.012, 12, 180),
        new THREE.MeshBasicMaterial({ color: ring.color, transparent: true, opacity: 0.35 })
      );
      mesh.rotation.set(ring.rotation[0], ring.rotation[1], ring.rotation[2]);
      root.add(mesh);
      ringMeshes.push(mesh);
    });

    // Particles
    const particleCount = 260;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r     = 3.1 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0x4d8fff, size: 0.03, transparent: true, opacity: 0.5 })
    );
    root.add(particles);

    // Endpoint nodes + labels
    const labelTextures: THREE.Texture[]  = [];
    const labelSprites: THREE.Sprite[]    = [];
    const endpointDots: THREE.Mesh[]      = [];
    const spriteMaterials: THREE.SpriteMaterial[] = [];

    ENDPOINTS.forEach((ep) => {
      // Dot
      const dotMat = new THREE.MeshBasicMaterial({ color: ep.color });
      const dot    = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), dotMat);
      dot.position.set(ep.position[0] * 0.62, ep.position[1] * 0.62, ep.position[2]);
      root.add(dot);
      endpointDots.push(dot);

      // Label
      const tex = createLabelTexture(ep.method, ep.path, ep.color, false);
      labelTextures.push(tex);
      const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      spriteMaterials.push(spriteMat);
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(ep.position[0], ep.position[1], ep.position[2]);
      sprite.scale.set(1.9, 0.55, 1);
      labelSprites.push(sprite);
      root.add(sprite);
    });

    // Raycaster for hover
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();
    const pointer   = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      pointer.y = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      mouse.set(pointer.x, pointer.y);
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(labelSprites);
      if (hits.length > 0) {
        const idx   = labelSprites.indexOf(hits[0].object as THREE.Sprite);
        const ep    = ENDPOINTS[idx];
        if (ep?.href) window.location.href = ep.href;
      }
    };

    canvas.addEventListener("pointermove", onPointerMove as EventListener);
    canvas.addEventListener("click", onClick);
    window.addEventListener("pointermove", onPointerMove);

    let frame = 0;
    let animId = 0;
    let lastHovered: number | null = null;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth  ?? 720;
      const h = parent?.clientHeight ?? 560;
      const compact = w < 520;
      camera.aspect = w / h;
      camera.position.z = compact ? 9.8 : 8;
      root.scale.setScalar(compact ? 0.78 : 1);
      labelSprites.forEach((s) => s.scale.set(compact ? 1.52 : 1.9, compact ? 0.44 : 0.55, 1));
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const animate = () => {
      frame += 0.01;
      root.rotation.y += 0.004;
      root.rotation.x += (pointer.y * 0.12 - root.rotation.x) * 0.035;
      root.rotation.z += (pointer.x * 0.06 - root.rotation.z) * 0.03;
      core.rotation.x  += 0.006;
      core.rotation.y  += 0.008;
      edges.rotation.copy(core.rotation);
      particles.rotation.y -= 0.0018;

      blueLight.intensity  = 64 + Math.sin(frame * 2) * 8;
      greenLight.intensity = 45 + Math.cos(frame * 1.6) * 6;

      // Ring pulse on hover
      ringMeshes.forEach((ring, i) => {
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.32 + Math.sin(frame * 1.4 + i) * 0.06;
      });

      // Hover detection for labels
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(labelSprites);
      let newHovered: number | null = null;
      if (hits.length > 0) {
        newHovered = labelSprites.indexOf(hits[0].object as THREE.Sprite);
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }

      if (newHovered !== lastHovered) {
        lastHovered = newHovered;
        const ep = newHovered !== null ? ENDPOINTS[newHovered].path : null;
        if (hoveredRef.current !== ep) {
          hoveredRef.current = ep;
          setActiveEndpoint(ep);
        }
        // Rebuild label textures with hover state
        ENDPOINTS.forEach((endpoint, i) => {
          const isHov = i === newHovered;
          const oldTex = labelTextures[i];
          const newTex = createLabelTexture(endpoint.method, endpoint.path, endpoint.color, isHov);
          spriteMaterials[i].map = newTex;
          spriteMaterials[i].needsUpdate = true;
          oldTex.dispose();
          labelTextures[i] = newTex;

          // Scale up hovered dot
          const dot    = endpointDots[i];
          const target = isHov ? 0.16 : 0.1;
          dot.scale.lerp(new THREE.Vector3(target/0.1, target/0.1, target/0.1), 0.15);
        });
      }

      renderer.render(scene, camera);
      if (!readyRef.current && canvas.width > 300 && canvas.height > 250) {
        readyRef.current = true;
        setWebglReady(true);
      }
      animId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("pointermove", onPointerMove as EventListener);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      renderer.dispose();
      labelTextures.forEach((t) => t.dispose());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: "clamp(420px, 55vw, 600px)",
        borderRadius: "1.8rem",
        border: "1px solid var(--glass-border)",
        background: "var(--surface)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.5), inset 0 0 80px rgba(77,143,255,0.04)",
      }}
    >
      {/* Background radial gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(77,143,255,0.14), transparent 45%), radial-gradient(circle at 80% 15%, rgba(0,255,136,0.12), transparent 30%)",
        }}
      />

      {/* Fallback skeleton */}
      <div
        className={`absolute inset-0 z-10 grid place-items-center p-5 transition-opacity duration-700 ${webglReady ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <div className="grid w-full max-w-sm gap-3">
          {ENDPOINTS.map((ep) => (
            <div
              key={ep.path}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 font-mono text-sm"
              style={{ background: "#0c1120", border: "1px solid var(--glass-border)" }}
            >
              <span style={{ color: ep.color }}>{ep.method}</span>
              <span style={{ color: "var(--foreground)" }}>{ep.path}</span>
              <span className="ml-auto text-xs" style={{ color: "var(--muted)" }}>…</span>
            </div>
          ))}
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className={`relative h-full w-full transition-opacity duration-700 ${webglReady ? "opacity-100" : "opacity-0"}`}
        aria-label="Interactive 3D portfolio API visualization"
      />

      {/* Live API Map badge */}
      <div
        className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-mono font-semibold backdrop-blur"
        style={{
          borderColor: "rgba(0,255,136,0.3)",
          background: "rgba(0,255,136,0.08)",
          color: "var(--neon-green)",
        }}
      >
        <span className="relative size-2">
          <span className="absolute inset-0 rounded-full" style={{ background: "var(--neon-green)" }} />
          <span className="status-dot absolute inset-0 rounded-full" style={{ background: "var(--neon-green)" }} />
        </span>
        live API map
      </div>

      {/* Hover instruction */}
      <div
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border px-3 py-1.5 text-xs font-mono backdrop-blur whitespace-nowrap"
        style={{
          borderColor: "var(--glass-border)",
          background: "var(--glass)",
          color: "var(--muted)",
        }}
      >
        hover to explore · click to navigate
      </div>
    </div>
  );
}
