import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { deleteFile, downloadFile, getShareLink } from '../../../../redux/slice/FileSlice/FileSlice';
import { formatDate, formatFileSize } from '../../../../utils';
import './FileInfo.css'

interface InfoProp {
    setInfo: React.Dispatch<React.SetStateAction<{
        set: boolean;
        fileId: number | null;
    }>>,
    setEdit: React.Dispatch<React.SetStateAction<{
        set: boolean;
        fileId: number | null;
        fileExt: string;
    }>>,
    setShare: React.Dispatch<React.SetStateAction<boolean>>,
    setDelete: React.Dispatch<React.SetStateAction<boolean>>,
    fileId: number | null;
}

export function FileInfo({setInfo, setEdit, setShare, setDelete, fileId}: InfoProp) {
    const {currentFolder, curentfolders} = useAppSelector(state => state.storage)
    const {files} = useAppSelector(state => state.storage)
    const file = files.filter(file => file.id == fileId)[0]
    const formatedFileData = formatDate(new Date(file.created))
    const formatedFileSize = formatFileSize(file.size)
    const dispatch = useAppDispatch()
    const onClickToClose = () => setInfo({set: false, fileId: null})
    const onClickDownload = () => dispatch(downloadFile({id: file.id, fileName: file.file_name, currentFolder: currentFolder!, curentfolders: curentfolders.length - 1}))
    const onClickToChange = () => setEdit({set: true, fileId: file.id, fileExt: file.extensions})
    const onClickToShare = () => {
        dispatch(getShareLink({id: file.id, currentFolder: currentFolder!}))
        setShare(true)
    }
    const onClickToDelete = () => {
        setDelete(true)
    }
    return (
        <section className="bg-black rounded-xl flex justify-center items-center fixed z-1 top-18 left-30 w-auto right-30 py-1 px-5">
            <div className="flex w-full p-3">
                <div className="w-[240px] flex items-center h-8.5">
                    <button className="mr-3 cursor-pointer h-full flex items-center relative group">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Warning / Info"> <path id="Vector" d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                        <div className="file-info">
                            <div className="text-[13px]">
                                <span>Имя: </span>
                                <span className="font-medium">{file.file_name}</span>
                            </div>
                            <div className="text-[13px]">
                                <span>Размер: </span>
                                <span className="font-medium">{formatedFileSize}</span>
                            </div>
                            <div className="text-[13px]">
                                <span>Изменён: </span>
                                <span className="font-medium">{formatedFileData}</span>
                            </div>
                        </div>
                    </button>
                    <div className="h-full flex items-center">
                        <span className="text-[18px] text-white flex self-center">{file.file_name}</span>
                    </div>
                </div>
                <div className="flex grow flex-row gap-8 justify-end">
                    <button onClick={onClickDownload} className="flex items-center cursor-pointer group">
                        <span className="mr-1">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path className="group-hover:fill-gray-300" fillRule="evenodd" clipRule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z" fill="#ffffff"></path> </g></svg>
                        </span>
                        <span className="text-white group-hover:text-gray-300">Скачать</span>
                    </button>
                    <button onClick={onClickToChange} className="flex items-center cursor-pointer group">
                        <span className="mr-1">
                            <svg width="19px" height="19px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path className="group-hover:stroke-gray-300" d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path> <polygon className="group-hover:stroke-gray-300" fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon> </g> </g> </g> </g></svg>
                        </span>
                        <span className="text-white group-hover:text-gray-300">Изменить</span>
                    </button>
                    <button onClick={onClickToShare} className="flex items-center cursor-pointer group">
                        <span className="mr-1">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Communication / Share_iOS_Export"> <path className="group-hover:stroke-gray-300" id="Vector" d="M9 6L12 3M12 3L15 6M12 3V13M7.00023 10C6.06835 10 5.60241 10 5.23486 10.1522C4.74481 10.3552 4.35523 10.7448 4.15224 11.2349C4 11.6024 4 12.0681 4 13V17.8C4 18.9201 4 19.4798 4.21799 19.9076C4.40973 20.2839 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07899 21 7.19691 21H16.8036C17.9215 21 18.4805 21 18.9079 20.7822C19.2842 20.5905 19.5905 20.2839 19.7822 19.9076C20 19.4802 20 18.921 20 17.8031V13C20 12.0681 19.9999 11.6024 19.8477 11.2349C19.6447 10.7448 19.2554 10.3552 18.7654 10.1522C18.3978 10 17.9319 10 17 10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
                        </span>
                        <span className="text-white group-hover:text-gray-300">Поделиться</span>
                    </button>
                    <button onClick={onClickToDelete} className="flex items-center cursor-pointer group">
                        <span className="mr-1">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path className="group-hover:stroke-gray-300" d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </span>
                        <span className="text-white group-hover:text-gray-300">Удалить</span>
                    </button>

                </div>
            </div>
            <div className="p-3" onClick={onClickToClose}>
                <span className="cursor-pointer">
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#ffffff"></path> </g></svg>
                </span>
            </div>
        </section>
    )
}