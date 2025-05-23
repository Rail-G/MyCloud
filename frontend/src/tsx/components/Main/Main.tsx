import { JSX, ReactNode } from "react";
import { Cookie } from "./Cookie/Cookie";
import { useAppSelector } from "../../hooks";
import { Notification } from "./Notification/Notification";

export function Main({children}: {children: ReactNode}): JSX.Element {
    const {userInfo, isAuthenticated, cookie} = useAppSelector(state => state.form)
    const {error: fileError} = useAppSelector(state => state.file)
    const {error: folderError} = useAppSelector(state => state.folder)
    const {error: adminError} = useAppSelector(state => state.admin)

    return (
        <main className="flex-grow bg-gray-100">
            <div className="container mx-auto pt-4 px-10 flex flex-col gap-4 max-h-[calc(100%-98px)] min-h-[calc(100vh-98px)] h-full relative">
                {isAuthenticated && <Notification operationType={true} text={`Вы успешно зашли как ${userInfo?.username}`}/>}
                {(fileError || folderError) && <Notification operationType={false} text={fileError! || folderError!}/>}
                {adminError && <Notification operationType={false} text="Что-то пошло не так"/>}
                {children}
            </div>
            {!cookie && <Cookie />}
        </main>
    )
}