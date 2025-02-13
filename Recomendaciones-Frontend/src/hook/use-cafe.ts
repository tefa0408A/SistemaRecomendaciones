import { useQuery } from '@tanstack/react-query';
import type { Cafe } from '../components/lib/types';

const API_URL = import.meta.env.VITE_API_SERVICIOS_URL as string;

/*export function useCafes() {
    return useQuery<Cafe[]>({
        queryKey: ['cafes'],
        queryFn: async () => {

            const response = await fetch(`${API_URL}/api/restaurant/v1/all`, {
                headers: {
                    'accept': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Error fetching cafes');
            return response.json();
        }
    });
}*/

export function useCafes(distrito: string) {
  return useQuery<Cafe[]>({
    queryKey: ["cafes", distrito],
    queryFn: async () => {
      let url = `${API_URL}/api/restaurant/v1/all`;
      if (distrito) {
        url = `${API_URL}/api/restaurant/v1/distrito/${distrito}`;
      }

      const response = await fetch(url, {
        headers: {
          accept: "application/json"
        }
      });

      if (!response.ok) throw new Error("Error fetching cafes");
      return response.json();
    }
  });
}

export function useCafe(id: number) {
    return useQuery<Cafe>({
        queryKey: ['task', id],
        queryFn: async () => {

            const response = await fetch(`${API_URL}/api/restaurant/v1/${id}`, {
                headers: {
                    'accept': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Error fetching cafe');
            return response.json();
        },
        enabled: !!id,
    });
}
