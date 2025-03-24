import { CloudBody } from "./Cloud/CloudBody/CloudBody";
import { CloudHeader } from "./Cloud/CloudHeader/CloudHeader";
import { FileInfo } from "./Cloud/FileInfo/FileInfo";
import { Login } from "./Form/Login/Login";
import { Registration } from "./Form/Registration/Registration";

export function Main() {
    return (
        <main className="flex-grow bg-gray-50">
            <div className="container mx-auto pt-6 px-10 flex flex-col gap-5 h-[calc(100vh-98px)] relative">
                <FileInfo />
                <CloudHeader />
                <CloudBody />
            </div>
        </main>
    )
}