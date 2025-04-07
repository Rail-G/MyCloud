import React, { useState } from "react"
import { useAppDispatch } from "../../../../../hooks"
import { editUser } from "../../../../../redux/slice/AdminSlice/AdminSlice"
import { AdminEdit } from "../../../../../typing"

interface EditUserType {
    onClickToClose: () => void,
    editUserInfo: AdminEdit
}

export function EditUser({onClickToClose, editUserInfo}: EditUserType) {
    const [value, setValue] = useState(editUserInfo.username)
    const [checkbox, setCheckbox] = useState(editUserInfo.is_staff)
    const dispatch = useAppDispatch()
    const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(checkbox)
        setCheckbox(e.target.checked)
        console.log(checkbox)
    }
    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(editUser({id: editUserInfo.id, username: value, is_staff: checkbox}))
        onClickToClose()
    }
    return (
        <section className='tool-main'>
            <div className='tool-body'>
                <div onClick={onClickToClose} className='tool-close-btn'>
                    <span>
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#ffffff"></path> </g></svg>
                    </span>
                </div>
                <h2 className='text-2xl font-bold text-center mb-8 text-(--color-haze)'>Что хотите изменить?</h2>
                <form onSubmit={onSubmit} className='space-y-4' noValidate>
                    <div>
                        <label className="text-base font-medium text-(--color-haze) mb-2 block" htmlFor="tool-name" >Наименования</label>
                        <input className='tool-input' onChange={onChangeValue} type="text" value={value} name="username" id="tool-name" placeholder='Введите имя пользователя' />
                    </div>
                    <div>
                        <label className="text-base font-medium text-(--color-haze) mb-2 block" htmlFor="tool-name" >
                            <span>Сделать администратором</span>
                            <input className="ml-3" type="checkbox" onChange={onChangeCheckbox} checked={checkbox} name="is_staff" id="tool-name" />
                        </label>
                    </div>
                    <div>
                        <button type='submit' className='tool-submit-btn'>
                            Изменить
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}