import React, { useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../../hooks"
import { addFileThunk } from "../../../../../redux/thunk/addFileThunk"

interface AddFileType {
    setAddFile: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateFile({setAddFile}: AddFileType) {
    const ref = useRef<HTMLInputElement>(null)
    const {currentFolder} = useAppSelector(state => state.storage)
    const {userInfo} = useAppSelector(state => state.form)
    const [file, setFile] = useState<File>()
    const [comment, setComment] = useState<string>('')
    const dispatch = useAppDispatch()
    const onClickToCloseFile = () => {
        setAddFile(prev => !prev)
        setComment('')
    }
    const onChangeFile = () => setFile(ref.current!.files![0])
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value)
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('user', `${userInfo!.id}`);
        formData.append('file', file!);
        formData.append('comment', comment);
        formData.append('folder', `${currentFolder}`);
        setAddFile(prev => !prev)
        setComment('')
        dispatch(addFileThunk(formData))
    }
    return (
        <>
            <section className='tool-main'>
                <div className='tool-body'>
                    <div onClick={onClickToCloseFile} className='tool-close-btn'>
                        <span>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#ffffff"></path> </g></svg>
                        </span>
                    </div>
                    <h2 className='text-2xl font-bold text-center mb-8 text-(--color-haze)'>Добавления файла</h2>
                    <form onSubmit={onSubmit} className='space-y-4' noValidate>
                        <div className="flex justify-center flex-col items-center">
                            <label className="text-base font-medium text-white bg-(--color-haze) p-2 rounded mb-2 cursor-pointer hover:scale-[1.02] transition-all duration-200" htmlFor="tool-name" >Выберите файл</label>
                            <input ref={ref} onChange={onChangeFile} className='hidden' name="file" type="file" id="tool-name" />
                            {ref.current != null && <p className="mt-2 text-base"><span className="text-base font-medium text-(--color-haze)">Файл: </span><span>{file!.name}</span></p>}
                        </div>
                        <div>
                            <label className="text-base font-medium text-(--color-haze) mb-2 block" htmlFor="tool-name" >Комментарий</label>
                            <input onChange={onChangeInput} className='tool-input' value={comment} name="comment" type="text" id="tool-name" placeholder='Введите комментарий' />
                        </div>
                        <div>
                            <button type='submit' className='tool-submit-btn'>
                                Добавить
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}