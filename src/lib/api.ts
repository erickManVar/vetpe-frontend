const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
const API = `${BASE}/api/v1`

// ─── Core fetch helper ────────────────────────────────────────────────────────

async function apiFetch(path: string, options?: RequestInit, token?: string): Promise<any> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const t = token || (typeof window !== 'undefined' ? localStorage.getItem('vetpe_token') : null)
  if (t) headers['Authorization'] = `Bearer ${t}`
  const res = await fetch(`${API}${path}`, { ...options, headers })
  if (!res.ok) {
    const text = await res.text()
    let msg = text
    try { msg = JSON.parse(text)?.message || text } catch {}
    throw new Error(msg)
  }
  const text = await res.text()
  if (!text) return null
  return JSON.parse(text)
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface RegisterData {
  email: string
  password: string
  name: string
  role: 'OWNER' | 'VET'
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export const register = (data: RegisterData): Promise<AuthResponse> =>
  apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) })

export const login = (data: LoginData): Promise<AuthResponse> =>
  apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) })

// ─── Vets ─────────────────────────────────────────────────────────────────────

export interface SearchVetsParams {
  distrito?: string
  especie?: string
  precioMax?: string | number
}

export interface Vet {
  id: string
  name: string
  email: string
  especialidades?: string[]
  distrito?: string
  precioConsulta?: number
  calificacion?: number
  verificado?: boolean
  fotoPerfil?: string
  descripcion?: string
}

export const searchVets = (params: SearchVetsParams): Promise<Vet[]> => {
  const cleaned: Record<string, string> = {}
  if (params.distrito) cleaned.distrito = String(params.distrito)
  if (params.especie) cleaned.especie = String(params.especie)
  if (params.precioMax) cleaned.precioMax = String(params.precioMax)
  return apiFetch(`/vets/search?${new URLSearchParams(cleaned)}`)
}

export const getVet = (id: string): Promise<Vet> =>
  apiFetch(`/vets/${id}`)

// ─── Appointments ─────────────────────────────────────────────────────────────

export interface CreateAppointmentData {
  vetId: string
  petId: string
  fecha: string
  hora: string
  motivo?: string
}

export interface Appointment {
  id: string
  vetId: string
  petId: string
  userId: string
  fecha: string
  hora: string
  motivo?: string
  estado: string
  vet?: Vet
}

export const createAppointment = (data: CreateAppointmentData): Promise<Appointment> =>
  apiFetch('/appointments', { method: 'POST', body: JSON.stringify(data) })

export const getMyAppointments = (): Promise<Appointment[]> =>
  apiFetch('/appointments/my')

// ─── Pets ─────────────────────────────────────────────────────────────────────

export interface Pet {
  id: string
  name: string
  especie: string
  raza?: string
  edad?: number
  peso?: number
  foto?: string
  ownerId: string
}

export interface CreatePetData {
  name: string
  especie: string
  raza?: string
  edad?: number
  peso?: number
}

export const getMyPets = (): Promise<Pet[]> =>
  apiFetch('/pets/my')

export const createPet = (data: CreatePetData): Promise<Pet> =>
  apiFetch('/pets', { method: 'POST', body: JSON.stringify(data) })

// ─── Medical Records ──────────────────────────────────────────────────────────

export interface MedicalRecord {
  id: string
  petId: string
  vetId: string
  fecha: string
  diagnostico: string
  tratamiento?: string
  notas?: string
}

export const getMedicalRecords = (petId: string): Promise<MedicalRecord[]> =>
  apiFetch(`/medical-records/pet/${petId}`)
