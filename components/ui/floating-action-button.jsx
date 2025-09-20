"use client";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AnimatedFloatingButton({ icons, className, iconSize = 15 }) {
  const [active, setActive] = useState(false);

  const buttonSize = "size-10";

  return (
    <div
      className={cn(
        "w-full relative flex items-start justify-start",
        className
      )}
    >
      <div className="flex items-center justify-center relative gap-4 w-auto">
        <motion.div
          className="absolute left-0 bg-white w-full rounded-full z-10"
          animate={{
            x: active ? "calc(100% + 16px)" : 0,
          }}
          transition={{ type: "ease-in", duration: 0.5 }}
        >
          <motion.button
            className={cn(
              buttonSize,
              "rounded-full flex items-center justify-center",
              "bg-primary hover:bg-primary/90 transition-colors"
            )}
            onClick={() => setActive(!active)}
            animate={{ rotate: active ? 45 : 0 }}
            transition={{
              type: "ease-in",
              duration: 0.5,
            }}
          >
            <Plus
              size={iconSize}
              strokeWidth={3}
              className="text-primary-foreground"
            />
          </motion.button>
        </motion.div>

        {icons.map(({ Icon, href, className }, index) => (
          <motion.div
            key={index}
            className={cn(
              buttonSize,
              "rounded-full flex items-center justify-center",
              "bg-background  hover:shadow-xl",
              "border border-border",
              className
            )}
            animate={{
              filter: active ? "blur(0px)" : "blur(2px)",
              scale: active ? 1 : 0.9,
              rotate: active ? 0 : 45,
            }}
            transition={{
              type: "ease-in",
              duration: 0.4,
            }}
          >
            {href ? (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Icon
                  size={iconSize}
                  className="text-muted-foreground transition-all hover:text-foreground hover:scale-110"
                />
              </Link>
            ) : (
              <Icon
                size={iconSize}
                className="text-muted-foreground transition-all hover:text-foreground hover:scale-110"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
