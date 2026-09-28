import { motion } from "framer-motion";

interface AuroraBackdropProps {
  variant?: "title" | "ambient";
}

export function AuroraBackdrop({ variant = "ambient" }: AuroraBackdropProps) {
  const isTitle = variant === "title";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[-20%] h-56 w-[140%] rounded-[50%] bg-ice blur-[80px]"
        style={{ top: isTitle ? "18%" : "-14%", opacity: isTitle ? 0.12 : 0.06, rotate: -8 }}
        animate={{ x: ["-4%", "4%", "-4%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-30%] h-64 w-[110%] rounded-[50%] bg-aurora blur-[90px]"
        style={{ top: isTitle ? "8%" : "-20%", opacity: isTitle ? 0.16 : 0.09, rotate: 10 }}
        animate={{ x: ["3%", "-5%", "3%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
