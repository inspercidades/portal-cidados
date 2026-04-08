"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface InteractiveBuildingProps {
  ca: number;
  to: number;
}

export function InteractiveBuilding({ ca, to }: InteractiveBuildingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const updateRef = useRef<((ca: number, to: number) => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mobile = window.innerWidth < 768;
    const aspect = mobile ? 1080 / 1920 : 1920 / 1080;
    const frustumSize = 40;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect,
      frustumSize * aspect,
      frustumSize,
      -frustumSize,
      0.1,
      1000,
    );
    camera.position.set(40, 40, 40);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const TESTADA = 9;
    const DEPTH = 20;

    const boxMat = new THREE.MeshBasicMaterial({ color: "#61D6B2" });
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(TESTADA, 3, DEPTH),
      boxMat,
    );

    const groundMat = new THREE.MeshBasicMaterial({ color: "#3F3F3F" });
    const ground = new THREE.Mesh(
      new THREE.BoxGeometry(TESTADA, 0.1, DEPTH),
      groundMat,
    );

    if (mobile) {
      box.position.set(8, -12, -5);
      ground.position.set(8, -13.5, -5);
    } else {
      box.position.set(42, 1.5, -10.5);
      ground.position.set(42, 0, -10.5);
    }

    const axis = new THREE.Vector3(0, 1, 0);
    const angle = mobile ? -Math.PI / 80 : Math.PI / 64;
    box.rotateOnAxis(axis, angle);
    ground.rotateOnAxis(axis, angle);

    scene.add(box);
    scene.add(ground);

    const edgeMat = new THREE.LineBasicMaterial({ color: 0x3f3f3f });
    let edges = new THREE.EdgesGeometry(box.geometry);
    let wireframe = new THREE.LineSegments(edges, edgeMat);
    box.add(wireframe);

    updateRef.current = (newCA: number, newTO: number) => {
      if (newTO <= 0) return;

      box.remove(wireframe);
      wireframe.geometry.dispose();
      box.geometry.dispose();

      const height = (100 * newCA * 3) / newTO;
      const depth = (DEPTH * newTO) / 100;

      box.geometry = new THREE.BoxGeometry(TESTADA, height, depth);

      if (mobile) {
        box.position.set(21.5, height / 2, -1.5 + depth / 2);
      } else {
        box.position.y = height / 2;
        box.position.z = -20.3 + depth / 2;
      }

      edges = new THREE.EdgesGeometry(box.geometry);
      wireframe = new THREE.LineSegments(edges, edgeMat);
      box.add(wireframe);
    };

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    updateRef.current?.(ca, to);
  }, [ca, to]);

  return (
    <div
      id="container3d"
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20, opacity: 0 }}
    />
  );
}
