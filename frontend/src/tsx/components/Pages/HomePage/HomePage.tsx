import React, { useEffect, useState } from "react";
import { CloudBody } from "../../Main/Cloud/CloudBody/CloudBody";
import { CloudHeader } from "../../Main/Cloud/CloudHeader/CloudHeader";
import { useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";

export function HomePage() {
    const [value, setValue] = useState('')
    const {userInfo} = useAppSelector(state => state.form)
    const navigate = useNavigate()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    useEffect(() => {
            if (userInfo == null) {
                navigate('/login')
            }
        }, [userInfo])
    return (
        <>
            <CloudHeader searchValue={value} onChangeSearchValue={onChange} />
            <CloudBody searchValue={value}/>
        </>
    )
}