"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { vets, districts, speciesOptions } from "@/lib/mock-data";

interface FormData {
  vetSlug: string;
  date: string;
  time: string;
  address: string;
  district: string;
  petName: string;
  petSpecies: string;
  petBreed: string;
  petAge: string;
  reason: string;
  notes: string;
}

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM",
];

function AgendarContent() {
  const searchParams = useSearchParams();
  const preSelectedVet = searchParams.get("vet") || "";

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormData>({
    vetSlug: preSelectedVet,
    date: "",
    time: "",
    address: "",
    district: "",
    petName: "",
    petSpecies: "",
    petBreed: "",
    petAge: "",
    reason: "",
    notes: "",
  });

  useEffect(() => {
    if (preSelectedVet) {
      setForm((f) => ({ ...f, vetSlug: preSelectedVet }));
    }
  }, [preSelectedVet]);

  const selectedVet = vets.find((v) => v.slug === form.vetSlug);

  const updateForm = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const canGoToStep2 = form.vetSlug && form.date && form.time;
  const canGoToStep3 = canGoToStep2 && form.address && form.district;
  const canConfirm = canGoToStep3 && form.petName && form.petSpecies && form.reason;

  const handleConfirm = () => {
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const today = new Date().toISOString().split("T")[0];

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">¡Visita agendada!</h1>
          <p className="text-gray-500 mb-2">
            Tu cita con <span className="font-semibold text-gray-800">{selectedVet?.name}</span> está confirmada.
          </p>
          <p className="text-gray-500 mb-8">
            {form.date && new Date(form.date + "T12:00:00").toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" })} a las {form.time}
          </p>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-left mb-8">
            <h3 className="font-semibold text-emerald-800 mb-3">Resumen de tu cita</h3>
            <div className="space-y-2 text-sm text-emerald-700">
              <p>🐾 Mascota: <strong>{form.petName}</strong> ({form.petSpecies})</p>
              <p>📍 Dirección: <strong>{form.address}, {form.district}</strong></p>
              <p>💬 Motivo: <strong>{form.reason}</strong></p>
              <p>💰 Total a pagar: <strong>S/ {selectedVet?.visitPrice}</strong></p>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-6">
            Recibirás una confirmación por WhatsApp y correo electrónico.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl text-center transition-colors">
              Volver al inicio
            </a>
            <a href="/historial" className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-center transition-colors">
              Ver historial
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Agendar visita</h1>
          <p className="text-gray-500">Completa el formulario para reservar tu cita veterinaria</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Steps progress */}
        <div className="flex items-center gap-0 mb-8">
          {[
            { n: 1, label: "Vet & horario" },
            { n: 2, label: "Dirección" },
            { n: 3, label: "Mascota" },
            { n: 4, label: "Confirmar" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    step > s.n
                      ? "bg-emerald-500 text-white"
                      : step === s.n
                      ? "bg-emerald-500 text-white ring-4 ring-emerald-100"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s.n ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s.n}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${step === s.n ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < 3 && (
                <div className={`flex-1 h-0.5 mx-2 ${step > s.n ? "bg-emerald-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="lg:flex lg:gap-8">
          {/* Form */}
          <div className="flex-1 min-w-0">
            {/* Step 1: Vet & schedule */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Selecciona veterinario y horario</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Veterinario *</label>
                  <select
                    value={form.vetSlug}
                    onChange={(e) => updateForm("vetSlug", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                  >
                    <option value="">Selecciona un veterinario</option>
                    {vets.map((v) => (
                      <option key={v.slug} value={v.slug}>
                        {v.name} — S/ {v.visitPrice} — ★ {v.rating}
                      </option>
                    ))}
                  </select>
                  {selectedVet && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">
                        👨‍⚕️
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{selectedVet.name}</p>
                        <p className="text-sm text-gray-500">{selectedVet.specialties.join(", ")}</p>
                        <p className="text-sm text-emerald-600 font-semibold">S/ {selectedVet.visitPrice} por visita</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha *</label>
                  <input
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Hora *</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => updateForm("time", t)}
                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                          form.time === t
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-600"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!canGoToStep2}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Continuar
                </button>
              </div>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Dirección de la visita</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Distrito *</label>
                  <select
                    value={form.district}
                    onChange={(e) => updateForm("district", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                  >
                    <option value="">Selecciona tu distrito</option>
                    {districts.filter(d => d !== "Todos").map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección completa *</label>
                  <input
                    type="text"
                    placeholder="Ej: Av. Larco 123, Dpto 4B"
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Referencia (opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej: Edificio azul, interfono 4"
                    value={form.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!canGoToStep3}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Pet info */}
            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                <h2 className="text-xl font-bold text-gray-900">Datos de tu mascota</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de la mascota *</label>
                    <input
                      type="text"
                      placeholder="Ej: Max"
                      value={form.petName}
                      onChange={(e) => updateForm("petName", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Especie *</label>
                    <select
                      value={form.petSpecies}
                      onChange={(e) => updateForm("petSpecies", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                    >
                      <option value="">Selecciona</option>
                      {speciesOptions.filter(s => s.value !== "todos").map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Raza</label>
                    <input
                      type="text"
                      placeholder="Ej: Labrador Retriever"
                      value={form.petBreed}
                      onChange={(e) => updateForm("petBreed", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Edad (años)</label>
                    <input
                      type="number"
                      placeholder="Ej: 3"
                      min="0"
                      max="30"
                      value={form.petAge}
                      onChange={(e) => updateForm("petAge", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Motivo de consulta *</label>
                  <textarea
                    placeholder="Describe los síntomas o el motivo de la visita veterinaria..."
                    rows={4}
                    value={form.reason}
                    onChange={(e) => updateForm("reason", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 placeholder-gray-400 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!canConfirm}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
                  >
                    Revisar resumen
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Confirma tu cita</h2>

                <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                  <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Resumen</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Veterinario</p>
                      <p className="font-semibold text-gray-900">{selectedVet?.name}</p>
                      <p className="text-gray-500">{selectedVet?.specialties[0]}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Fecha y hora</p>
                      <p className="font-semibold text-gray-900">
                        {form.date && new Date(form.date + "T12:00:00").toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                      </p>
                      <p className="text-gray-500">{form.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Dirección</p>
                      <p className="font-semibold text-gray-900">{form.address}</p>
                      <p className="text-gray-500">{form.district}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Mascota</p>
                      <p className="font-semibold text-gray-900">{form.petName} ({form.petBreed || form.petSpecies})</p>
                      {form.petAge && <p className="text-gray-500">{form.petAge} años</p>}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-400 text-sm mb-1">Motivo de consulta</p>
                    <p className="text-gray-700 text-sm">{form.reason}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Total a pagar</span>
                    <span className="text-2xl font-extrabold text-emerald-600">S/ {selectedVet?.visitPrice}</span>
                  </div>
                </div>

                {/* Payment method placeholder */}
                <div className="border border-gray-200 rounded-2xl p-5">
                  <h3 className="font-semibold text-gray-700 mb-4">Método de pago</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Yape", "Plin", "Tarjeta"].map((m, i) => (
                      <label key={m} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="payment" defaultChecked={i === 0} className="accent-emerald-500" />
                        <span className="text-sm font-medium text-gray-700">{m}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors shadow-md"
                  >
                    ✅ Confirmar cita
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar (visible from step 2 onwards) */}
          {step >= 2 && selectedVet && (
            <aside className="lg:w-72 flex-shrink-0 mt-6 lg:mt-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4">Tu selección</h3>
                <div className="space-y-3 text-sm">
                  {selectedVet && (
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">👨‍⚕️</span>
                      <div>
                        <p className="font-medium text-gray-900">{selectedVet.name}</p>
                        <p className="text-gray-400">{selectedVet.specialties[0]}</p>
                      </div>
                    </div>
                  )}
                  {form.date && (
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">📅</span>
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(form.date + "T12:00:00").toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "short" })}
                        </p>
                        <p className="text-gray-400">{form.time}</p>
                      </div>
                    </div>
                  )}
                  {form.district && (
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">📍</span>
                      <p className="font-medium text-gray-900">{form.district}</p>
                    </div>
                  )}
                  {form.petName && (
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-0.5">🐾</span>
                      <p className="font-medium text-gray-900">{form.petName}</p>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between">
                  <span className="text-gray-500 text-sm">Total</span>
                  <span className="font-bold text-lg text-emerald-600">S/ {selectedVet.visitPrice}</span>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AgendarPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AgendarContent />
    </Suspense>
  );
}
