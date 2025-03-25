import './Login.css'
export function Login() {
    return (
        <section className="flex justify-center items-center mt-20">
                <div className="bg-white shadow-2xl rounded-xl px-8 py-6 max-w-md w-full transform transition-all duration-300">
                    <h1 className="text-3xl font-bold text-center mb-8 text-(--color-haze)">С Возвращением!</h1>
                    <form action="#" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-(--color-haze) mb-2 flex">
                                <span>Имя пользователя</span>
                                <p className="text-red-500 font-normal text-sm leading-[1.42] ml-2" id="usernameError">Неужели забыли своё имя?</p>
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="log-form-input"
                                placeholder="Моё имя..."
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
                                className="log-form-input"
                                placeholder="Какой же у меня пароль?"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="log-form-remember"
                                    checked
                                />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-(--color-haze)">
                                        Запомнить меня
                                    </label>
                            </div>
                            <a href="https://tailwindflex.com/@nejaa-badr/registration-form"
                                className="text-sm text-(--color-haze) hover:text-(--color-haze) transition-colors duration-300">
                                Создать аккаунт
                            </a>
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
    )
}