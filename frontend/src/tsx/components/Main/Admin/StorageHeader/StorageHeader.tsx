import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import '../../Cloud/CloudHeader/CloudHeader.css'
import { deleteFolder, editFolder } from '../../../../redux/slice/FolderSlice/FolderSlice'
import { SearchTool } from '../../../../typing'
import { Warning } from '../../Cloud/Warning/Warning'
import { CreateFolder } from '../../Cloud/CloudHeader/CreateFolder/CreateFolder'
import { backToTable, setCurrentFolderAdmin } from '../../../../redux/slice/AdminSlice/AdminSlice'
export function StorageHeader({searchValue, onChangeSearchValue}: SearchTool) {
    const {currentFolders, currentUserFolder} = useAppSelector(state => state.admin)
    const dispatch = useAppDispatch()
    const [delFolder, setDelFolder] = useState(false)
    const [editOldFolder, setEditOldFolder] = useState(false)
    const onClickToDelFolder = () => setDelFolder(true)
    const onClickToEditFolder = () => setEditOldFolder(true)
    const onClickToConfirmDel = () => {
        dispatch(deleteFolder({id: currentUserFolder!, previewFolder: [...currentFolders].splice(-2)[0].id, admin: true}))
    }
    const onClickToConfirmEdit = (value: string) => {
        dispatch(editFolder({id: currentUserFolder!, folderName: value, currentFolder: currentUserFolder!, navNumber: currentFolders.length - 1, admin: true}))
    }
    const onClickToBackToTable = () => dispatch(backToTable())
    const onClick = () => {
        dispatch(setCurrentFolderAdmin({folderId: currentFolders.slice(-2)[0].id, filterCount: null}))
    }
    return (
        <>
            {delFolder && <Warning state={setDelFolder} onConfirm={onClickToConfirmDel}/>}
            {editOldFolder && <CreateFolder folderState={setEditOldFolder} onConfirm={onClickToConfirmEdit}/>}
            <section className="flex justify-between items-center">
            <div className="flex gap-2">
                <button onClick={onClickToBackToTable} className="head-btn group">
                <svg className="group-hover:fill-white duration-300" fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M74.656,56.818c3.895,3.729,5.788,8.795,5.788,15.491c0,1.104,0.896,2,2,2s2-0.885,2-1.989 c0-7.736-2.362-13.91-7.022-18.369C66.646,43.639,46.325,44.551,30,45.269c-2.28,0.101-4.461,0.211-6.499,0.28L38.428,30.62 c0.781-0.781,0.781-2.047,0-2.828s-2.048-0.781-2.828,0L17.479,45.915c-0.375,0.375-0.586,0.884-0.586,1.414 s0.211,1.039,0.586,1.414l18.123,18.12c0.391,0.391,0.902,0.586,1.414,0.586s1.024-0.195,1.415-0.586 c0.781-0.781,0.781-2.048,0-2.828L24.142,49.75c1.915-0.11,3.932-0.261,6.033-0.354C44.919,48.748,65.114,47.688,74.656,56.818z"></path> </g> </g></svg>
                    <span className="text-base">Обратно в таблицу</span>
                </button>
                {currentFolders.length > 1 && 
                <>
                    <button onClick={onClickToDelFolder} className="head-btn group">
                        <svg className="group-hover:fill-white duration-300" fill="#000000" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M0,52c0,1.104,0.896,2,2,2h60c1.104,0,2-0.896,2-2V16c0-1.104-0.896-2-2-2H30.829l-7.415-7.414C23.039,6.211,22.53,6,22,6 H2C0.896,6,0,6.896,0,8V52z M4,10h17.171l7.415,7.414C28.961,17.789,29.47,18,30,18h30v32H4V10z"></path> <path d="M41.414,24.586c-0.78-0.781-2.048-0.781-2.828,0L32,31.172l-6.586-6.586c-0.78-0.781-2.048-0.781-2.828,0 c-0.781,0.781-0.781,2.047,0,2.828L29.172,34l-6.586,6.586c-0.781,0.781-0.781,2.047,0,2.828C22.976,43.805,23.488,44,24,44 s1.024-0.195,1.414-0.586L32,36.828l6.586,6.586C38.976,43.805,39.488,44,40,44s1.024-0.195,1.414-0.586 c0.781-0.781,0.781-2.047,0-2.828L34.828,34l6.586-6.586C42.195,26.633,42.195,25.367,41.414,24.586z"></path> </g> </g></svg>
                        <span className="text-base">Удалить папку</span>
                    </button>
                    <button onClick={onClickToEditFolder} className="head-btn group">
                        <svg className="group-hover:fill-white duration-300" width="22px" height="22px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g className="group-hover:fill-white duration-300" id="Dribbble-Light-Preview" transform="translate(-339.000000, -800.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M286.15,654 C285.5704,654 285.1,653.552 285.1,653 L285.1,647 C285.1,646.448 285.5704,646 286.15,646 C286.7296,646 287.2,645.552 287.2,645 C287.2,644.448 286.7296,644 286.15,644 L285.1,644 C283.93975,644 283,644.895 283,646 L283,654 C283,655.105 283.93975,656 285.1,656 L286.15,656 C286.7296,656 287.2,655.552 287.2,655 C287.2,654.448 286.7296,654 286.15,654 M301.9,644 L294.55,644 C293.9704,644 293.5,644.448 293.5,645 C293.5,645.552 293.9704,646 294.55,646 L300.85,646 C301.4296,646 301.9,646.448 301.9,647 L301.9,653 C301.9,653.552 301.4296,654 300.85,654 L294.55,654 C293.9704,654 293.5,654.448 293.5,655 C293.5,655.552 293.9704,656 294.55,656 L301.9,656 C303.06025,656 304,655.105 304,654 L304,646 C304,644.895 303.06025,644 301.9,644 M293.5,659 C293.5,659.552 293.0296,660 292.45,660 L288.25,660 C287.6704,660 287.2,659.552 287.2,659 C287.2,658.448 287.6704,658 288.25,658 L289.3,658 L289.3,642 L288.25,642 C287.6704,642 287.2,641.552 287.2,641 C287.2,640.448 287.6704,640 288.25,640 L292.45,640 C293.0296,640 293.5,640.448 293.5,641 C293.5,641.552 293.0296,642 292.45,642 L291.4,642 L291.4,658 L292.45,658 C293.0296,658 293.5,658.448 293.5,659" id="edit_text_bar-[#1373]"> </path> </g> </g> </g> </g></svg>
                        <span className="text-base">Изменить папку</span>
                    </button>
                    <button onClick={onClick} className="head-btn group">
                        <svg className="group-hover:fill-white duration-300" fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M74.656,56.818c3.895,3.729,5.788,8.795,5.788,15.491c0,1.104,0.896,2,2,2s2-0.885,2-1.989 c0-7.736-2.362-13.91-7.022-18.369C66.646,43.639,46.325,44.551,30,45.269c-2.28,0.101-4.461,0.211-6.499,0.28L38.428,30.62 c0.781-0.781,0.781-2.047,0-2.828s-2.048-0.781-2.828,0L17.479,45.915c-0.375,0.375-0.586,0.884-0.586,1.414 s0.211,1.039,0.586,1.414l18.123,18.12c0.391,0.391,0.902,0.586,1.414,0.586s1.024-0.195,1.415-0.586 c0.781-0.781,0.781-2.048,0-2.828L24.142,49.75c1.915-0.11,3.932-0.261,6.033-0.354C44.919,48.748,65.114,47.688,74.656,56.818z"></path> </g> </g></svg>
                        <span className="text-base">Вернуться</span>
                    </button>
                </>
                }
            </div>
            <div className="border rounded py-2 px-3">
                <label className="flex items-center cursor-pointer">
                    <svg fill="#000000" width="22px" height="22px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd"></path> </g></svg>
                    <input className="outline-0 ml-2" value={searchValue} onChange={onChangeSearchValue} type="text" placeholder="Найти" />
                </label>
            </div>
        </section>
        </>
    )
}