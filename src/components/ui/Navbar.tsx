"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              vet<span className="text-emerald-500">pe</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/vets"
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Buscar vets
            </Link>
            <Link
              href="/mis-mascotas"
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Mis mascotas
            </Link>
            <Link
              href="/historial"
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Historial
            </Link>
            <Link
              href="/agendar"
              className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
            >
              Agendar
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              Iniciar sesión
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
              Registrarse
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-3">
            <Link href="/vets" className="block text-gray-700 hover:text-emerald-600 font-medium py-2 transition-colors" onClick={() => setMenuOpen(false)}>
              Buscar vets
            </Link>
            <Link href="/mis-mascotas" className="block text-gray-700 hover:text-emerald-600 font-medium py-2 transition-colors" onClick={() => setMenuOpen(false)}>
              Mis mascotas
            </Link>
            <Link href="/historial" className="block text-gray-700 hover:text-emerald-600 font-medium py-2 transition-colors" onClick={() => setMenuOpen(false)}>
              Historial
            </Link>
            <Link href="/agendar" className="block text-gray-700 hover:text-emerald-600 font-medium py-2 transition-colors" onClick={() => setMenuOpen(false)}>
              Agendar
            </Link>
            <div className="flex gap-3 pt-2">
              <button className="flex-1 border border-emerald-500 text-emerald-600 font-semibold py-2 rounded-lg hover:bg-emerald-50 transition-colors">
                Iniciar sesión
              </button>
              <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors">
                Registrarse
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
