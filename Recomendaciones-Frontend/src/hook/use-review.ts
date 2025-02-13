import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Review, ReviewFormData } from '../components/lib/types';

const API_URL = import.meta.env.VITE_API_SERVICIOS_URL as string;

export function useReviews(id: number) {
  return useQuery<Review[], Error>({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/restaurant/v1/${id}/comentarios`, {
        headers: { accept: 'application/json' }
      });

      if (response.status === 404) {
        return []; // Retorna un array vacío sin lanzar error
      }

      if (!response.ok) {
        throw new Error(`Error fetching reviews: ${response.status}`);
      }

      return response.json();
    }
  });
}

export function useCreateReview(idCafe:Number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reviewData: ReviewFormData) => {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token');


            const response = await fetch(`${API_URL}/api/restaurant/v1/${idCafe}/comentario`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'accept': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) throw new Error('Error creating review');
            return response.json() as Promise<Review>;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        }
    });
}
