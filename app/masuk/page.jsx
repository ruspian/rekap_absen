import LoginButton from "@/components/button/LoginButton";
import { AuroraBackground } from "@/components/ui/shadcn-io/aurora-background";

const MasukPage = () => {
  return (
    <AuroraBackground>
      <div className="h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-semibold mb-32">
            Silahkan Masuk Untuk Melanjutkan!
          </h1>
          <LoginButton>Masuk dengan Google</LoginButton>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default MasukPage;
