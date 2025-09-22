"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PixelatedCanvas = ({
  src,
  width,
  height,
  className,
  cellSize = 5,
  shape = "square",
  backgroundColor = "#000000",
  interactive = false,
  distortionStrength = 2,
  distortionRadius = 100,
  distortionMode = "swirl",
  followSpeed = 0.1,
  jitterStrength = 0,
  jitterSpeed = 0,
  dropoutStrength = 0,
  tintColor = "#FFFFFF",
  tintStrength = 0.0,
  sampleAverage = false,
}: {
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  cellSize?: number;
  shape?: "square" | "circle";
  backgroundColor?: string;
  interactive?: boolean;
  distortionStrength?: number;
  distortionRadius?: number;
  distortionMode?: "swirl" | "bulge" | "pinch";
  followSpeed?: number;
  jitterStrength?: number;
  jitterSpeed?: number;
  dropoutStrength?: number;
  tintColor?: string;
  tintStrength?: number;
  sampleAverage?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgData, setImgData] = useState<ImageData | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentMousePos = useRef({ x: -1000, y: -1000 });

  const R = parseInt(tintColor.slice(1, 3), 16);
  const G = parseInt(tintColor.slice(3, 5), 16);
  const B = parseInt(tintColor.slice(5, 7), 16);

  const loadImage = useCallback(() => {
    if (!src) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = width || img.width;
      tempCanvas.height = height || img.height;
      const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
        setImgData(
          tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
        );
      }
    };
  }, [src, width, height]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !imgData) return;

    const w = width || imgData.width;
    const h = height || imgData.height;

    if (canvas) {
      canvas.width = w;
      canvas.height = h;
    }
    const render = () => {
      if (!ctx || !imgData) return;

      currentMousePos.current.x +=
        (mousePos.current.x - currentMousePos.current.x) * followSpeed;
      currentMousePos.current.y +=
        (mousePos.current.y - currentMousePos.current.y) * followSpeed;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);

      for (let y = 0; y < h; y += cellSize) {
        for (let x = 0; x < w; x += cellSize) {
          if (Math.random() < dropoutStrength) continue;

          const dx = x - currentMousePos.current.x;
          const dy = y - currentMousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let distortedX = x;
          let distortedY = y;

          if (dist < distortionRadius) {
            const angle = Math.atan2(dy, dx);
            const distortion =
              Math.pow(1 - dist / distortionRadius, 2) * distortionStrength;

            if (distortionMode === "swirl") {
              distortedX = x + Math.cos(angle + dist * 0.1) * distortion * 10;
              distortedY = y + Math.sin(angle + dist * 0.1) * distortion * 10;
            } else if (distortionMode === "bulge") {
              distortedX = x - dx * distortion;
              distortedY = y - dy * distortion;
            } else if (distortionMode === "pinch") {
              distortedX = x + dx * distortion;
              distortedY = y + dy * distortion;
            }
          }

          if (jitterStrength > 0) {
            const jitterAngle = Math.random() * Math.PI * 2;
            const jitterDist =
              Math.random() *
              jitterStrength *
              Math.sin(performance.now() * 0.001 * jitterSpeed);
            distortedX += Math.cos(jitterAngle) * jitterDist;
            distortedY += Math.sin(jitterAngle) * jitterDist;
          }

          const sampleX = Math.round(distortedX);
          const sampleY = Math.round(distortedY);

          if (sampleX >= 0 && sampleX < w && sampleY >= 0 && sampleY < h) {
            if (sampleAverage) {
              let r = 0,
                g = 0,
                b = 0,
                count = 0;
              for (let i = 0; i < cellSize; i++) {
                for (let j = 0; j < cellSize; j++) {
                  if (sampleX + j < w && sampleY + i < h) {
                    const index =
                      ((sampleY + i) * w + (sampleX + j)) * 4;
                    r += imgData.data[index];
                    g += imgData.data[index + 1];
                    b += imgData.data[index + 2];
                    count++;
                  }
                }
              }
              if (count > 0) {
                r /= count;
                g /= count;
                b /= count;
                ctx.fillStyle = `rgb(${r * (1 - tintStrength) + R * tintStrength}, ${
                  g * (1 - tintStrength) + G * tintStrength
                }, ${b * (1 - tintStrength) + B * tintStrength})`;
              }
            } else {
              const index = (sampleY * w + sampleX) * 4;
              const r = imgData.data[index];
              const g = imgData.data[index + 1];
              const b = imgData.data[index + 2];
              ctx.fillStyle = `rgb(${r * (1 - tintStrength) + R * tintStrength}, ${
                g * (1 - tintStrength) + G * tintStrength
              }, ${b * (1 - tintStrength) + B * tintStrength})`;
            }
          } else {
            ctx.fillStyle = backgroundColor;
          }

          if (shape === "circle") {
            ctx.beginPath();
            ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(x, y, cellSize, cellSize);
          }
        }
      }
      requestAnimationFrame(render);
    };

    render();
  }, [
    imgData,
    width,
    height,
    cellSize,
    shape,
    backgroundColor,
    distortionStrength,
    distortionRadius,
    distortionMode,
    followSpeed,
    jitterStrength,
    jitterSpeed,
    dropoutStrength,
    tintColor,
    tintStrength,
    sampleAverage,
    B, G, R
  ]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (interactive) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
    }
  };

  const handleMouseOut = () => {
    if (interactive) {
      mousePos.current = { x: -1000, y: -1000 };
    }
  };

  return (
    <motion.canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      className={cn(
        "bg-transparent",
        className
      )}
    />
  );
};