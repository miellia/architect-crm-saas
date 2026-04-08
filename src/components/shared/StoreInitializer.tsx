"use client";
import { useEffect } from 'react';
import { useCrmStore } from '@/store/useCrmStore';

export function StoreInitializer() {
  const fetchInitialData = useCrmStore(state => state.fetchInitialData);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return null;
}
