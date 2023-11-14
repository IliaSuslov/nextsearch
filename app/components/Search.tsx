'use client'

import { Input } from './Input'
import { Button } from './Button'
import { twMerge } from 'tailwind-merge'
import { useStore } from 'effector-react';
import { fetchImagesEffect, store } from '../store/store';

export function Search() {
    const { loading, data } = useStore(store);

    const handleSearch = async () => {
        await fetchImagesEffect('snow')
    }

    return (
        <div className={twMerge('h-[400px] flex gap-2 w-full py-4 items-end justify-center',
            (loading || data?.results?.length) && 'h-auto justify-normal'
        )}>
            <Input />
            <Button disabled={false} onClick={handleSearch}>Искать</Button>
        </div>
    )
}

