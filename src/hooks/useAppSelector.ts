import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '@/store/store.ts';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
