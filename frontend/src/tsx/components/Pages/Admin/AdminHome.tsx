import { useEffect, useState } from "react";
import { SearchBody } from "../../Main/Admin/SearchBody/SearchBody";
import { SearchHeader } from "../../Main/Admin/SearchHeader/SearchHeader";
import { useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";

export function AdminHome() {
    const { userInfo } = useAppSelector(state => state.form)
    const navigate = useNavigate()
    useEffect(() => {
        if (userInfo == null) {
            navigate('/login')
        }
        if (!userInfo?.is_staff) {
            navigate('/')
        }
    }, [userInfo])
    return (
        <>
            <SearchHeader />
            <SearchBody />
        </>
    )
}