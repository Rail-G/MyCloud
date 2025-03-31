import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { Loader } from '../../Loader/Loader'
import './CloudBody.css'
import { File } from './File/File'
import { Folder } from './Folder/Folder'
import { getStorageItems, setCurrentFolder } from '../../../../redux/slice/StorageSlice/StorageSlice'
import { FileInfo } from '../FileInfo/FileInfo'
import { Edit } from '../FileInfo/Edit/Edit'
import { ShareLink } from '../FileInfo/ShareLink/ShareLink'
import { Warning } from '../Warning/Warning'
import { deleteFile } from '../../../../redux/slice/FileSlice/FileSlice'
export function CloudBody({searchValue}: {searchValue: string}) {
    const [info, setInfo] = useState<{ set: boolean, fileId: number | null }>({ set: false, fileId: null })
    const [edit, setEdit] = useState<{ set: boolean, fileId: number | null, fileExt: string }>({ set: false, fileId: null, fileExt: ''})
    const [share, setShare] = useState(false)
    const [delFile, setDeFile] = useState(false)
    const { files, folders, curentfolders, currentFolder, loading } = useAppSelector(state => state.storage)
    const {created} = useAppSelector(state => state.file)
    const dispatch = useAppDispatch()
    const onClickSendToServer = (folderId: number) => {
        if (folderId == currentFolder) {
            return
        }
        dispatch(setCurrentFolder({folderId: folderId, filterCount: [...curentfolders].findIndex(folder => folder.id == folderId)}))
    }
    const onClickToConfirm = () => {
        dispatch(deleteFile({id: info.fileId!, currentFolder: currentFolder!}))
        setInfo({set: false, fileId: null})
    }
    useEffect(() => {
        if (!files.length && !folders.length) {
            dispatch(getStorageItems(currentFolder))
        }
    }, [])

    // useEffect(() => {
    //     if (created) {
    //         dispatch(setCurrentFolder({folderId: currentFolder!, filterCount: curentfolders.length - 1}))
    //     }
    // }, [created])
    return (
        <>
            {loading && <Loader />}
            {info.set && <FileInfo setInfo={setInfo} setEdit={setEdit} setShare={setShare} setDelete={setDeFile} fileId={info.fileId} />}
            {edit.set && <Edit setEdit={setEdit} fileId={edit.fileId!} fileExt={edit.fileExt}/>}
            {share && <ShareLink setShare={setShare}/>}
            {delFile && <Warning state={setDeFile} onConfirm={onClickToConfirm}/>}
            {!loading && <section className="w-full h-full">
                <h2 className="text-xl font-bold mb-2.5">File Manager</h2>
                <div className='w-full mb-2.5'>
                    <ul className='list-none flex flex-wrap'>
                        {curentfolders.map((folder) => (
                            <li onClick={() => { onClickSendToServer(folder.id) }} className='cursor-pointer text-black hover:text-gray-500'>
                                {`${folder.folder_name}  >  `}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col justify-between h-[calc(100%-40px)]">
                    <div className="w-full mx-auto mb-6">
                        <ul className='list-none grid grid-cols-[repeat(6,183.5px)] auto-rows-[240px] gap-5 h-full'>
                            {folders.filter(el => el.folder_name.toLowerCase().includes(searchValue.toLowerCase())).map(folder => (
                                <li key={`folder_${folder.id}`}>
                                    <Folder id={folder.id} folder_name={folder.folder_name} />
                                </li>
                            ))}
                            {files.filter(el => el.file_name.toLowerCase().includes(searchValue.toLowerCase())).map(file => (
                                <li key={`files_${file.id}`}>
                                    <File file={file} setInfo={setInfo} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* <div className="p-2 border-t dark:border-gray-700  w-full">
                    <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center">

                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <div className="pl-2 text-sm font-medium dark:text-white">
                                    Showing 11 to 20 of 99 results
                                    {`Показано от ${[...files, ...folders].length} до ${[...files, ...folders].length} из ${[...files, ...folders].length}`}
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <div className="py-3 border rounded-lg dark:border-gray-600">
                                    <ol
                                        className="flex items-center text-sm text-gray-500 divide-x rtl:divide-x-reverse divide-gray-300 dark:text-gray-400 dark:divide-gray-600">
                                        <li>
                                            <button type="button"
                                                className="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 transition text-yellow-600"
                                                aria-label="Previous" rel="prev">
                                                <svg className="w-5 h-5 rtl:scale-x-[-1]" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </button>
                                        </li>
                                        <li>
                                            <label htmlFor='pagination' className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition'>
                                                <input className='w-[0.6rem] z-1' id='pagination' type="text" />
                                                <span className="absolute left-[50%] -translate-x-[50%]">...</span>
                                            </label>
                                        </li>
                                        <li>
                                            <button type="button"
                                                className="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 transition text-yellow-600"
                                                aria-label="Next" rel="next">
                                                <svg className="w-5 h-5 rtl:scale-x-[-1]" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </button>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div> */}
            </section>}
        </>
    )
}