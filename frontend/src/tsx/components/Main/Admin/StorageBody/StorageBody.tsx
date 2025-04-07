import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { Loader } from '../../Loader/Loader'
import '../../Cloud/CloudBody/CloudBody.css'
import { getUserItems, setCurrentFolderAdmin } from '../../../../redux/slice/AdminSlice/AdminSlice'
import { deleteFile } from '../../../../redux/slice/FileSlice/FileSlice'
import { FileInfo } from '../../Cloud/FileInfo/FileInfo'
import { Edit } from '../../Cloud/FileInfo/Edit/Edit'
import { Warning } from '../../Cloud/Warning/Warning'
import { ShareLink } from '../../Cloud/FileInfo/ShareLink/ShareLink'
import { ErrorStorage } from '../../Cloud/CloudBody/ErrorStorage/ErrorStorage'
import { EmptyStorage } from '../../Cloud/CloudBody/EmptyStorage/EmptyStorage'
import { File } from '../../Cloud/CloudBody/File/File'
import { Folder } from '../../Cloud/CloudBody/Folder/Folder'
import { StorageFile } from '../../../../typing'


export function StorageBody({searchValue}: {searchValue: string}) {
    const [info, setInfo] = useState<{ set: boolean, file: StorageFile | null }>({ set: false, file: null })
    const [edit, setEdit] = useState<{ set: boolean, file: StorageFile | null }>({ set: false, file: null })
    const [share, setShare] = useState(false)
    const [delFile, setDeFile] = useState(false)
    const { userFiles, userFolders, currentFolders, currentUserFolder, currentUser, loading, error: storageError} = useAppSelector(state => state.admin)
    const dispatch = useAppDispatch()
    const onClickSendToServer = (folderId: number) => {
        if (folderId == currentUserFolder) {
            return
        }
        dispatch(setCurrentFolderAdmin({folderId: folderId, filterCount: [...currentFolders].findIndex(folder => folder.id == folderId)}))
    }
    const onClickToConfirm = () => {
        dispatch(deleteFile({id: info.file!.id, currentFolder: currentUserFolder!, curentFolders: currentFolders.length - 1, admin: true}))
        setInfo({set: false, file: null})
    }

    const onClickToError = () => dispatch(getUserItems(currentUserFolder != null ? currentUserFolder : currentUser!.main_folder))

    const onClickToFolder = (id: number) => {
            dispatch(setCurrentFolderAdmin({folderId: id, filterCount: currentFolders.length}))
        }

    useEffect(() => {
        if (!userFiles.length && !userFolders.length && currentUser != null) {
            dispatch(getUserItems(currentUser!.main_folder))
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading && <Loader />}
            {info.set && <FileInfo setInfo={setInfo} setEdit={setEdit} setShare={setShare} setDelete={setDeFile} file={info.file} />}
            {edit.set && <Edit setEdit={setEdit} file={edit.file as StorageFile}/>}
            {share && <ShareLink setShare={setShare}/>}
            {delFile && <Warning state={setDeFile} onConfirm={onClickToConfirm}/>}
            {!loading && <section className="w-full h-full flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2.5">File Manager</h2>
                <div className='w-full mb-2.5'>
                    <ul className='list-none flex flex-wrap'>
                        {currentFolders.map((folder) => (
                            <li key={`curFolder_${folder.id}`} onClick={() => { onClickSendToServer(folder.id) }} className='cursor-pointer text-black hover:text-gray-500'>
                                {`${folder.folder_name}  >  `}
                            </li>
                        ))}
                    </ul>
                </div>
                {(!userFiles.length && !userFolders.length && !storageError) && <EmptyStorage />}
                {storageError && <ErrorStorage onConfirm={onClickToError} />}
                {((userFiles.length != 0 || userFolders.length != 0)) && <div className="flex flex-col justify-between h-[calc(100%-40px)]">
                    <div className="w-full mx-auto mb-6">
                        <ul className='list-none grid grid-cols-[repeat(6,183.5px)] auto-rows-[240px] gap-5 h-full'>
                            {userFolders.filter(el => el.folder_name.toLowerCase().includes(searchValue.toLowerCase())).map(folder => (
                                <li key={`folder_${folder.id}`}>
                                    <Folder id={folder.id} folder_name={folder.folder_name} onClickToFolder={onClickToFolder} />
                                </li>
                            ))}
                            {userFiles.filter(el => el.file_name.toLowerCase().includes(searchValue.toLowerCase())).map(file => (
                                <li key={`files_${file.id}`}>
                                    <File file={file} setInfo={setInfo} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>}
            </section>}
        </>
    )
}