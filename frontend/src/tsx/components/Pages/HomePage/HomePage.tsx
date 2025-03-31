import React, { useState } from "react";
import { CloudBody } from "../../Main/Cloud/CloudBody/CloudBody";
import { CloudHeader } from "../../Main/Cloud/CloudHeader/CloudHeader";

export function HomePage() {
    const [value, setValue] = useState('')
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    return (
        <>
            <CloudHeader searchValue={value} onChangeSearchValue={onChange} />
            <CloudBody searchValue={value}/>
        </>
    )
}