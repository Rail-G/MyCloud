import { JSX, ReactNode } from "react";
import { Cookie } from "./Cookie/Cookie";
import { Loader } from "./Loader/Loader";
import { useAppSelector } from "../../hooks";
import { Notification } from "./Notification/Notification";

export function Main({children}: {children: ReactNode}): JSX.Element {
    const {isAuthenticated} = useAppSelector(state => state.form)
    return (
        <main className="flex-grow bg-gray-100">
            <div className="container mx-auto pt-4 px-10 flex flex-col gap-4 max-h-[calc(100%-98px)] min-h-[calc(100vh-98px)] h-full relative">
                {isAuthenticated && <Notification text='Вы успешно зашли как'/>}
                {children}
            </div>
            {/* <Cookie /> */}
        </main>
    )
}