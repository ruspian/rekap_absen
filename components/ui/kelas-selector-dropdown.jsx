import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

const languages = [
  { code: "X-TKJ", label: "X TKJ" },
  { code: "XI-TKJ", label: "XI TKJ" },
  { code: "XII-TKJ", label: "XII TKJ" },
  { code: "X-ATR", label: "X ATR" },
  { code: "XI-ATR", label: "XI ATR" },
  { code: "XII-ATR", label: "XII ATR" },
];

export const KelasDropdown = () => {
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm w-[200px] justify-between",
          "bg-white/60 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm",
          "border-gray-200 dark:border-neutral-700",
          "text-gray-800 dark:text-neutral-200",
          "hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all"
        )}
      >
        <span>{selected.label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      {/* Dropdown Menu */}
      {open && (
        <div
          className={cn(
            "absolute left-0 mt-2 w-48 rounded-xl overflow-hidden",
            "bg-white/90 dark:bg-neutral-900/95 backdrop-blur-xl",
            "shadow-lg border border-gray-200 dark:border-neutral-700",
            "animate-fade-in"
          )}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors",
                selected.code === lang.code
                  ? "font-semibold text-blue-600 dark:text-blue-400"
                  : "text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
              )}
            >
              <span className="flex-1">{lang.label}</span>
              {selected.code === lang.code && (
                <Check className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
