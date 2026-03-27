import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { vets } from "@/lib/mock-data";

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "w-5 h-5" : size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const dayOrder = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function generateStaticParams() {
  return vets.map((v) => ({ slug: v.slug }));
}

export default async function VetProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vet = vets.find((v) => v.slug === slug);

  if (!vet) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/vets" className="hover:text-emerald-600 transition-colors">Veterinarios</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{vet.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:flex lg:gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Header card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Cover */}
              <div className="h-32 bg-gradient-to-br from-emerald-500 to-teal-400" />

              <div className="px-6 pb-6">
                {/* Photo + basic info */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-14 mb-5">
                  <div className="relative w-28 h-28 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-emerald-50 flex-shrink-0">
                    <Image
                      src={vet.photo}
                      alt={vet.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{vet.name}</h1>
                        <p className="text-gray-500 mt-0.5">{vet.yearsExperience} años de experiencia</p>
                      </div>
                      {vet.availableToday && (
                        <span className="bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          Disponible hoy
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {vet.specialties.map((s) => (
                    <span key={s} className="bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full border border-emerald-100">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <StarRating rating={vet.rating} size="md" />
                    <span className="font-bold text-gray-900">{vet.rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">({vet.reviewCount} reseñas)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold text-lg text-gray-900">S/ {vet.visitPrice}</span>
                    <span className="text-gray-400 text-sm">por visita</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-sm">Verificado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre mí</h2>
              <p className="text-gray-600 leading-relaxed">{vet.about}</p>
              <div className="mt-4 flex items-start gap-3 text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <p><span className="font-semibold text-gray-700">Formación:</span> {vet.education}</p>
              </div>
            </div>

            {/* Zonas de cobertura */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Zonas de cobertura</h2>
              <div className="flex flex-wrap gap-2">
                {vet.districts.map((d) => (
                  <span key={d} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-full">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {d}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-4">
                *El costo de traslado puede variar según la distancia desde el punto más cercano.
              </p>
            </div>

            {/* Disponibilidad semanal */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Disponibilidad semanal</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dayOrder.map((day) => {
                  const hours = vet.schedule[day];
                  const isAvailable = hours !== "No disponible";
                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between p-3 rounded-xl ${
                        isAvailable ? "bg-emerald-50 border border-emerald-100" : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <span className={`font-medium text-sm ${isAvailable ? "text-gray-800" : "text-gray-400"}`}>
                        {day}
                      </span>
                      <span className={`text-sm ${isAvailable ? "text-emerald-700 font-medium" : "text-gray-400"}`}>
                        {hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Reseñas</h2>
                <div className="flex items-center gap-2">
                  <StarRating rating={vet.rating} size="md" />
                  <span className="font-bold text-gray-900">{vet.rating.toFixed(1)}</span>
                  <span className="text-gray-400 text-sm">/ {vet.reviewCount} reseñas</span>
                </div>
              </div>

              <div className="space-y-5">
                {vet.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{review.author}</p>
                        <p className="text-sm text-gray-400">
                          Mascota: {review.petName} · {new Date(review.date).toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky CTA sidebar */}
          <aside className="lg:w-80 flex-shrink-0 mt-6 lg:mt-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-extrabold text-gray-900">S/ {vet.visitPrice}</p>
                <p className="text-gray-400 text-sm">por visita a domicilio</p>
              </div>

              <Link
                href={`/agendar?vet=${vet.slug}`}
                className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl text-center text-lg transition-colors shadow-md hover:shadow-lg mb-3"
              >
                🗓️ Agendar visita
              </Link>

              <a
                href="https://wa.me/51900000000"
                className="block w-full border-2 border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-700 font-semibold py-3 rounded-xl text-center text-sm transition-colors"
              >
                💬 Consultar por WhatsApp
              </a>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cancelación gratuita 24h antes
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Confirmación inmediata
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pago seguro con Yape, Plin o tarjeta
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-center text-gray-400">
                  ✅ Vet verificado por Vetpe · {vet.yearsExperience} años de experiencia
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
