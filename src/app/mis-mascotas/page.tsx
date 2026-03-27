"use client";

import { useState } from "react";
import Image from "next/image";
import PetCard from "@/components/mascotas/PetCard";
import { pets as initialPets, Pet } from "@/lib/mock-data";

interface NewPetForm {
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
}

const speciesOptions = ["Perro", "Gato", "Ave", "Reptil", "Exótico", "Otro"];

export default function MisMascotasPage() {
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [showModal, setShowModal] = useState(false);
  const [editPet, setEditPet] = useState<Pet | null>(null);
  const [form, setForm] = useState<NewPetForm>({
    name: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
  });
  const [errors, setErrors] = useState<Partial<NewPetForm>>({});

  const openAddModal = () => {
    setEditPet(null);
    setForm({ name: "", species: "", breed: "", age: "", weight: "" });
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (pet: Pet) => {
    setEditPet(pet);
    setForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age.toString(),
      weight: pet.weight.toString(),
    });
    setErrors({});
    setShowModal(true);
  };

  const validate = (): boolean => {
    const newErrors: Partial<NewPetForm> = {};
    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    if (!form.species) newErrors.species = "La especie es requerida";
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 0) newErrors.age = "Ingresa una edad válida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const seed = form.name.toLowerCase() + Math.random().toString(36).substring(7);
    const bgColor = form.species === "Perro" ? "fef3c7" : form.species === "Gato" ? "dbeafe" : "d1fae5";

    if (editPet) {
      setPets((prev) =>
        prev.map((p) =>
          p.id === editPet.id
            ? { ...p, name: form.name, species: form.species, breed: form.breed, age: Number(form.age), weight: Number(form.weight) || p.weight }
            : p
        )
      );
    } else {
      const newPet: Pet = {
        id: `p${Date.now()}`,
        name: form.name,
        species: form.species,
        breed: form.breed || "Raza mixta",
        age: Number(form.age),
        weight: Number(form.weight) || 0,
        photo: `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=${bgColor}`,
      };
      setPets((prev) => [...prev, newPet]);
    }

    setShowModal(false);
  };

  const handleDelete = (petId: string) => {
    setPets((prev) => prev.filter((p) => p.id !== petId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Mis mascotas</h1>
              <p className="text-gray-500">{pets.length} {pets.length === 1 ? "mascota registrada" : "mascotas registradas"}</p>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-3 rounded-xl transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Agregar mascota
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {pets.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-6">🐾</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Aún no tienes mascotas registradas</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Agrega tus mascotas para tener un historial médico organizado y agendar visitas más rápido.
            </p>
            <button
              onClick={openAddModal}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              Agregar primera mascota
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="relative group">
                <PetCard pet={pet} onEdit={openEditModal} />
                <button
                  onClick={() => handleDelete(pet.id)}
                  className="absolute top-3 left-3 w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow"
                  title="Eliminar mascota"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}

            {/* Add new card */}
            <button
              onClick={openAddModal}
              className="h-full min-h-64 bg-white border-2 border-dashed border-gray-200 hover:border-emerald-400 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-emerald-600 transition-all duration-200 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-semibold text-sm">Agregar mascota</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editPet ? "Editar mascota" : "Nueva mascota"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre *</label>
                <input
                  type="text"
                  placeholder="¿Cómo se llama?"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400 ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Especie *</label>
                <div className="grid grid-cols-3 gap-2">
                  {speciesOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, species: s })}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${
                        form.species === s
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {errors.species && <p className="text-red-500 text-xs mt-1">{errors.species}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Raza</label>
                <input
                  type="text"
                  placeholder="Ej: Golden Retriever, mestizo..."
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Edad (años) *</label>
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    max="30"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400 ${errors.age ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Peso (kg)</label>
                  <input
                    type="number"
                    placeholder="0.0"
                    min="0"
                    step="0.1"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {editPet ? "Guardar cambios" : "Agregar mascota"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
