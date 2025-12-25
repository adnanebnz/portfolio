import Navbar from "@/components/navbar";
import GridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import AIAssistant from "./components/ai-assistant";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GridPattern
        width={60}
        height={60}
        maxOpacity={0.05}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />
      {children}
      <Navbar />
      <AIAssistant />
    </>
  );
}
