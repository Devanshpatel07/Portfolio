import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") !== null || 
        target.closest("a") !== null
      );
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        scale: isHovering ? 2 : 1,
        backgroundColor: isHovering ? "rgba(0, 255, 0, 0.2)" : "transparent",
      }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
    />
  );
}
