'use client'
import { Input } from './Input'
import { Button } from './Button'
import { twMerge } from 'tailwind-merge'
import { useStore } from 'effector-react';
import { fetchImagesEffect, store } from '../store/store';
import { useRef } from 'react';

export function Search() {
    const ref = useRef<HTMLInputElement>(null);
    const { loading, data } = useStore(store);

    const handleSearch = async () => {
        if (ref?.current?.value) {
            await fetchImagesEffect({ keyword: ref?.current?.value })
        }
    }
    return (
        <div className={twMerge('h-[400px] flex gap-2 w-full py-4 items-end justify-center',
            (loading || data?.results || data?.results?.length === 0) && 'h-auto justify-normal'
        )}>
            <Input ref={ref} />
            <Button disabled={false} onClick={handleSearch}>Искать</Button>
        </div>
    )
}

