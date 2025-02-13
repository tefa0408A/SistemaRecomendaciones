import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Auth, Login, User, UserFormData } from '../components/lib/types';

const API_URL = import.meta.env.VITE_API_SERVICIOS_URL as string

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reviewData: UserFormData) => {
            
            const response = await fetch(`${API_URL}/api/authentication/v1/signupuser`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (!response.ok) throw new Error('Error creating user');
            return response.json() as Promise<User>;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });
}

export function useLoginUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (reviewData: Auth) => {
            
            const response = await fetch(`${API_URL}/api/authentication/v1/signin`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

          if (!response.ok) throw new Error('Error al loguear usuario');
        
            return response.json() as Promise<Login>;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    });
}

