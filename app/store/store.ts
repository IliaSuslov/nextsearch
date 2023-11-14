import { createEffect, createEvent, createStore } from 'effector';


const API = "https://api.unsplash.com/search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query="

export const fetchImagesEffect = createEffect(async (keyword: string, pageNumber: number = 1, perPageNumber: number = 1000) => {
    const res = await fetch(`${API}${keyword}&page=${pageNumber}&per_page=${perPageNumber}`)
    return res.json()
})
export const store = createStore({
    data: {
        results: [],
        total_pages: null,
        total: null,
    },
    loading: false,
    error: null
})
store.on(fetchImagesEffect, (state) => ({ ...state, loading: true, error: null }))
store.on(fetchImagesEffect.done, (state, { result }) => ({ ...state, data: result, loading: false, error: null }))
//@ts-ignore TODO: ??? почему возникает ошибка ???
store.on(fetchImagesEffect.fail, (state, { error }) => ({ ...state, loading: false, error }))
