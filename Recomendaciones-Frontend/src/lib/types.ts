export interface Cafe {
    id: number
    name: string
    description?: string
  }
  
  export type CafeFormData = Pick<Cafe, 'name' | 'description'>
