export function Footer() {
    return (
        <footer className="bg-(--color-haze) font-(family-name:--font-roboto) py-2 text-base">
            <div className="container ms-auto flex justify-between items-center text-gray-200">
                <div className="w-full">
                    <p className="pl-20">© 2025 «Haze Corporation»</p>
                </div>
                <div className="w-full">
                    <ul className="list-none flex justify-center gap-6">
                        <li><a className="hover:text-white" href="">О нас</a></li>
                        <li><a className="hover:text-white" href="">Контакты</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}