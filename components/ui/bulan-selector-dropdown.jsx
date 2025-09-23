import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

export const BulanDropdown = ({ data, value, onChange }) => {
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

  // cari kelas yang dipilih
  const selected = data.find((b) => b.id === value) || {
    namaBulan: "Pilih Bulan",
  };

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
        <span>{selected.namaBulan}</span>
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
          {/* Semua kelas */}
          <button
            onClick={() => {
              onChange("Pilih Bulan");
              setOpen(false);
            }}
            className={cn(
              "flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors",
              value === "Pilih Bulan"
                ? "font-semibold text-blue-600 dark:text-blue-400"
                : "text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
            )}
          >
            <span className="flex-1">Pilih Bulan</span>
            {value === "Pilih Bulan" && (
              <Check className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            )}
          </button>

          {data.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onChange(item.id); // kirim id ke parent
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors",
                value === item.id
                  ? "font-semibold text-blue-600 dark:text-blue-400"
                  : "text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
              )}
            >
              <span className="flex-1">{item.namaBulan}</span>
              {value === item.id && (
                <Check className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
