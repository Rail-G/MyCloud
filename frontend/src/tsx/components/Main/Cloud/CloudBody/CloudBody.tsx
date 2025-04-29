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
import { EmptyStorage } from './EmptyStorage/EmptyStorage'
import { useNavigate } from 'react-router-dom'
import { ErrorStorage } from './ErrorStorage/ErrorStorage'
import { StorageFile } from '../../../../typing'

export function CloudBody({searchValue}: {searchValue: string}) {
    const [info, setInfo] = useState<{ set: boolean, file: StorageFile | null }>({ set: false, file: null })
    const [edit, setEdit] = useState<{ set: boolean, file: StorageFile | null }>({ set: false, file: null })
    const [share, setShare] = useState(false)
    const [delFile, setDeFile] = useState(false)
    const { files, folders, curentfolders, currentFolder, loading: storageLoad, error: storageError} = useAppSelector(state => state.storage)
    const {loading: fileLoad} = useAppSelector(state => state.file)
    const { userInfo } = useAppSelector(state => state.form)
    const {created} = useAppSelector(state => state.file)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const onClickSendToServer = (folderId: number) => {
        if (folderId == currentFolder) {
            return
        }
        dispatch(setCurrentFolder({folderId: folderId, filterCount: [...curentfolders].findIndex(folder => folder.id == folderId)}))
    }
    const onClickToConfirm = () => {
        dispatch(deleteFile({id: info.file!.id, currentFolder: currentFolder!, curentFolders: curentfolders.length - 1, admin: false}))
        setInfo({set: false, file: null})
    }

    const onClickToError = () => dispatch(getStorageItems(currentFolder != null ? currentFolder : userInfo!.user_folder))

    const onClickToFolder = (id: number) => {
        dispatch(setCurrentFolder({folderId: id, filterCount: curentfolders.length}))
    }

    useEffect(() => {
        if (userInfo == null) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (!files.length && !folders.length && userInfo != null) {
            dispatch(getStorageItems(userInfo!.user_folder))
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (created) {
            dispatch(setCurrentFolder({folderId: currentFolder!, filterCount: curentfolders.length - 1}))
        }
        // eslint-disable-next-line
    }, [created])
    return (
        <>
            {(storageLoad || fileLoad) && <Loader />}
            {info.set && <FileInfo setInfo={setInfo} setEdit={setEdit} setShare={setShare} setDelete={setDeFile} file={info.file} />}
            {edit.set && <Edit setEdit={setEdit} file={edit.file!} setInfo={setInfo}/>}
            {share && <ShareLink setShare={setShare}/>}
            {delFile && <Warning state={setDeFile} onConfirm={onClickToConfirm}/>}
            {!(storageLoad || fileLoad) && <section className="w-full h-full flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2.5">File Manager</h2>
                <div className='w-full mb-2.5'>
                    <ul className='list-none flex flex-wrap'>
                        {curentfolders.map((folder) => (
                            <li key={`curFolder_${folder.id}`} onClick={() => { onClickSendToServer(folder.id) }} className='cursor-pointer text-black hover:text-gray-500'>
                                {`${folder.folder_name}  >  `}
                            </li>
                        ))}
                    </ul>
                </div>
                {((!files.length && !folders.length && !storageError) 
                || 
                (folders.filter(el => el.folder_name.toLowerCase().includes(searchValue.toLowerCase())).length <= 0
                && 
                files.filter(el => el.file_name.toLowerCase().includes(searchValue.toLowerCase())).length <= 0)) && <EmptyStorage />}
                {storageError && <ErrorStorage onConfirm={onClickToError} />}
                {((files.length != 0 || folders.length != 0)) && <div className="flex flex-col justify-between h-[calc(100%-40px)]">
                    <div className="w-full mx-auto mb-6">
                        <ul className='list-none grid grid-cols-[repeat(6,183.5px)] auto-rows-[240px] gap-5 h-full'>
                            {folders.filter(el => el.folder_name.toLowerCase().includes(searchValue.toLowerCase())).map(folder => (
                                <li key={`folder_${folder.id}`}>
                                    <Folder id={folder.id} folder_name={folder.folder_name} onClickToFolder={onClickToFolder} />
                                </li>
                            ))}
                            {files.filter(el => el.file_name.toLowerCase().includes(searchValue.toLowerCase())).map(file => (
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