import { Vet } from "@/lib/mock-data";
import VetCard from "./VetCard";

interface VetGridProps {
  vets: Vet[];
  title?: string;
}

export default function VetGrid({ vets, title }: VetGridProps) {
  if (vets.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🐾</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No encontramos vets disponibles</h3>
        <p className="text-gray-500">Intenta con otros filtros o amplía la zona de búsqueda.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {vets.map((vet) => (
          <VetCard key={vet.id} vet={vet} />
        ))}
      </div>
    </div>
  );
}
