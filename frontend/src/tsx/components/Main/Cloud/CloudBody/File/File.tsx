import { StorageFile } from "../../../../../typing";
import { formatDate } from "../../../../../utils";

interface FileProps {
    file: StorageFile,
    setInfo: React.Dispatch<React.SetStateAction<{
        set: boolean;
        file: StorageFile | null;
    }>>
}

export function File({file, setInfo}: FileProps) {
    const onClick = () => {
        setInfo(() => ({set: true, file: file}))
    }
    return (
        <div onClick={onClick} className="bg-white hover:shadow-md cursor-pointer px-5 py-5 flex justify-center flex-col h-full w-full">
            <div className="relative mb-2">
                <svg className="mx-auto" width="120px" height="120px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>file-document</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Icon-Set" transform="translate(-154.000000, -99.000000)" fill="#fbda7e"> <path d="M174,107 C172.896,107 172,106.104 172,105 L172,101 L178,107 L174,107 L174,107 Z M178,127 C178,128.104 177.104,129 176,129 L158,129 C156.896,129 156,128.104 156,127 L156,103 C156,101.896 156.896,101 158,101 L169.972,101 C169.954,103.395 170,105 170,105 C170,107.209 171.791,109 174,109 L178,109 L178,127 L178,127 Z M172,99 L172,99.028 C171.872,99.028 171.338,98.979 170,99 L158,99 C155.791,99 154,100.791 154,103 L154,127 C154,129.209 155.791,131 158,131 L176,131 C178.209,131 180,129.209 180,127 L180,109 L180,107 L172,99 L172,99 Z" id="file-document"> </path> </g> </g> </g></svg>
                <span className="file-img-text">{file.extensions.toUpperCase()}</span>
            </div>
            <div className="text-center">
                <h2 className="font-medium">{file.file_name}</h2>
                {file.comment && <p className='text-xs overflow-x-hidden'>{file.comment}</p>}
            </div>
        </div>
    )
}