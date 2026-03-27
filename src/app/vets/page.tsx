"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VetCard from "@/components/vets/VetCard";
import { vets, districts, speciesOptions } from "@/lib/mock-data";

function VetsContent() {
  const searchParams = useSearchParams();
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get("distrito") || "Todos");
  const [selectedSpecies, setSelectedSpecies] = useState(searchParams.get("especie") || "todos");
  const [maxPrice, setMaxPrice] = useState(150);
  const [availableToday, setAvailableToday] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    const d = searchParams.get("distrito");
    const s = searchParams.get("especie");
    if (d) setSelectedDistrict(d);
    if (s) setSelectedSpecies(s);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...vets];

    if (selectedDistrict && selectedDistrict !== "Todos") {
      result = result.filter((v) => v.districts.includes(selectedDistrict));
    }

    if (selectedSpecies && selectedSpecies !== "todos") {
      result = result.filter((v) => v.species.includes(selectedSpecies));
    }

    if (availableToday) {
      result = result.filter((v) => v.availableToday);
    }

    result = result.filter((v) => v.visitPrice <= maxPrice);

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price_asc") {
      result.sort((a, b) => a.visitPrice - b.visitPrice);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.visitPrice - a.visitPrice);
    } else if (sortBy === "reviews") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [selectedDistrict, selectedSpecies, availableToday, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedDistrict("Todos");
    setSelectedSpecies("todos");
    setMaxPrice(150);
    setAvailableToday(false);
    setSortBy("rating");
  };

  const activeFilterCount = [
    selectedDistrict !== "Todos",
    selectedSpecies !== "todos",
    maxPrice < 150,
    availableToday,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Veterinarios en Lima</h1>
          <p className="text-gray-500">
            {filtered.length} {filtered.length === 1 ? "veterinario encontrado" : "veterinarios encontrados"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-900 text-lg">Filtros</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                  >
                    <span className="bg-emerald-100 text-emerald-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                    Limpiar
                  </button>
                )}
              </div>

              {/* District filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Distrito</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Species filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Tipo de mascota</label>
                <div className="flex flex-wrap gap-2">
                  {speciesOptions.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSelectedSpecies(s.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                        selectedSpecies === s.value
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio máximo: <span className="text-emerald-600">S/ {maxPrice}</span>
                </label>
                <input
                  type="range"
                  min={50}
                  max={150}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>S/ 50</span>
                  <span>S/ 150</span>
                </div>
              </div>

              {/* Available today */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={availableToday}
                      onChange={(e) => setAvailableToday(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-500 transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Disponible hoy</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-500 text-sm">
                Mostrando <span className="font-semibold text-gray-900">{filtered.length}</span> veterinarios
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-700"
              >
                <option value="rating">Mejor calificados</option>
                <option value="price_asc">Menor precio</option>
                <option value="price_desc">Mayor precio</option>
                <option value="reviews">Más reseñas</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sin resultados</h3>
                <p className="text-gray-500 mb-6">No encontramos vets con esos filtros. Prueba ampliando la búsqueda.</p>
                <button
                  onClick={resetFilters}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((vet) => (
                  <VetCard key={vet.id} vet={vet} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VetsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Cargando veterinarios...</p>
        </div>
      </div>
    }>
      <VetsContent />
    </Suspense>
  );
}
