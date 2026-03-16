import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import SearchTrigger from "@/components/SearchTrigger";
import FilterChips from "@/components/FilterChips";
import PropertyCard from "@/components/PropertyCard";

import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

const mockProperties = [
  {
    image: property1,
    type: "Venda" as const,
    price: "850.000",
    address: "Rua das Palmeiras, 120",
    neighborhood: "Centro",
    beds: 4,
    baths: 3,
    area: 220,
  },
  {
    image: property2,
    type: "Aluguel" as const,
    price: "2.800",
    address: "Av. Governador Amaral Peixoto, 45",
    neighborhood: "Jardim Iguaçu",
    beds: 2,
    baths: 1,
    area: 68,
  },
  {
    image: property3,
    type: "Venda" as const,
    price: "420.000",
    address: "Rua Bernardino de Melo, 300",
    neighborhood: "Vila Nova",
    beds: 3,
    baths: 2,
    area: 110,
  },
  {
    image: property4,
    type: "Venda" as const,
    price: "380.000",
    address: "Rua Dr. Mário Guimarães, 88",
    neighborhood: "Posse",
    beds: 3,
    baths: 2,
    area: 95,
  },
  {
    image: property5,
    type: "Aluguel" as const,
    price: "1.900",
    address: "Rua Getúlio Vargas, 210",
    neighborhood: "Rancho Novo",
    beds: 2,
    baths: 1,
    area: 55,
  },
  {
    image: property6,
    type: "Venda" as const,
    price: "1.250.000",
    address: "Condomínio Alto da Boa Vista",
    neighborhood: "Cabuçu",
    beds: 5,
    baths: 4,
    area: 350,
  },
];

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filtered =
    activeFilter === "todos"
      ? mockProperties
      : activeFilter === "venda"
      ? mockProperties.filter((p) => p.type === "Venda")
      : activeFilter === "aluguel"
      ? mockProperties.filter((p) => p.type === "Aluguel")
      : mockProperties;

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="pb-24">
        <section className="space-y-4 px-4 py-5">
          <div>
            <h1 className="text-xl font-bold tracking-display">
              Encontre o seu lugar
            </h1>
            <p className="text-sm text-muted-foreground">
              em Nova Iguaçu, RJ
            </p>
          </div>
          <SearchTrigger />
          <FilterChips active={activeFilter} onChange={setActiveFilter} />
        </section>

        <section className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property, i) => (
            <PropertyCard key={i} {...property} />
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
