import TiltToCursor from "@/components/cursor/TiltToCursor";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";
import { LiquidButton } from "@/components/ui/shadcn-io/liquid-button";
import { TextGenerateEffect } from "@/components/ui/shadcn-io/text-generate-effect";
import Image from "next/image";

export default function Home() {
  return (
    <AuroraBackground>
      <Image
        src="/smk.png"
        width={100}
        height={100}
        alt="Logo SMK Salafiyah Syafiiyah"
        className="absolute top-4 left-4 z-10"
      />
      <div className="flex min-h-screen items-center justify-center p-24">
        <div className="flex flex-col items-center justify-center">
          <TiltToCursor />

          <TextGenerateEffect
            words="WEB REKAPITULASI ABSENSI"
            duration={0.9}
            staggerDelay={0.15}
            filter={true}
            className="font-bold text-3xl text-center text-slate-950 dark:text-slate-50 mt-4"
          />

          <TextGenerateEffect
            words="SMK SALAFIYAH SYAFIIYAH"
            duration={0.9}
            staggerDelay={0.15}
            filter={true}
            className="font-bold text-3xl text-center text-slate-950 dark:text-slate-50"
          />

          <LiquidButton variant={"outline"} className="mt-10" href="/login">
            MASUK
          </LiquidButton>
        </div>
      </div>
    </AuroraBackground>
  );
}
