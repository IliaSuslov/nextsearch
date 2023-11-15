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
    const [image, setImage] = useState("")
    const loaderRef = useRef(null);

    const handleOpenImage = (image) => {
        setImage(image)
    }
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
            {image && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start 2xl:items-center z-10" onClick={() => setImage()}>
                    <div className="flex w-full justify-center z-20">
                        <Image
                            src={image}
                            alt="big_image"
                            width={500}
                            height={500}
                            className="w-auto h-auto aspect-square"
                        />
                    </div>
                </div>
            )}
            {data?.results?.map((v, i) => (
                <Image
                    onClick={() => handleOpenImage(v.urls.full)}
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