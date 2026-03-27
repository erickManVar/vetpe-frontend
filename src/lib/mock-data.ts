export interface Vet {
  id: string;
  slug: string;
  name: string;
  photo: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  visitPrice: number;
  districts: string[];
  species: string[];
  availableToday: boolean;
  about: string;
  yearsExperience: number;
  education: string;
  schedule: { [day: string]: string };
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  petName: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  weight: number;
  photo: string;
}

export interface Appointment {
  id: string;
  vetName: string;
  vetSlug: string;
  date: string;
  time: string;
  petName: string;
  petSpecies: string;
  diagnosis: string;
  notes: string;
  documents: string[];
  status: "completed" | "upcoming" | "cancelled";
}

export const vets: Vet[] = [
  {
    id: "1",
    slug: "dra-ana-flores",
    name: "Dra. Ana Flores Ramos",
    photo: "https://api.dicebear.com/7.x/personas/svg?seed=ana&backgroundColor=d1fae5",
    specialties: ["Medicina General", "Dermatología"],
    rating: 4.9,
    reviewCount: 124,
    visitPrice: 80,
    districts: ["Miraflores", "San Isidro", "Barranco"],
    species: ["perros", "gatos"],
    availableToday: true,
    about:
      "Veterinaria con más de 10 años de experiencia en medicina interna y dermatología. Egresada de la UNMSM con especialización en Lima y Madrid. Apasionada por el bienestar animal y la atención personalizada a domicilio.",
    yearsExperience: 10,
    education: "UNMSM — Medicina Veterinaria y Zootecnia",
    schedule: {
      Lunes: "9:00 AM – 6:00 PM",
      Martes: "9:00 AM – 6:00 PM",
      Miércoles: "10:00 AM – 5:00 PM",
      Jueves: "9:00 AM – 6:00 PM",
      Viernes: "9:00 AM – 4:00 PM",
      Sábado: "9:00 AM – 2:00 PM",
      Domingo: "No disponible",
    },
    reviews: [
      {
        id: "r1",
        author: "Carlos M.",
        rating: 5,
        date: "2025-03-10",
        comment: "Excelente atención, muy profesional y cariñosa con mi perro. Llegó puntual y explicó todo con detalle.",
        petName: "Max",
      },
      {
        id: "r2",
        author: "Lucía T.",
        rating: 5,
        date: "2025-02-28",
        comment: "La mejor veterinaria a domicilio. Mi gata siempre se estresa en la clínica, en casa fue completamente diferente.",
        petName: "Luna",
      },
      {
        id: "r3",
        author: "Roberto P.",
        rating: 4,
        date: "2025-02-15",
        comment: "Muy buena atención, puntual y profesional. El precio es justo para la calidad del servicio.",
        petName: "Rocky",
      },
    ],
  },
  {
    id: "2",
    slug: "dr-miguel-quispe",
    name: "Dr. Miguel Quispe Torres",
    photo: "https://api.dicebear.com/7.x/personas/svg?seed=miguel&backgroundColor=d1fae5",
    specialties: ["Cirugía", "Traumatología"],
    rating: 4.8,
    reviewCount: 89,
    visitPrice: 100,
    districts: ["Surco", "La Molina", "San Borja"],
    species: ["perros", "gatos", "exóticos"],
    availableToday: true,
    about:
      "Especialista en cirugía y traumatología veterinaria con 8 años de experiencia. Graduado de la Universidad Cayetano Heredia. Realizo procedimientos menores a domicilio y consultas de seguimiento post-quirúrgico.",
    yearsExperience: 8,
    education: "Universidad Peruana Cayetano Heredia — Medicina Veterinaria",
    schedule: {
      Lunes: "8:00 AM – 5:00 PM",
      Martes: "8:00 AM – 5:00 PM",
      Miércoles: "No disponible",
      Jueves: "8:00 AM – 5:00 PM",
      Viernes: "8:00 AM – 5:00 PM",
      Sábado: "8:00 AM – 1:00 PM",
      Domingo: "No disponible",
    },
    reviews: [
      {
        id: "r4",
        author: "Sofía R.",
        rating: 5,
        date: "2025-03-05",
        comment: "El Dr. Quispe atendió a mi perro después de una fractura. Increíblemente profesional y tranquilizador.",
        petName: "Toby",
      },
      {
        id: "r5",
        author: "Andrés V.",
        rating: 5,
        date: "2025-02-20",
        comment: "Seguimiento post-operatorio a domicilio. Excelente servicio, muy recomendable.",
        petName: "Bella",
      },
    ],
  },
  {
    id: "3",
    slug: "dra-patricia-vega",
    name: "Dra. Patricia Vega Castillo",
    photo: "https://api.dicebear.com/7.x/personas/svg?seed=patricia&backgroundColor=d1fae5",
    specialties: ["Pediatría Veterinaria", "Vacunación"],
    rating: 4.9,
    reviewCount: 203,
    visitPrice: 70,
    districts: ["Miraflores", "Barranco", "Chorrillos", "San Isidro"],
    species: ["perros", "gatos"],
    availableToday: false,
    about:
      "Especialista en cachorros y gatitos. 12 años dedicados a la pediatría veterinaria y planes de vacunación. Mi objetivo es que tu mascota tenga el mejor comienzo de vida con atención personalizada en casa.",
    yearsExperience: 12,
    education: "UNMSM — Medicina Veterinaria y Zootecnia",
    schedule: {
      Lunes: "9:00 AM – 7:00 PM",
      Martes: "9:00 AM – 7:00 PM",
      Miércoles: "9:00 AM – 7:00 PM",
      Jueves: "9:00 AM – 7:00 PM",
      Viernes: "9:00 AM – 5:00 PM",
      Sábado: "10:00 AM – 3:00 PM",
      Domingo: "No disponible",
    },
    reviews: [
      {
        id: "r6",
        author: "María José L.",
        rating: 5,
        date: "2025-03-12",
        comment: "La Dra. Patricia es maravillosa con los cachorros. Mi perrita no se alteró nada durante la vacunación.",
        petName: "Nala",
      },
    ],
  },
  {
    id: "4",
    slug: "dr-jose-huaman",
    name: "Dr. José Huamán Díaz",
    photo: "https://api.dicebear.com/7.x/personas/svg?seed=jose&backgroundColor=d1fae5",
    specialties: ["Aves Exóticas", "Reptiles"],
    rating: 4.7,
    reviewCount: 56,
    visitPrice: 90,
    districts: ["San Isidro", "Jesús María", "Lince", "Pueblo Libre"],
    species: ["aves", "exóticos"],
    availableToday: true,
    about:
      "El único veterinario de Lima especializado en aves exóticas y reptiles a domicilio. 7 años trabajando con loros, cacatúas, iguanas y otras especies no convencionales. Miembro de la Asociación Latinoamericana de Especialistas en Fauna Silvestre.",
    yearsExperience: 7,
    education: "Universidad Nacional Agraria La Molina — Medicina Veterinaria",
    schedule: {
      Lunes: "10:00 AM – 6:00 PM",
      Martes: "10:00 AM – 6:00 PM",
      Miércoles: "10:00 AM – 6:00 PM",
      Jueves: "10:00 AM – 6:00 PM",
      Viernes: "10:00 AM – 4:00 PM",
      Sábado: "9:00 AM – 2:00 PM",
      Domingo: "9:00 AM – 1:00 PM",
    },
    reviews: [
      {
        id: "r7",
        author: "Fernando C.",
        rating: 5,
        date: "2025-03-01",
        comment: "¡Por fin un vet que sabe de loros! El Dr. Huamán diagnosticó el problema de mi guacamayo perfectamente.",
        petName: "Kiwi",
      },
    ],
  },
  {
    id: "5",
    slug: "dra-carmen-leon",
    name: "Dra. Carmen León Salas",
    photo: "https://api.dicebear.com/7.x/personas/svg?seed=carmen&backgroundColor=d1fae5",
    specialties: ["Cardiología", "Medicina Interna"],
    rating: 5.0,
    reviewCount: 71,
    visitPrice: 120,
    districts: ["San Isidro", "Miraflores", "La Molina"],
    species: ["perros", "gatos"],
    availableToday: false,
    about:
      "Cardióloga veterinaria con formación en Buenos Aires y Lima. Especializada en diagnóstico y manejo de enfermedades cardíacas en perros y gatos. Cuento con ecógrafo portátil para realizar ecocardiogramas en la comodidad de tu hogar.",
    yearsExperience: 9,
    education: "Universidad de Buenos Aires — Especialización en Cardiología Veterinaria",
    schedule: {
      Lunes: "No disponible",
      Martes: "9:00 AM – 5:00 PM",
      Miércoles: "9:00 AM – 5:00 PM",
      Jueves: "9:00 AM – 5:00 PM",
      Viernes: "9:00 AM – 5:00 PM",
      Sábado: "10:00 AM – 2:00 PM",
      Domingo: "No disponible",
    },
    reviews: [
      {
        id: "r8",
        author: "Isabel M.",
        rating: 5,
        date: "2025-02-25",
        comment: "La Dra. Carmen salvó a mi perro con un diagnóstico oportuno de cardiomiopatía. Eternamente agradecida.",
        petName: "Bruno",
      },
    ],
  },
  {
    id: "6",
    slug: "dr-luis-mamani",
    name: "Dr. Luis Mamani Chávez",
    photo: "https://api.dicebear.com/7.x/personas/svg?seed=luis&backgroundColor=d1fae5",
    specialties: ["Medicina General", "Nutrición"],
    rating: 4.6,
    reviewCount: 148,
    visitPrice: 65,
    districts: ["Surco", "Chorrillos", "San Juan de Miraflores", "Villa María del Triunfo"],
    species: ["perros", "gatos"],
    availableToday: true,
    about:
      "Veterinario generalista con enfoque en nutrición y medicina preventiva. 6 años brindando atención de calidad en zonas sur de Lima. Creo firmemente que la salud empieza por la alimentación correcta.",
    yearsExperience: 6,
    education: "Universidad Nacional Agraria La Molina — Medicina Veterinaria",
    schedule: {
      Lunes: "8:00 AM – 6:00 PM",
      Martes: "8:00 AM – 6:00 PM",
      Miércoles: "8:00 AM – 6:00 PM",
      Jueves: "8:00 AM – 6:00 PM",
      Viernes: "8:00 AM – 6:00 PM",
      Sábado: "8:00 AM – 3:00 PM",
      Domingo: "No disponible",
    },
    reviews: [
      {
        id: "r9",
        author: "Gabriela S.",
        rating: 5,
        date: "2025-03-08",
        comment: "El Dr. Mamani me ayudó a mejorar la dieta de mi perra. Perdió 3kg y ahora está mucho más activa.",
        petName: "Coco",
      },
    ],
  },
  {
    id: "7",
    slug: "dra-rosa-gutierrez",
    name: "Dra. Rosa Gutiérrez Paredes",
    photo: "https://api.dicebear.com/7.x/personas/svg?seed=rosa&backgroundColor=d1fae5",
    specialties: ["Oncología", "Medicina Interna"],
    rating: 4.8,
    reviewCount: 43,
    visitPrice: 110,
    districts: ["San Isidro", "Miraflores", "San Borja", "Surco"],
    species: ["perros", "gatos"],
    availableToday: false,
    about:
      "Oncóloga veterinaria especializada en diagnóstico temprano y acompañamiento oncológico. Formación en Chile y Perú. Brindo apoyo emocional tanto al paciente como a la familia durante el tratamiento.",
    yearsExperience: 11,
    education: "Universidad de Chile — Especialización en Oncología Veterinaria",
    schedule: {
      Lunes: "9:00 AM – 5:00 PM",
      Martes: "9:00 AM – 5:00 PM",
      Miércoles: "No disponible",
      Jueves: "9:00 AM – 5:00 PM",
      Viernes: "9:00 AM – 5:00 PM",
      Sábado: "No disponible",
      Domingo: "No disponible",
    },
    reviews: [
      {
        id: "r10",
        author: "Pedro A.",
        rating: 5,
        date: "2025-03-15",
        comment: "La Dra. Rosa acompañó a nuestra familia durante el tratamiento de cáncer de nuestro perro. Una persona extraordinaria.",
        petName: "Thor",
      },
    ],
  },
  {
    id: "8",
    slug: "dr-carlos-apaza",
    name: "Dr. Carlos Apaza Medina",
    photo: "https://api.dicebear.com/7.x/personas/svg?seed=carlos&backgroundColor=d1fae5",
    specialties: ["Dermatología", "Alergología"],
    rating: 4.7,
    reviewCount: 92,
    visitPrice: 85,
    districts: ["La Molina", "Surco", "San Borja", "Ate"],
    species: ["perros", "gatos", "exóticos"],
    availableToday: true,
    about:
      "Dermatólogo veterinario especializado en alergias, enfermedades de la piel y del pelaje. 8 años de experiencia. Utilizo equipos dermatoscópicos portátiles para diagnósticos precisos en casa.",
    yearsExperience: 8,
    education: "UNMSM — Especialización en Dermatología Veterinaria",
    schedule: {
      Lunes: "9:00 AM – 6:00 PM",
      Martes: "9:00 AM – 6:00 PM",
      Miércoles: "9:00 AM – 6:00 PM",
      Jueves: "9:00 AM – 6:00 PM",
      Viernes: "9:00 AM – 6:00 PM",
      Sábado: "9:00 AM – 2:00 PM",
      Domingo: "No disponible",
    },
    reviews: [
      {
        id: "r11",
        author: "Valentina H.",
        rating: 5,
        date: "2025-03-03",
        comment: "Mi perro sufría de alergias hace años. El Dr. Apaza identificó el problema en la primera visita. ¡Increíble!",
        petName: "Simba",
      },
    ],
  },
];

export const pets: Pet[] = [
  {
    id: "p1",
    name: "Max",
    species: "Perro",
    breed: "Labrador Retriever",
    age: 3,
    weight: 28,
    photo: "https://api.dicebear.com/7.x/bottts/svg?seed=max&backgroundColor=d1fae5",
  },
  {
    id: "p2",
    name: "Luna",
    species: "Gata",
    breed: "Siamés",
    age: 2,
    weight: 4,
    photo: "https://api.dicebear.com/7.x/bottts/svg?seed=luna&backgroundColor=dbeafe",
  },
  {
    id: "p3",
    name: "Kiwi",
    species: "Ave",
    breed: "Periquito Australiano",
    age: 1,
    weight: 0.035,
    photo: "https://api.dicebear.com/7.x/bottts/svg?seed=kiwi&backgroundColor=fef3c7",
  },
];

export const appointments: Appointment[] = [
  {
    id: "a1",
    vetName: "Dra. Ana Flores Ramos",
    vetSlug: "dra-ana-flores",
    date: "2025-03-15",
    time: "10:00 AM",
    petName: "Max",
    petSpecies: "Perro",
    diagnosis: "Dermatitis alérgica leve. Se recetó antihistamínico y shampoo medicado.",
    notes: "Revisión en 15 días. Evitar contacto con pasto húmedo.",
    documents: ["Receta médica", "Informe de consulta"],
    status: "completed",
  },
  {
    id: "a2",
    vetName: "Dra. Patricia Vega Castillo",
    vetSlug: "dra-patricia-vega",
    date: "2025-02-20",
    time: "3:00 PM",
    petName: "Luna",
    petSpecies: "Gata",
    diagnosis: "Vacunación triple felina + antiparasitario interno. Todo en orden.",
    notes: "Próxima vacuna en 12 meses. Peso actual: 4.2 kg.",
    documents: ["Carnet de vacunación", "Recibo de pago"],
    status: "completed",
  },
  {
    id: "a3",
    vetName: "Dr. José Huamán Díaz",
    vetSlug: "dr-jose-huaman",
    date: "2025-01-10",
    time: "11:30 AM",
    petName: "Kiwi",
    petSpecies: "Ave",
    diagnosis: "Revisión general. Plumaje en buen estado. Dieta balanceada recomendada.",
    notes: "Agregar más frutas y verduras a la dieta. Evitar semillas en exceso.",
    documents: ["Informe de consulta"],
    status: "completed",
  },
  {
    id: "a4",
    vetName: "Dr. Luis Mamani Chávez",
    vetSlug: "dr-luis-mamani",
    date: "2024-12-05",
    time: "9:00 AM",
    petName: "Max",
    petSpecies: "Perro",
    diagnosis: "Control de peso y plan nutricional. Sobrepeso leve detectado.",
    notes: "Reducir 20% la ración de croquetas. Aumentar ejercicio diario.",
    documents: ["Plan nutricional", "Informe de consulta"],
    status: "completed",
  },
  {
    id: "a5",
    vetName: "Dra. Ana Flores Ramos",
    vetSlug: "dra-ana-flores",
    date: "2025-04-02",
    time: "2:00 PM",
    petName: "Max",
    petSpecies: "Perro",
    diagnosis: "Pendiente",
    notes: "Seguimiento dermatológico",
    documents: [],
    status: "upcoming",
  },
];

export const districts = [
  "Todos",
  "Miraflores",
  "San Isidro",
  "Surco",
  "La Molina",
  "Barranco",
  "San Borja",
  "Chorrillos",
  "Jesús María",
  "Lince",
  "Pueblo Libre",
  "Ate",
  "San Juan de Miraflores",
  "Villa María del Triunfo",
];

export const speciesOptions = [
  { value: "todos", label: "Todos" },
  { value: "perros", label: "Perros" },
  { value: "gatos", label: "Gatos" },
  { value: "aves", label: "Aves" },
  { value: "exóticos", label: "Exóticos" },
];
