import Image from "next/image";
import { Pet } from "@/lib/mock-data";

const speciesEmoji: { [key: string]: string } = {
  Perro: "🐶",
  Gata: "🐱",
  Gato: "🐱",
  Ave: "🦜",
  Exótico: "🦎",
};

const speciesBg: { [key: string]: string } = {
  Perro: "from-amber-50 to-orange-50",
  Gata: "from-blue-50 to-indigo-50",
  Gato: "from-blue-50 to-indigo-50",
  Ave: "from-emerald-50 to-teal-50",
  Exótico: "from-purple-50 to-pink-50",
};

interface PetCardProps {
  pet: Pet;
  onEdit?: (pet: Pet) => void;
}

export default function PetCard({ pet, onEdit }: PetCardProps) {
  const emoji = speciesEmoji[pet.species] || "🐾";
  const bg = speciesBg[pet.species] || "from-gray-50 to-gray-100";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Photo area */}
      <div className={`relative h-40 bg-gradient-to-br ${bg} flex items-center justify-center`}>
        <div className="relative w-24 h-24">
          <Image
            src={pet.photo}
            alt={pet.name}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <span className="absolute top-3 right-3 text-2xl">{emoji}</span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-xl">{pet.name}</h3>
        <p className="text-emerald-600 font-medium text-sm mt-0.5">{pet.species}</p>

        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Raza</span>
            <span className="font-medium text-gray-700">{pet.breed}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Edad</span>
            <span className="font-medium text-gray-700">{pet.age} {pet.age === 1 ? "año" : "años"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Peso</span>
            <span className="font-medium text-gray-700">
              {pet.weight < 1 ? `${(pet.weight * 1000).toFixed(0)} g` : `${pet.weight} kg`}
            </span>
          </div>
        </div>

        {onEdit && (
          <button
            onClick={() => onEdit(pet)}
            className="mt-4 w-full border border-emerald-200 text-emerald-600 hover:bg-emerald-50 font-medium py-2 rounded-xl text-sm transition-colors"
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
