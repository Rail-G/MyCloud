import { useAppDispatch } from '../../../hooks'
import { setCookie } from '../../../redux/slice/FormSlice/FormSlice'
import './Cookie.css'

export function Cookie() {
    const dispatch = useAppDispatch()
    const onClick = () => dispatch(setCookie())
    return (
        <section className="cookie-section">
            <div className="container ms-auto flex justify-center items-center text-white gap-15 px-10">
                <div className="flex items-center gap-3">
                    <span>
                        <svg width="60px" height="60px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M36.9 22.7l2.5-18.6C37 3.5 34.6 2 32 2c-2.6 0-5 1.5-7.5 2.2c-2.5.6-5.3.5-7.5 1.8s-3.6 3.8-5.4 5.6C9.8 13.4 7.3 14.8 6 17c-1.3 2.2-1.2 5-1.9 7.5C3.5 27 2 29.4 2 32c0 2.6 1.5 5 2.2 7.5c.6 2.5.5 5.3 1.8 7.5s3.8 3.6 5.6 5.4c1.8 1.8 3.1 4.3 5.4 5.6c2.2 1.3 5 1.2 7.5 1.9c2.5.6 4.9 2.1 7.5 2.1c2.6 0 5-1.5 7.5-2.2c2.5-.7 5.3-.6 7.5-1.9c2.2-1.3 3.6-3.8 5.4-5.6c1.8-1.8 4.3-3.1 5.6-5.4c1.3-2.2 1.2-5 1.9-7.5c.6-2.4 2.1-4.8 2.1-7.4c0-2.6-2.1-8.1-2.1-8.1l-23-1.2" fill="#dda85f"> </path> <path d="M59.4 22.4c-1 .3-2.4.2-3.9-.4c-2.1-.8-3.4-2.5-3.8-4.5c-1 .3-3.4 0-5-1c-2.4-1.5-2.9-5.7-2.9-5.7c-2.7-.8-4.7-4-4.4-6.7c-2.2-.6-5-.5-7.4-.5c-2.4 0-4.6 1.4-6.8 2c-2.3.6-4.9.5-6.9 1.7s-3.3 3.5-4.9 5.1c-1.7 1.7-4 2.9-5.1 4.9c-1.2 2-1.1 4.6-1.7 6.9c-.6 2.2-2 4.4-2 6.8c0 2.4 1.4 4.6 2 6.8c.6 2.3.5 4.9 1.7 6.9s3.5 3.3 5.1 4.9c1.7 1.7 2.9 4 4.9 5.1c2 1.2 4.6 1.1 6.9 1.7c2.2.6 4.4 2 6.8 2c2.4 0 4.6-1.4 6.8-2c2.3-.6 4.9-.5 6.9-1.7s3.3-3.5 4.9-5.1c1.7-1.7 4-2.9 5.1-4.9c1.2-2 1.1-4.6 1.7-6.9c.6-2.2 3-4 3.3-6.4c.8-3.9-1.2-8.3-1.3-9" fill="#f2cb7d"> </path> <g fill="#dda85f"> <path d="M50.1 10.8l-1.4 1.4l-1.3-1.4l1.3-1.3z"> </path> <path d="M55.8 17.8l-.6.7l-.7-.7l.7-.7z"> </path> <path d="M50.8 13.2l-.7.7l-.7-.7l.7-.7z"> </path> <path d="M44.6 7.1l-.7.7l-.7-.7l.7-.7z"> </path> <path d="M57.2 20.3l-.7.7l-.7-.7l.7-.7z"> </path> <path d="M57.8 17.8l-.7.7l-.7-.7l.7-.7z"> </path> </g> <path d="M11.8 20.6c-1 1.7.5 4.8 2.5 5.7c2.9 1.2 4.6 1.4 6.4-1.7c.6-1.1 1.4-4 1.1-4.7c-.4-1-2.1-3-3.2-3c-3.1.1-6.1 2.5-6.8 3.7" fill="#6d4934"> </path> <path d="M12.3 20.6c-.7 1.2 1.1 4.8 3.5 4.5c3.3-.4 3-7.2 1.6-7.2c-2.4 0-4.6 1.8-5.1 2.7" fill="#a37f6a"> </path> <path d="M45.2 39.1c1.4-.4 2.4-2.9 1.8-4.4c-.9-2.3-1.8-3.3-4.4-2.6c-.9.3-3 1.4-3.2 1.9c-.3.8-.5 2.8.1 3.4c1.7 1.7 4.7 2 5.7 1.7" fill="#6d4934"> </path> <path d="M43.8 36.7c1.1-.3 2.8-3.7 1-3.9c-3.1-.5-5.5 1-5.2 2.7c.3 1.7 3.4 1.4 4.2 1.2" fill="#a37f6a"> </path> <path d="M24.9 44.5c-.3-1.2-2.5-2.1-3.9-1.5c-2 .8-2.9 1.5-2.2 3.8c.2.8 1.2 2.6 1.7 2.7c.7.3 2.4.4 2.9-.1c1.5-1.4 1.7-4 1.5-4.9" fill="#6d4934"> </path> <path d="M23.2 43.6c-.2-.9-4.4.4-4 2c.8 2.7.8 3.1 1.6 3c1.5-.4 2.5-4.3 2.4-5" fill="#a37f6a"> </path> <path d="M51.1 25.5c-1.2.3-2.1 2.5-1.5 3.9c.8 2 2.7 2.3 4.8 1.2c1.8-.9 1.9-4.1 1.4-4.7c-1.5-1.5-3.8-.6-4.7-.4" fill="#6d4934"> </path> <path d="M50.6 26.6c-.6.7-1.1 3.5.4 3.1c2.7-.8 4.6-3.5 3.4-3.9c-1.5-.5-3.1 0-3.8.8" fill="#a37f6a"> </path> <path fill="#6d4934" d="M22.74 16.112l1.98-1.98l1.98 1.98l-1.98 1.98z"> </path> <g fill="#dda85f"> <path d="M14.706 33.483l1.979-1.98l1.98 1.979l-1.979 1.98z"> </path> <path d="M34.698 44.811l1.98-1.98l1.98 1.98l-1.98 1.98z"> </path> <path d="M32.038 39.289l2.687-2.687l2.687 2.687l-2.687 2.687z"> </path> <path d="M24.696 9.827l2.687-2.687l2.687 2.687l-2.687 2.687z"> </path> </g> <g fill="#6d4934"> <path d="M41.122 46.347l1.98-1.98l1.98 1.98l-1.98 1.98z"> </path> <path d="M49.076 35.215l1.98-1.98l1.98 1.98l-1.98 1.98z"> </path> <path d="M41.812 24.637l.99-.99l.99.99l-.99.99z"> </path> <path d="M13.726 38.266l.99-.99l.99.99l-.99.99z"> </path> </g> </g></svg>
                    </span>
                    <p className="">Мы используем cookie только для хранения данных. Продолжая использовать хранилище, вы даете свое согласие на работу с этими файлами</p>
                </div>
                <div>
                    <button onClick={onClick} className="cookie-btn">
                        Люблю печеньки
                    </button>
                </div>
            </div>
        </section>
    )
}