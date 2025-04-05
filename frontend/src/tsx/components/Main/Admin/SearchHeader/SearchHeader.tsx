import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../hooks"
import { getUsers } from "../../../../redux/slice/AdminSlice/AdminSlice"

export function SearchHeader() {
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()
    const {page} = useAppSelector(state => state.admin)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(getUsers({page: page, param: value}))
    }
    return (
        <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-4" noValidate>
            <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                </div>
                <input type="text" value={value} onChange={onChange} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full " placeholder="Найти пользователя..."/>
            </div>
            <div>
                <button type="submit" className="border text-white rounded-lg px-4 py-2 w-full bg-(--color-haze-600)">Найти</button>
            </div>
        </form>
    )
}