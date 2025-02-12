export interface Cafe {
  id: number
  nombre: string
  imagenUrl: string
  ubicacion: string
  distrito: string
  promedio: number
}


export interface Review {
  id: number
  comentario: string
  calificacion: number
  fecha: string
  usuario: {
    id: number
    nombres: string 
    apellidos: string
  }
  restaurante: {
    id:number
  }
  
}

export type ReviewFormData = Pick<Review, 'comentario' | 'calificacion'>
