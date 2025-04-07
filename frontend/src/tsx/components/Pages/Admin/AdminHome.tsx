import { useEffect, useState } from "react";
import { SearchBody } from "../../Main/Admin/SearchBody/SearchBody";
import { SearchHeader } from "../../Main/Admin/SearchHeader/SearchHeader";
import { useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { StorageBody } from "../../Main/Admin/StorageBody/StorageBody";
import { StorageHeader } from "../../Main/Admin/StorageHeader/StorageHeader";

export function AdminHome() {
    const { userInfo } = useAppSelector(state => state.form)
    const {userFiles, userFolders, currentUser} = useAppSelector(state => state.admin)
    const [value, setValue] = useState('')
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    const navigate = useNavigate()
    useEffect(() => {
        if (userInfo == null) {
            navigate('/login')
        }
        if (!userInfo?.is_staff) {
            navigate('/')
        }
    }, [userInfo, navigate])
    return (
        <>
            {(userFiles.length > 0 || userFolders.length > 0 || currentUser != null)
            ? 
            <>
                <StorageHeader searchValue={value} onChangeSearchValue={onChange} />
                <StorageBody searchValue={value} />
            </>
            : 
            <>
                <SearchHeader />
                <SearchBody />
            </>
            }
        </>
    )
}