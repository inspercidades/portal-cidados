import { CollaboratorsSection } from "@/components/CollaboratorsSection";
import { Header } from "@/components/Header";
import Image from "next/image";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto pt-30">
        {/* Title */}
        <div className="flex items-left px-4 md:px-8 lg:px-12 justify-between lg:flex-row flex-col gap-4 pb-10 lg:items-center">
          <h1 className="max-w-[800px] text-2xl md:text-4xl font-bold text-foreground mb-1 font-gt-ultra-fine leading-tight">
            O Portal CiDados é uma plataforma de divulgação científica que
            transforma pesquisas acadêmicas em narrativas visuais acessíveis ao
            público
          </h1>
          <div className="overflow-hidden max-w-75 md:max-w-100">
            <Image
              src="/logos_cidados.png"
              alt="Sobre"
              width={330}
              height={330}
              className="w-auto h-auto dark:invert object-cover"
            />
          </div>
        </div>
        {/* Collaborators Section */}
      </div>
      <CollaboratorsSection />
    </div>
  );
}
