import './Registration.css'
export function Registration() {
    return (
        <section className="flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-5 px-7 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-(--color-haze) mb-6">Создание аккаунта</h2>
                <form id="registrationForm" className="space-y-6" noValidate>
                    <div>
                        <label htmlFor="username" className="flex text-(--color-haze) font-semibold mb-2">
                            <span>Имя пользователя</span>
                            <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="usernameError">Такое имя уже существует</p>
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="reg-form-input"
                            placeholder="Введите имя пользователя"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="flex text-(--color-haze) font-semibold mb-2">
                            <span>Email</span>
                            <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="emailError">Введите валидный email</p>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="reg-form-input"
                            placeholder="Введите email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="flex text-(--color-haze) font-semibold mb-2">
                            <span>Пароль</span>
                            <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="passwordError">Пароль занят</p>
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="reg-form-input"
                            placeholder="Введите пароль"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="flex text-(--color-haze) font-semibold mb-2">
                            <span>Подтверждение пароля</span>
                            <p className="text-red-500 font-normal text-sm leading-[1.8] ml-2" id="confirmPasswordError">Пароли не совподают</p>
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            className="reg-form-input"
                            placeholder="Подтвердите пароль"
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
                    <a href="#" className="reg-form-exists">Войти</a>
                </p>
            </div>
        </section>
    )
}