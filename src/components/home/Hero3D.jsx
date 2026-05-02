import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const mountRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Gold color
    const goldColor = new THREE.Color(0xD4AF37);
    const goldDark = new THREE.Color(0xA68A2A);
    const navyColor = new THREE.Color(0x0B1B3A);

    // --- Phone body ---
    const phoneGeo = new THREE.BoxGeometry(1.2, 2.4, 0.12, 2, 4, 1);
    const phoneMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d1f45,
      metalness: 0.9,
      roughness: 0.15,
      reflectivity: 1,
    });
    const phone = new THREE.Mesh(phoneGeo, phoneMat);
    scene.add(phone);

    // Rounded screen overlay
    const screenGeo = new THREE.PlaneGeometry(0.98, 2.1);
    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x061026,
      metalness: 0.1,
      roughness: 0.0,
      emissive: new THREE.Color(0x0B1B3A),
      emissiveIntensity: 0.5,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.07;
    phone.add(screen);

    // Gold frame edge
    const edgeGeo = new THREE.BoxGeometry(1.25, 2.45, 0.13);
    const edgeMat = new THREE.MeshPhysicalMaterial({
      color: 0xD4AF37,
      metalness: 1.0,
      roughness: 0.05,
      wireframe: false,
    });
    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.position.z = -0.005;
    phone.add(edge);
    phone.add(screen);

    // Camera notch
    const notchGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 16);
    const notchMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const notch = new THREE.Mesh(notchGeo, notchMat);
    notch.rotation.x = Math.PI / 2;
    notch.position.set(0, 1.1, 0.08);
    phone.add(notch);

    // Home button
    const btnGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 32);
    const btnMat = new THREE.MeshPhysicalMaterial({ color: 0xD4AF37, metalness: 1, roughness: 0.1 });
    const btn = new THREE.Mesh(btnGeo, btnMat);
    btn.rotation.x = Math.PI / 2;
    btn.position.set(0, -1.1, 0.08);
    phone.add(btn);

    // Screen icon grid
    const iconPositions = [
      [-0.28, 0.5], [0, 0.5], [0.28, 0.5],
      [-0.28, 0.15], [0, 0.15], [0.28, 0.15],
      [-0.28, -0.2], [0, -0.2], [0.28, -0.2],
    ];
    const iconColors = [0xD4AF37, 0x4A90D9, 0x50E3C2, 0xF5A623, 0xD4AF37, 0x7B68EE, 0x4A90D9, 0xD4AF37, 0x50E3C2];
    iconPositions.forEach(([x, y], i) => {
      const ig = new THREE.PlaneGeometry(0.18, 0.18);
      const im = new THREE.MeshStandardMaterial({ color: iconColors[i], emissive: new THREE.Color(iconColors[i]), emissiveIntensity: 0.3 });
      const icon = new THREE.Mesh(ig, im);
      icon.position.set(x, y, 0.005);
      screen.add(icon);
    });

    // --- Orbiting particles ---
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.8;
      const elevation = (Math.random() - 0.5) * 3;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = elevation;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xD4AF37, size: 0.04, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Gold rings ---
    const rings = /** @type {THREE.Mesh[]} */ ([]);
    [2.0, 2.6, 3.2].forEach((r, i) => {
      const ringGeo = new THREE.TorusGeometry(r, 0.008, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.15 - i * 0.04 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + i * 0.3;
      ring.rotation.y = i * 0.5;
      scene.add(ring);
      rings.push(ring);
    });

    // --- Floating cubes ---
    const cubes = /** @type {{ mesh: THREE.Mesh, angle: number, speed: number, yOffset: number }[]} */ ([]);
    for (let i = 0; i < 8; i++) {
      const cg = new THREE.BoxGeometry(0.08, 0.08, 0.08);
      const cm = new THREE.MeshPhysicalMaterial({ color: 0xD4AF37, metalness: 1, roughness: 0.1, transparent: true, opacity: 0.6 });
      const cube = new THREE.Mesh(cg, cm);
      const angle = (i / 8) * Math.PI * 2;
      cube.position.set(Math.cos(angle) * 2.0, (Math.random() - 0.5) * 2, Math.sin(angle) * 2.0);
      scene.add(cube);
      cubes.push({ mesh: cube, angle, speed: 0.003 + Math.random() * 0.003, yOffset: Math.random() * Math.PI * 2 });
    }

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const goldLight = new THREE.PointLight(0xD4AF37, 3, 8);
    goldLight.position.set(3, 2, 3);
    scene.add(goldLight);

    const blueLight = new THREE.PointLight(0x4A90D9, 2, 8);
    blueLight.position.set(-3, -2, 2);
    scene.add(blueLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 5, 5);
    scene.add(topLight);

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (/** @type {MouseEvent} */ e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', handleMouseMove);

    // Animation
    let frame = /** @type {number} */ (0);
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Phone rotation
      phone.rotation.y = Math.sin(t * 0.4) * 0.25 + mouseX * 0.3;
      phone.rotation.x = Math.cos(t * 0.3) * 0.1 + mouseY * 0.15;
      phone.position.y = Math.sin(t * 0.6) * 0.08;

      // Rings
      rings.forEach((r, i) => {
        r.rotation.y += 0.003 + i * 0.001;
        r.rotation.z += 0.001;
      });

      // Particles
      particles.rotation.y += 0.002;

      // Cubes
      cubes.forEach((c) => {
        c.angle += c.speed;
        c.mesh.position.x = Math.cos(c.angle) * 2.0;
        c.mesh.position.z = Math.sin(c.angle) * 2.0;
        c.mesh.position.y = Math.sin(t + c.yOffset) * 0.5;
        c.mesh.rotation.x += 0.02;
        c.mesh.rotation.y += 0.03;
      });

      // Gold light pulse
      goldLight.intensity = 3 + Math.sin(t * 2) * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      const w2 = mount.clientWidth;
      const h2 = mount.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      mount.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-none"
      style={{ minHeight: '400px' }}
    />
  );
}