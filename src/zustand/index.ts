import { create } from 'zustand'
import service from '../services';

type UserState = {
    data: any;
    mutate: () => Promise<void>
};

export const useUser = create<UserState>((set) => ({
    data: 0,
    mutate: async () => {
        const data = await service.fetch();
        data && set({ data })
    },
}))
