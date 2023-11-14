'use client'
import { Button } from './components/Button'
import { Input } from './components/Input'
import { twMerge } from "tailwind-merge";
import Image from 'next/image'
import img from '@/app/assets/archaon.jpeg'
import { useState } from 'react';
import { Loader } from './components/Loader';

const data = [
  { id: 1, src: img },
  { id: 2, src: img },
  { id: 3, src: img },
  { id: 4, src: img },
  { id: 5, src: img },
  { id: 6, src: img },
  { id: 7, src: img },
  { id: 8, src: img },
  { id: 9, src: img },
  { id: 10, src: img }
]


export default function Home() {

  const [state, setState] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = () => {
    console.log('click');
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setState(true)
    }, 3000)
  }

  return (
    <main className="h-screen w-full flex flex-col px-4 md:px-[80px] ">
      <div className={twMerge('h-[400px] flex gap-2 w-full py-4 items-end justify-center',
        (state || loading) && 'h-auto justify-normal'
      )}>
        <Input />
        <Button onClick={handleSearch}>Искать</Button>
      </div>

      {loading && <div className="h-8"><Loader /></div>}

      {state && <div className="gap-2 flex flex-wrap">
        {data.map((v, i) => {
          return <Image key={i} src={v.src} alt="search_image_item" className="w-[calc(26%-120px)] aspect-square" />
        })}
      </div>
      }

    </main >
  )
}
