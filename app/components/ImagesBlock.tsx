//@ts-nocheck
'use client'
import Image from 'next/image'
import { useStore } from 'effector-react'
import { store } from '../store/store'
import Loader from './Loader'
import { Suspense } from 'react'

export function ImagesBlock() {
    const { data, loading, error } = useStore(store)

    if (loading) return <div className="h-8"><Loader /></div>
    if (error) return <div className="h-8 text-[#787878]">К сожалению, поиск не дал результатов</div>
    return (
        <div className="gap-2 grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {data?.results?.map((v, i) => (
                <Suspense key={i} fallback={<Loader />}>
                    <Image
                        src={v?.urls?.regular}
                        width={500}
                        height={500}
                        alt="search_image_item"
                        className='aspect-square'
                    />
                </Suspense>
            ))}
        </div>
    )
}

// export async function getServerSideProps() {
//     const init = store.getState();

//     return {
//         props: {
//             init
//         },
//     };

// }


