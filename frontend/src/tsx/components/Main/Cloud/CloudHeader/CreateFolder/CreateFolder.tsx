import React, { useState } from "react"
import { useAppDispatch } from "../../../../../hooks"

interface AddFolderType {
    folderState: React.Dispatch<React.SetStateAction<boolean>>,
    onConfirm: (value: string) => void
}

export function CreateFolder({folderState, onConfirm}: AddFolderType) {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const onClickToCloseFolder = () => folderState(false)
    const onSubmit = (e: React.FormEvent, value: string) => {
        e.preventDefault()
        if (value.length > 25) {
            setError(true)
        }
        folderState(false)
        onConfirm(value)
        setError(false)
    }
    return (
        <>
            <section className='tool-main'>
                <div className='tool-body'>
                    <div onClick={onClickToCloseFolder} className='tool-close-btn'>
                        <span>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#ffffff"></path> </g></svg>
                        </span>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-8 text-(--color-haze)'>Что хотите изменить?</h2>
                    <form onSubmit={(e) => onSubmit(e, value)} className='space-y-4' noValidate>
                        <div>
                            <label className="text-base font-medium text-(--color-haze) mb-2 block" htmlFor="tool-name" >
                                <span>Название папки</span>
                                {error && <p className="text-red-500 font-normal text-sm leading-[1.42] ml-2" id="usernameError">Не более 25 символов</p>}
                                </label>
                            <input className='tool-input' onChange={onChange} value={value} type="text" id="tool-name" placeholder='Введите название' />
                        </div>
                        <div>
                            <button type="submit" className='tool-submit-btn'>
                                Выполнить
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}