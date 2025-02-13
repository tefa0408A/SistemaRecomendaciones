import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Photo, PhotoFormData, PhotoServer } from '../components/lib/types';

const API_URL = import.meta.env.VITE_API_SERVICIOS_URL as string;

export function usePhotos(id: number) {
  return useQuery<Photo[], Error>({
    queryKey: ['photos', id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/photo/v1/${id}`, {
        headers: { accept: 'application/json' }
      });

      if (response.status === 404) {
        return []; 
      }

      if (!response.ok) {
        throw new Error(`Error fetching photos: ${response.status}`);
      }

      return response.json();
    }
  });
}

export function useSavePhoto() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reviewData: PhotoFormData) => {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token');

            const response = await fetch(`${API_URL}/api/restaurant/v1/${reviewData.restaurante.id}/photo/up`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'accept': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) throw new Error('Error creating photo');
            return response.json() as Promise<Photo>;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['photo'] });
        }
    });
}


export function useUpPhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData:PhotoFormData) => {
      
      const formData = new FormData();
      formData.append("image", reviewData.file);

      const response = await fetch("http://localhost:5000/upload", {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Error creating photo');
      return response.json() as Promise<PhotoServer>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photo'] });
    }
  });
}
