import useSWR from 'swr';
import service from '../services';

export const useUser = () => useSWR('/user/haoyu', async () => await service.fetch());