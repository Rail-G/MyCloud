import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { getStorageItems, setCurrentFolder } from "../../../../../redux/slice/StorageSlice/StorageSlice";
import { StorageFolder } from "../../../../../typing";

export function Folder({id, folder_name}: StorageFolder) {
    const {curentfolders} = useAppSelector(state => state.storage)
    const dispatch = useAppDispatch()
    const onClick = () => {
        dispatch(setCurrentFolder({folderId: id, filterCount: curentfolders.length}))
    }
    return (
        <div onClick={onClick} className="bg-white hover:shadow-md cursor-pointer px-5 py-5 flex justify-center flex-col h-full w-full">
            <svg className="mx-auto" width="120px" height="120px" viewBox="0 -3.5 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M2.90909 0H11.2834C12.4407 0 13.5506 0.459739 14.369 1.27808L14.7219 1.63101C15.5402 2.44935 16.6502 2.90909 17.8074 2.90909H23.2727C24.0761 2.90909 24.7617 3.1931 25.3297 3.76115C25.8977 4.32918 26.1818 5.01487 26.1818 5.81818V21.8182C26.1818 22.6215 25.8977 23.3072 25.3297 23.8752C24.7617 24.4432 24.0761 24.7273 23.2727 24.7273H2.90909C2.10576 24.7273 1.42009 24.4432 0.852052 23.8752C0.284017 23.3072 0 22.6215 0 21.8182V2.90909C0 2.10576 0.284017 1.42009 0.852052 0.852052C1.42009 0.284017 2.10576 0 2.90909 0Z" fill="url(#paint0_linear_103_1791)"></path> <path fillRule="evenodd" clipRule="evenodd" d="M5.81818 21.8182V8.72727C5.81818 7.92395 6.1022 7.23827 6.67024 6.67023C7.23827 6.1022 7.92395 5.81818 8.72727 5.81818H29.0909C29.8942 5.81818 30.5799 6.1022 31.1479 6.67023C31.716 7.23827 32 7.92395 32 8.72727V21.8182C32 22.6215 31.716 23.3072 31.1479 23.8752C30.5799 24.4432 29.8942 24.7273 29.0909 24.7273H2.90909C3.71241 24.7273 4.3981 24.4432 4.96612 23.8752C5.53417 23.3072 5.81818 22.6215 5.81818 21.8182Z" fill="url(#paint1_linear_103_1791)"></path> <defs> <linearGradient id="paint0_linear_103_1791" x1="16" y1="0" x2="16" y2="16.3543" gradientUnits="userSpaceOnUse"> <stop stopColor="#FBA200"></stop> <stop offset="1" stopColor="#FF7300"></stop> </linearGradient> <linearGradient id="paint1_linear_103_1791" x1="17.4545" y1="5.81818" x2="17.4545" y2="24.7273" gradientUnits="userSpaceOnUse"> <stop stopColor="#FAC227"></stop> <stop offset="1" stopColor="#FAA627"></stop> </linearGradient> </defs> </g></svg>
            <div className="text-center mt-2">
                <h2 className="font-medium">{folder_name}</h2>
            </div>
        </div>
    )
}