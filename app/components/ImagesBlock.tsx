//@ts-nocheck
'use client'
import Image from 'next/image'
import { useStore } from 'effector-react'
import { store, loadMoreImagesEffect } from '../store/store'
import Loader from './Loader'
import { useState, useRef, useEffect } from 'react'

export function ImagesBlock() {
    const { data, loading, error } = useStore(store)
    const [isFetching, setIsFetching] = useState(false)
    const loaderRef = useRef(null);

    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching) {
            setIsFetching(true);
            loadMoreImagesEffect()
                .finally(() => { setIsFetching(false) });
        }
    };
    useEffect(() => {
        let observer;
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        if (data?.results?.length > 0) {
            observer = new IntersectionObserver(handleObserver, options);

            if (loaderRef.current) {
                observer.observe(loaderRef.current);
            }
        }
        return () => {
            if (loaderRef.current && observer) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [data?.results]);


    if (loading) return <Loader />
    if (error || data?.results?.length === 0) return <div className="h-8 text-[#2c2525]">К сожалению, поиск не дал результатов</div>
    return (
        <div className="gap-2 grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 pb-4">
            {data?.results?.map((v, i) => (
                <Image
                    key={i}
                    src={v?.urls?.regular}
                    width={500}
                    height={500}
                    alt="search_image_item"
                    className='aspect-square'
                />
            ))}
            <div ref={loaderRef}></div>
        </div>
    )
}