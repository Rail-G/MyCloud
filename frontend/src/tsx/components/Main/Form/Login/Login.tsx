import { useEffect, useState } from 'react'
import './Login.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { getUser } from '../../../../redux/slice/FormSlice/FormSlice'
import { Loader } from '../../Loader/Loader'
import { FormData } from '../../../../typing'
import { Link, useNavigate } from 'react-router-dom'
export function Login() {
    const [data, setData] = useState<FormData>({ username: '', password: '' })
    const [errorFront, setErrorFront] = useState({ username: false, email: false, password: false })
    const {userInfo, loading, error, isAuthenticated } = useAppSelector(state => state.form)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!/^[a-z0-9]{0,75}$/gi.test(data.username)) {
            setErrorFront(prev => ({...prev, username: true}))
            return
        }
        // if (data.email && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gi.test(data.email))
        //     setError(prev => ({...prev, email: true}))
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
                                    {errorFront.username && <p className="text-red-500 font-normal text-sm leading-[1.42] ml-2" id="usernameError">Неужели забыли своё имя?</p>}
                                    {(error != null && error.error) && <p className="text-red-500 font-normal text-sm leading-[1.42] ml-2" id="usernameError">{error.error}</p>}
                                </label>
                                <input
                                    type="username"
                                    id="username"
                                    name='username'
                                    className="log-form-input"
                                    placeholder="Моё имя..."
                                    value={data.username}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-(--color-haze) mb-2 flex">
                                    <span>Пароль</span>
                                    <p className="text-red-500 font-normal text-sm leading-[1.42] ml-2" id="usernameError">Пароль не подходит!</p>
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