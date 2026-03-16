import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import BannerCarousel from "@/components/BannerCarousel";
import PropertySearchBar, { SearchFilters } from "@/components/PropertySearchBar";
import PropertyCardFull from "@/components/PropertyCardFull";
import SectionHeader from "@/components/SectionHeader";
import NeighborhoodGrid from "@/components/NeighborhoodGrid";

import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

const bannerSlides = [
  {
    image: banner1,
    title: "Encontre o seu lugar em Nova Iguaçu",
    subtitle: "As melhores casas e apartamentos da Baixada Fluminense",
  },
  {
    image: banner2,
    title: "Apartamentos de alto padrão",
    subtitle: "Conforto e sofisticação para sua família",
  },
  {
    image: banner3,
    title: "Condomínios fechados com segurança",
    subtitle: "Qualidade de vida e tranquilidade para você",
  },
];

const allProperties = [
  {
    id: "1",
    image: property1,
    type: "Venda" as const,
    propertyType: "Casa",
    price: "850.000",
    address: "Rua das Palmeiras, 120",
    neighborhood: "Centro",
    beds: 4,
    baths: 3,
    area: 220,
    featured: true,
    recent: false,
  },
  {
    image: property2,
    type: "Aluguel" as const,
    propertyType: "Apartamento",
    price: "2.800",
    address: "Av. Gov. Amaral Peixoto, 45",
    neighborhood: "Comendador Soares",
    beds: 2,
    baths: 1,
    area: 68,
    featured: false,
    recent: true,
  },
  {
    image: property3,
    type: "Venda" as const,
    propertyType: "Apartamento",
    price: "420.000",
    address: "Rua Bernardino de Melo, 300",
    neighborhood: "Austin",
    beds: 3,
    baths: 2,
    area: 110,
    featured: true,
    recent: true,
  },
  {
    image: property4,
    type: "Venda" as const,
    propertyType: "Casa",
    price: "380.000",
    address: "Rua Dr. Mário Guimarães, 88",
    neighborhood: "Posse",
    beds: 3,
    baths: 2,
    area: 95,
    featured: false,
    recent: true,
  },
  {
    image: property5,
    type: "Aluguel" as const,
    propertyType: "Apartamento",
    price: "1.900",
    address: "Rua Getúlio Vargas, 210",
    neighborhood: "Miguel Couto",
    beds: 2,
    baths: 1,
    area: 55,
    featured: true,
    recent: false,
  },
  {
    image: property6,
    type: "Venda" as const,
    propertyType: "Casa",
    price: "1.250.000",
    address: "Condomínio Alto da Boa Vista",
    neighborhood: "Cabuçu",
    beds: 5,
    baths: 4,
    area: 350,
    featured: true,
    recent: true,
  },
  {
    image: property1,
    type: "Aluguel" as const,
    propertyType: "Casa",
    price: "3.500",
    address: "Rua Coronel Alfredo, 55",
    neighborhood: "Jardim Alvorada",
    beds: 3,
    baths: 2,
    area: 140,
    featured: false,
    recent: true,
  },
  {
    image: property3,
    type: "Venda" as const,
    propertyType: "Apartamento",
    price: "295.000",
    address: "Rua Silva Addor, 180",
    neighborhood: "Centro",
    beds: 2,
    baths: 1,
    area: 62,
    featured: true,
    recent: false,
  },
];

const HorizontalScroll = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <div className="group/scroll relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory"
      >
        {children}
      </div>
      <button
        onClick={() => scroll(-1)}
        className="absolute -left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-card p-2 shadow-card-hover ring-1 ring-foreground/5 transition-opacity md:flex opacity-0 group-hover/scroll:opacity-100"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => scroll(1)}
        className="absolute -right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-card p-2 shadow-card-hover ring-1 ring-foreground/5 transition-opacity md:flex opacity-0 group-hover/scroll:opacity-100"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

const Index = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    mode: "comprar",
    neighborhood: "Todos",
    priceRange: "",
    query: "",
  });

  const featured = allProperties.filter((p) => p.featured);
  const recent = allProperties.filter((p) => p.recent);

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="pb-24">
        {/* Banner Carousel */}
        <section className="px-4 pt-4">
          <BannerCarousel slides={bannerSlides} />
        </section>

        {/* Search & Filters */}
        <section className="px-4 pt-5">
          <PropertySearchBar filters={filters} onChange={setFilters} />
        </section>

        {/* Featured Properties */}
        <section className="mt-8 px-4">
          <SectionHeader
            title="Destaques"
            subtitle="Imóveis selecionados pelo Clube"
            action="Ver todos"
          />
          <div className="mt-4">
            <HorizontalScroll>
              {featured.map((p, i) => (
                <div key={`feat-${i}`} className="w-[280px] shrink-0 snap-start md:w-[320px]">
                  <PropertyCardFull {...p} />
                </div>
              ))}
            </HorizontalScroll>
          </div>
        </section>

        {/* Recent Listings */}
        <section className="mt-10 px-4">
          <SectionHeader
            title="Recém Publicados"
            subtitle="Novos imóveis em Nova Iguaçu"
            action="Ver todos"
          />
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((p, i) => (
              <PropertyCardFull key={`recent-${i}`} {...p} />
            ))}
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="mt-10 px-4">
          <SectionHeader
            title="Explore por Bairro"
            subtitle="Encontre imóveis no seu bairro favorito"
          />
          <div className="mt-4">
            <NeighborhoodGrid />
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
