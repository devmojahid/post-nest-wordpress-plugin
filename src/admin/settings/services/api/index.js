import { useMutation, useQuery } from '@tanstack/react-query';

export const api = {
    settings: {
        get: async () => {
            const response = await window.postNestAxios.get('/settings');
            return response.data;
        },
        update: async (data) => {
            const response = await window.postNestAxios.post('/settings', data);
            return response.data;
        }
    },
    accounts: {
        list: async () => {
            const response = await window.postNestAxios.get('/accounts');
            return response.data;
        },
        create: async (data) => {
            const response = await window.postNestAxios.post('/accounts', data);
            return response.data;
        }
    }
};

// React Query hooks
export function useSettings() {
    return useQuery({
        queryKey: ['settings'],
        queryFn: () => api.settings.get()
    });
}

export function useUpdateSettings() {
    return useMutation({
        mutationFn: (data) => api.settings.update(data)
    });
} 