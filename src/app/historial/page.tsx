import Link from "next/link";
import { appointments } from "@/lib/mock-data";

const statusConfig = {
  completed: { label: "Completada", bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  upcoming: { label: "Próxima", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  cancelled: { label: "Cancelada", bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
};

const speciesEmoji: { [key: string]: string } = {
  Perro: "🐶",
  Gata: "🐱",
  Gato: "🐱",
  Ave: "🦜",
  Exótico: "🦎",
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function HistorialPage() {
  const completed = appointments.filter((a) => a.status === "completed");
  const upcoming = appointments.filter((a) => a.status === "upcoming");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Historial médico</h1>
          <p className="text-gray-500">
            {appointments.length} {appointments.length === 1 ? "consulta" : "consultas"} registradas
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
              Próximas citas
            </h2>
            <div className="space-y-4">
              {upcoming.map((appt) => {
                const status = statusConfig[appt.status];
                const emoji = speciesEmoji[appt.petSpecies] || "🐾";
                return (
                  <div key={appt.id} className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
                    <div className="bg-blue-50 border-b border-blue-100 px-5 py-3 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${status.text}`}>
                        <span className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
                        {status.label}
                      </span>
                      <span className="text-sm text-blue-600 font-medium">{appt.time}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                              {emoji}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{appt.vetName}</h3>
                              <p className="text-gray-500 text-sm mt-0.5">
                                📅 {formatDate(appt.date)}
                              </p>
                              <p className="text-gray-500 text-sm">
                                🐾 {appt.petName} · {appt.petSpecies}
                              </p>
                              {appt.notes && (
                                <p className="text-gray-600 text-sm mt-2 bg-gray-50 rounded-lg px-3 py-2">
                                  📋 {appt.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex sm:flex-col gap-2">
                          <Link
                            href={`/vets/${appt.vetSlug}`}
                            className="text-sm border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                          >
                            Ver vet
                          </Link>
                          <button className="text-sm border border-red-200 text-red-500 hover:bg-red-50 font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Completed */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            Historial de consultas
          </h2>

          {completed.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sin historial aún</h3>
              <p className="text-gray-500 mb-6">Cuando completes tu primera visita, aparecerá aquí.</p>
              <Link
                href="/agendar"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Agendar primera visita
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {completed.map((appt) => {
                const status = statusConfig[appt.status];
                const emoji = speciesEmoji[appt.petSpecies] || "🐾";
                return (
                  <div key={appt.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${status.text}`}>
                        <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>
                      <span className="text-sm text-gray-400">{appt.time}</span>
                    </div>

                    <div className="p-5">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                        {/* Main info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                              {emoji}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{appt.vetName}</h3>
                              <p className="text-gray-500 text-sm mt-0.5">
                                📅 {formatDate(appt.date)}
                              </p>
                              <p className="text-gray-500 text-sm">
                                🐾 {appt.petName} · {appt.petSpecies}
                              </p>
                            </div>
                          </div>

                          {/* Diagnosis */}
                          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1.5">
                              Diagnóstico
                            </p>
                            <p className="text-gray-800 text-sm leading-relaxed">{appt.diagnosis}</p>
                          </div>

                          {/* Notes */}
                          {appt.notes && (
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1.5">
                                📋 Notas del veterinario
                              </p>
                              <p className="text-gray-700 text-sm leading-relaxed">{appt.notes}</p>
                            </div>
                          )}
                        </div>

                        {/* Documents & actions */}
                        <div className="lg:w-52 flex-shrink-0 space-y-3">
                          {/* Documents */}
                          {appt.documents.length > 0 && (
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                Documentos
                              </p>
                              <div className="space-y-2">
                                {appt.documents.map((doc, i) => (
                                  <button
                                    key={i}
                                    className="w-full flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors text-left"
                                  >
                                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="truncate">{doc}</span>
                                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <Link
                            href={`/vets/${appt.vetSlug}`}
                            className="block text-sm text-center border border-emerald-200 text-emerald-600 hover:bg-emerald-50 font-medium px-4 py-2.5 rounded-xl transition-colors"
                          >
                            Ver perfil del vet
                          </Link>
                          <Link
                            href={`/agendar?vet=${appt.vetSlug}`}
                            className="block text-sm text-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2.5 rounded-xl transition-colors"
                          >
                            Reagendar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Export/summary */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Resumen médico completo</h3>
              <p className="text-gray-500 text-sm">Descarga el historial de todas tus mascotas en PDF</p>
            </div>
            <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-3 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar PDF
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
