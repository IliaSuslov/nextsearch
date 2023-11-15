'use client'
import { useState, forwardRef } from 'react'
import search from '@/app/assets/search.png'
import cancel from '@/app/assets/cancel.png'
import Image from 'next/image'

export const Input = forwardRef<HTMLInputElement>(function Input(props, ref) {
    const [value, setValue] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <div className="flex w-full max-w-[420px] h-[48px] items-center place-content-between gap-[4px] px-2 py-3 bg-[#eeeeee] rounded-xl ">
            <div className="w-full inline-flex items-center gap-2">
                <Image src={search} alt="search_icon" />
                <input
                    ref={ref}
                    value={value}
                    onChange={handleChange}
                    placeholder='Телефоны, яблоки, груши...'
                    className="w-full focus:outline-none text-[#9c9c9c] text-[16px] bg-[#eeeeee] whitespace-nowrap">
                </input>
                {value?.length > 0 && <Image src={cancel} alt="cancel_icon" onClick={() => setValue("")} />}
            </div>
        </div>
    )
})
