"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { districts, speciesOptions } from "@/lib/mock-data";

interface SearchBarProps {
  initialDistrict?: string;
  initialSpecies?: string;
  compact?: boolean;
}

export default function SearchBar({ initialDistrict = "", initialSpecies = "", compact = false }: SearchBarProps) {
  const router = useRouter();
  const [district, setDistrict] = useState(initialDistrict);
  const [species, setSpecies] = useState(initialSpecies);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (district && district !== "Todos") params.set("distrito", district);
    if (species && species !== "todos") params.set("especie", species);
    router.push(`/vets?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  if (compact) {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700"
        >
          <option value="">Selecciona distrito</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700"
        >
          {speciesOptions.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Buscar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2">
      <div className="flex-1 flex items-center gap-3 px-3 py-2 border border-gray-100 rounded-xl hover:border-emerald-300 transition-colors">
        <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none text-gray-700 text-sm"
        >
          <option value="">¿Dónde estás? Selecciona tu distrito</option>
          {districts.filter(d => d !== "Todos").map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex items-center gap-3 px-3 py-2 border border-gray-100 rounded-xl hover:border-emerald-300 transition-colors">
        <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none text-gray-700 text-sm"
        >
          <option value="">¿Qué tipo de mascota tienes?</option>
          {speciesOptions.filter(s => s.value !== "todos").map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Buscar vet
      </button>
    </div>
  );
}
