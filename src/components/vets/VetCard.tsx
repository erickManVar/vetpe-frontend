import Link from "next/link";
import Image from "next/image";
import { Vet } from "@/lib/mock-data";

interface VetCardProps {
  vet: Vet;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function VetCard({ vet }: VetCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
      {/* Photo */}
      <div className="relative h-48 bg-emerald-50">
        <Image
          src={vet.photo}
          alt={vet.name}
          fill
          className="object-cover"
          unoptimized
        />
        {vet.availableToday && (
          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            Disponible hoy
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-emerald-600 transition-colors">
          {vet.name}
        </h3>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {vet.specialties.map((s) => (
            <span key={s} className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
              {s}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mt-3">
          <StarRating rating={vet.rating} />
          <span className="text-xs text-gray-400">{vet.reviewCount} reseñas</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1 mt-3">
          <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-900 font-semibold">S/ {vet.visitPrice}</span>
          <span className="text-gray-400 text-sm">por visita</span>
        </div>

        {/* Districts */}
        <div className="flex items-start gap-1.5 mt-2">
          <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <p className="text-xs text-gray-500 leading-relaxed">
            {vet.districts.slice(0, 3).join(", ")}
            {vet.districts.length > 3 && ` +${vet.districts.length - 3} más`}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/vets/${vet.slug}`}
          className="block mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-center text-sm transition-colors"
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );
}
