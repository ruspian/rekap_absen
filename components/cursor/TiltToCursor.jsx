"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function TiltToCursor() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // biar animasinya halus
  const smoothX = useSpring(rotateX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(rotateY, { stiffness: 50, damping: 30 });

  const imgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // hitung posisi relatif kursor
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      // skala supaya rotasinya nggak terlalu ekstrem
      const rotateAmount = 20; // max derajat miring
      const newRotateY = (offsetX / rect.width) * rotateAmount;
      const newRotateX = -(offsetY / rect.height) * rotateAmount;

      rotateX.set(newRotateX);
      rotateY.set(newRotateY);
    };

    const resetTilt = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetTilt);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetTilt);
    };
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={imgRef}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformStyle: "preserve-3d",
      }}
      className="w-[200px] h-[200px] mx-auto mt-20"
    >
      <Image
        src="/salsaf.png"
        width={200}
        height={200}
        alt="Logo SMK Salafiyah Syafiiyah"
      />
    </motion.div>
  );
}
