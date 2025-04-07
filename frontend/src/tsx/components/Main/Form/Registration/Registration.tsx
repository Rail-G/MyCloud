import { useEffect, useState } from 'react'
import './Registration.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { changeError, createUser } from '../../../../redux/slice/FormSlice/FormSlice'
import { Loader } from '../../Loader/Loader'
import { registrationSubject } from '../../../../redux/epic/FormEpic/FormEpic'
export function Registration() {
    const [data, setData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const [errorFront, setErrorFront] = useState({ username: false, email: false, password: false, confirmPassword: false })
    const [typing, setTyping] = useState(false)
    const { loading, error, isAuthenticated } = useAppSelector(state => state.form)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!typing) {
            setTyping(true)
            setErrorFront({ username: false, email: false, password: false, confirmPassword: false })
            dispatch(changeError())
        }
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTyping(false)
        const usernamePattern = /^[a-z][a-z0-9]{3,19}$/gmi;
        const passwordPattern = /^(?=.*\d)(?=.*\W)(?=.*[A-Z])[\S]{6,}$/gm
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gi
        if (!usernamePattern.test(data.username)) {
            setErrorFront(prev => ({...prev, username: true}))
            return
        }
        if (data.email && !emailPattern.test(data.email)) {
            setErrorFront(prev => ({ ...prev, email: true }))
            return
        }
        if (!passwordPattern.test(data.password)) {
            setErrorFront(prev => ({ ...prev, password: true }))
            return
        }
        if (data.password != data.confirmPassword) {
            setErrorFront(prev => ({ ...prev, confirmPassword: true }))
            return
        }
        dispatch(createUser(data))
        const subscription  = registrationSubject.subscribe(success => {
            if (success) {
                navigate('/login')
            }
        })
        return () => subscription.unsubscribe();
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
                                    <label htmlFor="username" className="flex flex-col text-(--color-haze) font-semibold mb-2">
                                        <span>Имя пользователя</span>
                                        {(errorFront.username && !typing) && <p className="text-red-500 font-normal text-sm leading-[1.8]" id="emailError">Только буквы или цифры</p>}
                                        {(error != null && error.username && !typing) && <p className="text-red-500 font-normal text-sm leading-[1.8]" id="usernameError">{error.username}</p>}
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="reg-form-input"
                                        placeholder="Введите имя пользователя"
                                        maxLength={20}
                                        value={data.username}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="flex flex-col text-(--color-haze) font-semibold mb-2">
                                        <span>Email</span>
                                        {(errorFront.email && !typing) && <p className="text-red-500 font-normal text-sm leading-[1.8]" id="emailError">Не валидный email</p>}
                                        {(error != null && error.email && !typing) && <p className="text-red-500 font-normal text-sm leading-[1.8]" id="emailError">{error.email}</p>}
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
                                    <label htmlFor="password" className="flex flex-col text-(--color-haze) font-semibold mb-2">
                                        <span>Пароль</span>
                                        {(errorFront.password && !typing) && <p className="text-red-500 font-normal text-sm leading-[1.8]" id="emailError">Не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ</p>}
                                        {(error != null && error.password && !typing) && <p className="text-red-500 font-normal text-sm leading-[1.8]" id="passwordError">Пользователь с таким паролем уже существует</p>}
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
                                    <label htmlFor="confirm-password" className="flex flex-col text-(--color-haze) font-semibold mb-2">
                                        <span>Подтверждение пароля</span>
                                        {(errorFront.confirmPassword && !typing) && <p className="text-red-500 font-normal text-sm leading-[1.8]" id="confirmPasswordError">Пароли не совпадают</p>}
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