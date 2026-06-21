"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function createLabelTexture(method: string, endpoint: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 520;
  canvas.height = 150;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(16, 24, 39, 0.92)";
  roundRect(context, 0, 0, canvas.width, canvas.height, 38);
  context.fill();
  context.strokeStyle = "rgba(255, 255, 255, 0.13)";
  context.lineWidth = 2;
  context.stroke();

  context.font = "700 34px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = color;
  context.fillText(method, 40, 88);

  context.font = "600 34px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "#ffffff";
  context.fillText(endpoint, 142, 88);

  context.font = "500 18px Inter, system-ui, sans-serif";
  context.fillStyle = "rgba(203, 213, 225, 0.85)";
  context.fillText("portfolio endpoint", 40, 122);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function roundRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

export function Hero3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(false);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
      });
    } catch {
      canvas.dataset.webgl = "unavailable";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8);

    const root = new THREE.Group();
    scene.add(root);

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const blueLight = new THREE.PointLight(0x2454ff, 70, 15);
    blueLight.position.set(-4, -1, 4);
    scene.add(blueLight);

    const limeLight = new THREE.PointLight(0xa3e635, 40, 12);
    limeLight.position.set(3, 2, 4);
    scene.add(limeLight);

    const coreGeometry = new THREE.IcosahedronGeometry(1.45, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111827,
      roughness: 0.28,
      metalness: 0.28,
      transparent: true,
      opacity: 0.94,
      clearcoat: 0.7,
      clearcoatRoughness: 0.24,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    root.add(core);

    const edgeGeometry = new THREE.EdgesGeometry(coreGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x8fb4ff, transparent: true, opacity: 0.55 });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    root.add(edges);

    const rings = [
      { radius: 2.25, color: 0x2454ff, rotation: [Math.PI / 2.2, 0.2, 0.3] },
      { radius: 2.78, color: 0xa3e635, rotation: [Math.PI / 2.8, 0.8, -0.35] },
      { radius: 3.18, color: 0x38bdf8, rotation: [Math.PI / 2.05, -0.45, 0.9] },
    ] as const;

    rings.forEach((ring) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(ring.radius, 0.012, 12, 180),
        new THREE.MeshBasicMaterial({ color: ring.color, transparent: true, opacity: 0.42 }),
      );
      mesh.rotation.set(ring.rotation[0], ring.rotation[1], ring.rotation[2]);
      root.add(mesh);
    });

    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 3.1 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x2454ff,
        size: 0.025,
        transparent: true,
        opacity: 0.55,
      }),
    );
    root.add(particles);

    const endpoints = [
      { method: "GET", path: "/profile", color: "#a3e635", position: [-2.65, 1.75, 0.4] },
      { method: "GET", path: "/stack", color: "#38bdf8", position: [2.5, 1.2, -0.25] },
      { method: "GET", path: "/projects", color: "#fbbf24", position: [-2.35, -1.35, 0.1] },
      { method: "POST", path: "/contact", color: "#fda4af", position: [2.45, -1.55, 0.35] },
    ] as const;

    const labelTextures: THREE.Texture[] = [];
    const labelSprites: THREE.Sprite[] = [];
    endpoints.forEach((endpoint) => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 24, 24),
        new THREE.MeshBasicMaterial({ color: endpoint.color }),
      );
      sphere.position.set(endpoint.position[0] * 0.62, endpoint.position[1] * 0.62, endpoint.position[2]);
      root.add(sphere);

      const texture = createLabelTexture(endpoint.method, endpoint.path, endpoint.color);
      labelTextures.push(texture);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
      sprite.position.set(endpoint.position[0], endpoint.position[1], endpoint.position[2]);
      sprite.scale.set(1.85, 0.54, 1);
      labelSprites.push(sprite);
      root.add(sprite);
    });

    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    let frame = 0;
    let animationId = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? 720;
      const height = parent?.clientHeight ?? 560;
      const compact = width < 520;
      camera.aspect = width / height;
      camera.position.z = compact ? 9.8 : 8;
      root.scale.setScalar(compact ? 0.78 : 1);
      labelSprites.forEach((sprite) => {
        sprite.scale.set(compact ? 1.48 : 1.85, compact ? 0.43 : 0.54, 1);
      });
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const animate = () => {
      frame += 0.01;
      root.rotation.y += 0.004;
      root.rotation.x += (pointer.y * 0.12 - root.rotation.x) * 0.035;
      root.rotation.z += (pointer.x * 0.06 - root.rotation.z) * 0.03;
      core.rotation.x += 0.006;
      core.rotation.y += 0.008;
      edges.rotation.copy(core.rotation);
      particles.rotation.y -= 0.0018;
      blueLight.intensity = 64 + Math.sin(frame * 2) * 7;
      renderer.render(scene, camera);
      if (!readyRef.current && canvas.width > 300 && canvas.height > 250) {
        readyRef.current = true;
        setWebglReady(true);
      }
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      particleGeometry.dispose();
      labelTextures.forEach((texture) => texture.dispose());
    };
  }, []);

  return (
    <div className="relative h-[420px] min-h-[420px] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_30px_100px_var(--shadow)] backdrop-blur sm:h-[560px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(36,84,255,0.14),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(163,230,53,0.18),transparent_28%)]" />
      <div className={`absolute inset-0 z-10 grid place-items-center p-5 transition-opacity ${webglReady ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <div className="grid w-full max-w-sm gap-3">
          {[
            ["GET", "/profile", "text-lime-300"],
            ["GET", "/stack", "text-sky-300"],
            ["GET", "/projects", "text-orange-300"],
            ["POST", "/contact", "text-rose-300"],
          ].map(([method, endpoint, color]) => (
            <div key={endpoint} className="rounded-2xl bg-[#101827] px-4 py-3 font-mono text-sm text-white shadow-lg">
              <span className={color}>{method}</span> <span>{endpoint}</span>
            </div>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} className={`relative h-full w-full transition-opacity ${webglReady ? "opacity-100" : "opacity-0"}`} aria-label="Interactive 3D portfolio API visualization" />
      <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] shadow-sm backdrop-blur">
        live API map
      </div>
    </div>
  );
}
