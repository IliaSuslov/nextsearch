'use client'

import { Input } from './Input'
import { Button } from './Button'
import { twMerge } from 'tailwind-merge'
import { useStore } from 'effector-react';
import { fetchImagesEffect, store } from '../store/store';
import { useRef } from 'react';

export function Search() {
    const ref = useRef(null);
    const { loading, data } = useStore(store);

    const handleSearch = async () => {
        //@ts-ignore
        if (ref?.current?.value) {
            //@ts-ignore
            await fetchImagesEffect(ref.current.value)
        }
    }

    return (
        <div className={twMerge('h-[400px] flex gap-2 w-full py-4 items-end justify-center',
            (loading || data?.results?.length) && 'h-auto justify-normal'
        )}>
            <Input ref={ref} />
            <Button disabled={false} onClick={handleSearch}>Искать</Button>
        </div>
    )
}

