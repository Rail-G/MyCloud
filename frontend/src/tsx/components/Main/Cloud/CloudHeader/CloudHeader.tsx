import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { setCurrentFolder } from '../../../../redux/slice/StorageSlice/StorageSlice'
import './CloudHeader.css'
import { CreateFile } from './CreateFile/CreateFile'
import { CreateFolder } from './CreateFolder/CreateFolder'
import { Warning } from '../Warning/Warning'
import { addFolder, deleteFolder, editFolder } from '../../../../redux/slice/FolderSlice/FolderSlice'
import { SearchTool } from '../../../../typing'
export function CloudHeader({searchValue, onChangeSearchValue}: SearchTool) {
    const {curentfolders, currentFolder} = useAppSelector(state => state.storage)
    const {userInfo} = useAppSelector(state => state.form)
    const dispatch = useAppDispatch()
    const [addFile, setAddFile] = useState(false)
    const [addNewFolder, setAddNewFolder] = useState(false)
    const [delFolder, setDelFolder] = useState(false)
    const [editOldFolder, setEditOldFolder] = useState(false)
    const onClickToCloseFile = () => setAddFile(prev => !prev)
    const onClickToCloseFolder = () => setAddNewFolder(prev => !prev)
    const onClickToDelFolder = () => setDelFolder(true)
    const onClickToEditFolder = () => setEditOldFolder(true)
    const onClickToConfirmDel = () => {
        dispatch(deleteFolder({id: currentFolder!, previewFolder: [...curentfolders].splice(-2)[0].id, admin: false}))
    }
    const onClickToConfirmAdd = (value: string) => {
        dispatch(addFolder({folderName: value, user: userInfo?.id!, currentFolder: currentFolder!, navNumber: curentfolders.length - 1}))
    }
    const onClickToConfirmEdit = (value: string) => {
        dispatch(editFolder({id: currentFolder!, folderName: value, currentFolder: currentFolder!, navNumber: curentfolders.length - 1, admin: false}))
    }
    const onClick = () => {
        dispatch(setCurrentFolder({folderId: curentfolders.slice(-2)[0].id, filterCount: null}))
    }
    return (
        <>
            {addFile && <CreateFile setAddFile={setAddFile}/>}
            {addNewFolder && <CreateFolder folderState={setAddNewFolder} onConfirm={onClickToConfirmAdd}/>}
            {delFolder && <Warning state={setDelFolder} onConfirm={onClickToConfirmDel}/>}
            {editOldFolder && <CreateFolder folderState={setEditOldFolder} onConfirm={onClickToConfirmEdit}/>}
            <section className="flex justify-between items-center">
            <div className="flex gap-2">
                <button onClick={onClickToCloseFile} className="head-btn group">
                    <svg className="group-hover:fill-white duration-300" fill="#000000" width='22px' height='22px' viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M1451.06 557.963C1456.76 557.07 1462.44 556.179 1468.24 556.179C1717.38 556.179 1920 761.2 1920 1013.31C1920 1265.41 1717.38 1470.43 1468.24 1470.43H1355.29V1356.15H1468.24C1655.04 1356.15 1807.06 1202.33 1807.06 1013.31C1807.06 824.283 1655.04 670.46 1468.24 670.46C1467.28 670.46 1466.34 670.632 1465.41 670.803C1464.48 670.975 1463.55 671.146 1462.59 671.146C1463.2 676.832 1463.97 682.485 1464.73 688.143C1466.48 701.135 1468.24 714.146 1468.24 727.601C1468.24 772.4 1462.48 816.855 1451.29 859.825L1342.08 830.569C1350.78 797.084 1355.29 762.571 1355.29 727.601C1355.29 507.038 1177.98 327.616 960 327.616C747.558 327.616 574.871 498.581 566.287 711.373C604.574 730.115 640.602 753.772 671.887 784.628L592.941 866.339C539.746 813.77 469.609 784.742 395.294 784.742C239.661 784.742 112.941 912.852 112.941 1070.45C112.941 1228.04 239.661 1356.15 395.294 1356.15H564.706V1470.43H395.294C177.318 1470.43 0 1291.01 0 1070.45C0 849.883 177.318 670.46 395.294 670.46C416.188 670.46 436.631 673.203 456.847 676.517C482.598 417.098 697.073 213.334 960 213.334C1181.82 213.334 1368.85 358.7 1438.08 559.607C1442.45 559.312 1446.76 558.637 1451.06 557.963ZM717.572 1282.27L637.722 1201.47L960.056 875.31L1282.28 1201.47L1202.43 1282.27L1016.53 1094.16V1813.33H903.586V1094.16L717.572 1282.27Z"></path> </g></svg>
                    <span className="text-base">Загрузить</span>
                </button>
                <button onClick={onClickToCloseFolder} className="head-btn group">
                    <svg className="group-hover:fill-white duration-300" fill="#000000" width="22px" height="22px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m764.386 112.941 225.882 338.824H1920v1185.882c0 88.213-67.799 160.913-154.016 168.718l-15.396.694H169.412c-88.214 0-160.913-67.799-168.718-154.016L0 1637.647V112.941h764.386Zm-60.537 112.941H112.941v1411.765c0 27.708 20.079 50.776 46.354 55.56l10.117.91h1581.176c27.608 0 50.754-19.989 55.557-46.324l.914-10.146V564.706H225.882V451.765H854.4L703.85 225.882Zm312.622 564.706v282.353h282.353v112.941H1016.47v282.353H903.529v-282.353H621.176v-112.94H903.53V790.587h112.942Z" fillRule="evenodd"></path> </g></svg>
                    <span className="text-base">Создать папку</span>
                </button>
                {curentfolders.length > 1 && 
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