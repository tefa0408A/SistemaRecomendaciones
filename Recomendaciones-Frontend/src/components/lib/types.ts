export interface User{
  id: number
  nombres: string
  apellidos: string
  email: string
  password: string
  confirmPassword: string
}

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


export interface Photo {
  id: number
  nombre: string
  descripcion: string
  fecha: string
  file: File
  usuario: {
    id: number
    nombres: string 
    apellidos: string
  }
  restaurante: {
    id:number
  }
}

export interface Auth{
  email: string
  password: string
}

export interface Login{
  token: string
}

export interface PhotoServer{
  imageUrl: string 
  nombre: string
}

export type ReviewFormData = Pick<Review, 'comentario' | 'calificacion'>

export type PhotoFormData = Pick<Photo, 'nombre' | 'descripcion' | 'file'> & {
  restaurante: {
    id: number
  }
}

export type UserFormData = Pick<User, 'nombres' | 'apellidos' | 'email' | 'password' | 'confirmPassword'>
