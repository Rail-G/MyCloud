import { useState } from 'react'
import './Login.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { changeError, getUser } from '../../../../redux/slice/FormSlice/FormSlice'
import { Loader } from '../../Loader/Loader'
import { FormData } from '../../../../typing'
import { Link, useNavigate } from 'react-router-dom'
export function Login() {
    const [data, setData] = useState<FormData>({ username: '', password: '' })
    const {loading, error: formError, isAuthenticated } = useAppSelector(state => state.form)
    const [typing, setTyping] = useState(false)
    const [frontError, setFrontError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    if (isAuthenticated) {
        navigate('/')
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!typing) {
            setTyping(true)
            dispatch(changeError())
        }
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTyping(false)
        const pattern = /^[a-z][a-z0-9]{3,19}$/gmi;
        if (!pattern.test(data.username)) {
            setFrontError(true)
            return
        }
    
        setFrontError(false)
        dispatch(getUser(data))
    }
    return (
        <>
            {loading && <Loader />}
            {!loading && <>
                <section className="flex justify-center items-center mt-20">
                    <div className="bg-white shadow-2xl rounded-xl px-8 py-6 max-w-md w-full transform transition-all duration-300">
                        <h1 className="text-3xl font-bold text-center mb-8 text-(--color-haze)">С Возвращением!</h1>
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-(--color-haze) mb-2 flex">
                                    <span>Имя пользователя</span>
                                    {(frontError && !typing) &&  <p className="text-red-500 font-normal text-sm leading-[1.42] ml-2" id="usernameError">Невалидные значения</p>}
                                    {(formError != null && formError.error && !typing ) && <p className="text-red-500 font-normal text-sm leading-[1.42] ml-2" id="usernameError">{formError.error}</p>}
                                </label>
                                <input
                                    type="username"
                                    id="username"
                                    name='username'
                                    className="log-form-input"
                                    placeholder="Моё имя..."
                                    value={data.username}
                                    maxLength={20}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-(--color-haze) mb-2 flex">
                                    <span>Пароль</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name='password'
                                    className="log-form-input"
                                    placeholder="Какой же у меня пароль?"
                                    value={data.password}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <Link to="/registration"
                                    className="text-sm text-(--color-haze) hover:text-(--color-haze) transition-colors duration-300">
                                    Создать аккаунт
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="log-form-submit"
                            >
                                Войти
                            </button>
                        </form>
                    </div>
                </section>
            </>}
        </>
    )
}