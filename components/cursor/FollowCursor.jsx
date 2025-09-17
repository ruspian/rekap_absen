"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export default function FollowCursor() {
  // motion value posisi cursor
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // animasi biar smooth
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      x.set(e.clientX - 100); // 100 = setengah width image (200/2)
      y.set(e.clientY - 100); // 100 = setengah height image
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <Image
        src="/salsaf.png"
        width={200}
        height={200}
        alt="Logo SMK Salafiyah Syafiiyah"
        className="mb-4"
      />
    </motion.div>
  );
}
