import { useEffect, useState } from 'react'
import './Registration.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../../../../redux/slice/FormSlice/FormSlice'
import { Loader } from '../../Loader/Loader'
export function Registration() {
    const [data, setData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const [errorFront, setErrorFront] = useState({ username: false, email: false, password: false })
    const { loading, error, isAuthenticated } = useAppSelector(state => state.form)
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
            setErrorFront(prev => ({ ...prev, username: true }))
            return
        }
        if (data.email && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gi.test(data.email)) {
            setErrorFront(prev => ({ ...prev, email: true }))
            return
        }
        if (data.password != data.confirmPassword) {
            setErrorFront(prev => ({ ...prev, password: true }))
            return
        }
        dispatch(createUser(data))
    }

    return (
        <>
            {loading && <Loader />}
            {!loading &&
                <>
                    <section className="flex justify-center items-center">
                        <div className="bg-white rounded-xl shadow-2xl p-5 px-7 max-w-md w-full">
                            <h2 className="text-2xl font-bold text-center text-(--color-haze) mb-6">Создание аккаунта</h2>
                            <form id="registrationForm" className="space-y-6" onSubmit={onSubmit} noValidate>
                                <div>
                                    <label htmlFor="username" className="flex text-(--color-haze) font-semibold mb-2">
                                        <span>Имя пользователя</span>
                                        {errorFront.username && <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="usernameError">Только буквы или цифры</p>}
                                        {(error != null && error.username) && <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="usernameError">{error.username}</p>}
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="reg-form-input"
                                        placeholder="Введите имя пользователя"
                                        value={data.username}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="flex text-(--color-haze) font-semibold mb-2">
                                        <span>Email</span>
                                        {errorFront.email && <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="emailError">Не валидный email</p>}
                                        {(error != null && error.email) && <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="emailError">{error.email}</p>}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="reg-form-input"
                                        placeholder="Введите email"
                                        value={data.email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="flex text-(--color-haze) font-semibold mb-2">
                                        <span>Пароль</span>
                                        {(error != null && error.password) && <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="passwordError">Пользователь с таким паролем уже существует</p>}
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="reg-form-input"
                                        placeholder="Введите пароль"
                                        value={data.password}
                                        onChange={onChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirm-password" className="flex text-(--color-haze) font-semibold mb-2">
                                        <span>Подтверждение пароля</span>
                                        {errorFront.password && <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="confirmPasswordError">Пароли не совподают</p>}
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        name="confirmPassword"
                                        className="reg-form-input"
                                        placeholder="Подтвердите пароль"
                                        value={data.confirmPassword}
                                        onChange={onChange}
                                        required
                                    />
                                </div>

                                <button
                                    className="reg-form-submit"
                                >
                                    Зарегистрироваться
                                </button>
                            </form>

                            <p className="text-center text-gray-600 mt-6">
                                Уже имеется аккаунт?
                                <Link to="/login" className="reg-form-exists">Войти</Link>
                            </p>
                        </div>
                    </section>
                </>
            }
        </>
    )
}