import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";
import VetGrid from "@/components/vets/VetGrid";
import { vets } from "@/lib/mock-data";

const featuredVets = vets.filter((v) => v.rating >= 4.8).slice(0, 4);

const steps = [
  {
    number: "01",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Busca",
    description: "Ingresa tu distrito y el tipo de mascota. Te mostramos los vets verificados más cercanos.",
  },
  {
    number: "02",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Agenda",
    description: "Elige fecha, hora y comparte los datos de tu mascota. Todo desde tu celular, en minutos.",
  },
  {
    number: "03",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Recibe la visita",
    description: "Tu vet llega a casa a la hora pactada. Tu mascota recibe atención profesional en su ambiente.",
  },
];

const trustItems = [
  {
    icon: "✅",
    title: "Vets verificados",
    description: "Todos nuestros veterinarios pasan por un proceso riguroso de verificación de credenciales y antecedentes.",
  },
  {
    icon: "📍",
    title: "Cobertura Lima",
    description: "Contamos con vets en más de 30 distritos de Lima Metropolitana. Siempre hay un vet cerca de ti.",
  },
  {
    icon: "🔒",
    title: "Pagos seguros",
    description: "Todas las transacciones están protegidas. Pagos con tarjeta, Yape o Plin. 100% seguro.",
  },
  {
    icon: "⭐",
    title: "Garantía de calidad",
    description: "Si no quedas satisfecho, te devolvemos el dinero. La salud de tu mascota es nuestra prioridad.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-teal-300/10 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
              Disponible en Lima Metropolitana
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Tu vet a domicilio,{" "}
              <span className="text-emerald-200">cuando lo necesitas</span>
            </h1>

            <p className="text-lg sm:text-xl text-emerald-100 mb-10 max-w-2xl leading-relaxed">
              Conectamos a dueños de mascotas con veterinarios certificados para visitas a domicilio en Lima.
              Atención profesional, sin estrés, en la comodidad de tu hogar.
            </p>

            {/* Search bar */}
            <div className="max-w-2xl">
              <SearchBar />
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 mt-10 text-sm">
              <div>
                <p className="text-2xl font-bold text-white">+120</p>
                <p className="text-emerald-200">Vets verificados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">+30</p>
                <p className="text-emerald-200">Distritos cubiertos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">+3,500</p>
                <p className="text-emerald-200">Mascotas atendidas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cómo funciona
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Agendar una visita veterinaria nunca fue tan fácil. En 3 simples pasos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-emerald-200 to-emerald-100 z-0" />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-emerald-50 border-2 border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300 shadow-sm">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-2">
                  Paso {step.number}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-xs">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/vets"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
          >
            Encontrar mi vet
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Featured Vets */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Vets destacados
              </h2>
              <p className="text-gray-500">Los mejor calificados de Lima</p>
            </div>
            <Link
              href="/vets"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              Ver todos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <VetGrid vets={featuredVets} />
        </div>
      </section>

      {/* Trust indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Por qué elegir Vetpe
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            La plataforma líder de veterinarios a domicilio en Lima
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para agendar tu primera visita?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Tu mascota merece la mejor atención. Sin salir de casa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vets"
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold px-8 py-4 rounded-xl transition-colors shadow"
            >
              Buscar veterinarios
            </Link>
            <Link
              href="/agendar"
              className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Agendar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial-ish section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mascotas felices en Lima</h2>
          <p className="text-gray-500">Lo que dicen nuestros clientes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Mi perro odia ir a la clínica, pero con Vetpe el vet vino a casa y fue una experiencia increíble para él. ¡Muy recomendado!",
              author: "Valeria C.",
              location: "Miraflores",
              pet: "Perro, 4 años",
            },
            {
              quote: "Servicio de 10. La Dra. Ana fue puntual, profesional y muy cariñosa con mi gata. Precio muy razonable.",
              author: "Miguel R.",
              location: "San Isidro",
              pet: "Gata, 2 años",
            },
            {
              quote: "Tengo un loro y era difícil encontrar un vet especialista. Gracias a Vetpe encontré al Dr. Huamán en minutos.",
              author: "Camila V.",
              location: "Surco",
              pet: "Loro, 3 años",
            },
          ].map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-gray-900">{t.author}</p>
                <p className="text-sm text-gray-400">{t.location} · {t.pet}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
