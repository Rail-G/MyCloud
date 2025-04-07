import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="bg-(--color-haze) font-(family-name:--font-roboto) py-2 text-base z-2">
            <div className="container ms-auto flex justify-between items-center text-gray-200">
                <div className="w-full">
                    <p className="pl-20">© 2025 «Haze Corporation»</p>
                </div>
                <div className="w-full">
                    <ul className="list-none flex justify-center gap-6">
                        <li><Link className="hover:text-white" to="">О нас</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}