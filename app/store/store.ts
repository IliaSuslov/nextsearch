import { createEffect, createStore, createEvent } from 'effector';
const API = "https://api.unsplash.com/search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query="

interface IStore {
    data: { results?: Array<any> },
    loading: boolean,
    error: string | null
}
interface IImagesDataStore {
    keyword?: string,
    page: number,
    perPageNumber: number,
    totalPages?: number | null,
    total?: number | null
}
export const store = createStore<IStore>({
    data: {},
    loading: false,
    error: null
})

export const imagesDataStore = createStore<IImagesDataStore>({
    keyword: "",
    page: 2,
    perPageNumber: 30,
    totalPages: null,
    total: null,
})
export const updateImageData = createEvent<Partial<IImagesDataStore>>()

imagesDataStore.on(updateImageData, (state, payload) => ({ ...state, ...payload }))

export const loadMoreImagesEffect = createEffect(
    async () => {
        const { keyword, page, perPageNumber, totalPages } = imagesDataStore.getState();
        if (totalPages && page <= totalPages) {
            const res = await fetch(`${API}${keyword}&page=${page}&per_page=${perPageNumber}`)
            updateImageData({ page: page + 1 })
            return res.json()
        }
    })

export const fetchImagesEffect = createEffect(
    async ({ keyword }: { keyword: string }) => {
        const res = await fetch(`${API}${keyword}&page=1&per_page=30`)
        await new Promise(resolve => setTimeout(resolve, 2000))
        const data = await res.json()
        updateImageData({ keyword, totalPages: data.total_pages, total: data.total })
        return data
    })



store.on(fetchImagesEffect, (state) => ({ ...state, loading: true, error: null }))
store.on(fetchImagesEffect.done, (state, { result }) => ({ ...state, data: { ...result }, loading: false }))
//@ts-ignore TODO: ??? почему возникает ошибка ???
store.on(fetchImagesEffect.fail, (state, { error }) => ({ ...state, loading: false, error }))

store.on(loadMoreImagesEffect, (state) => ({ ...state }))
store.on(loadMoreImagesEffect.done, (state, { result }) => {
    if (state?.data?.results) return ({ ...state, data: { results: [...state?.data?.results, ...result.results,] } })
})
//@ts-ignore
store.on(loadMoreImagesEffect.fail, (state, { error }) => ({ ...state, error }))
