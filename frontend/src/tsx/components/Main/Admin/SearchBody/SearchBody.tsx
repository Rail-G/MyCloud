import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { Loader } from '../../Loader/Loader'
import './SearchBody.css'
import { TableRow } from './TableRow/TableRow'
import { deleteUser, getUsers } from '../../../../redux/slice/AdminSlice/AdminSlice'
import { EditUser } from './EditUser/EditUser'
import { AdminEdit } from '../../../../typing'
import { Warning } from '../../Cloud/Warning/Warning'

export function SearchBody() {
    const { users, loading, page, param } = useAppSelector(state => state.admin)
    const dispatch = useAppDispatch()
    const [closeEdit, setCloseEdit] = useState(false)
    const [editUser, setEditUser] = useState<AdminEdit>()
    const [delUser, setDelUser] = useState(false)
    const [delUserId, setDelUserId] = useState<number>()
    const onClickToClose = () => setCloseEdit(false)
    const onClickToEdit = (id: number, username: string, is_staff: boolean) => {
        setCloseEdit(true)
        setEditUser({id: id, username: username, is_staff: is_staff})
    }
    const onClickToDelete = () => {
        dispatch(deleteUser({id: delUserId as number}))
    }

    const onClicToNext = () => dispatch(getUsers({page: page + 1, param: param}))
    const onClicToPrev = () => dispatch(getUsers({page: page > 1 ? page - 1 : page, param: param}))

    useEffect(() => {
        if (!users.length) {
            dispatch(getUsers({page: page, param: param}))
        }
    }, [])
    return (
        <>
            {delUser && <Warning state={setDelUser} onConfirm={onClickToDelete} />}
            {closeEdit && <EditUser onClickToClose={onClickToClose} editUserInfo={editUser as AdminEdit}/>}
            <section className='flex flex-col justify-between flex-grow relative mb-5'>
                <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="tr-th">
                                Пользователь
                            </th>
                            <th scope="col" className="tr-th">
                                Роль
                            </th>
                            <th scope="col" className="tr-th">
                                Статус
                            </th>
                            <th scope="col" className="tr-th">
                                Файлы
                            </th>
                            <th scope="col" className="tr-th">
                                Папки
                            </th>
                            <th scope="col" className="tr-th">
                                Размер файлов
                            </th>
                            <th scope="col" className="tr-th">
                                Действия
                            </th>
                        </tr>
                    </thead>
                    {!loading && <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => 
                            <TableRow onClickToEdit={onClickToEdit} user={user} setDelUser={setDelUser} setDelUserId={setDelUserId}/>
                        )}
                    </tbody>}
                </table>
                {(users.length == 0 && !loading) && <p className='px-6 py-4 whitespace-nowrap text-xl text-gray-500 text-center border-0'>
                            Нету данных
                </p>}
                {loading && <Loader />}
                <div className="bg-white px-4 py-3 sm:px-6 w-full">
                    <nav className="relative z-0 flex justify-between rounded-md -space-x-px" aria-label="Pagination">
                        <button onClick={onClicToPrev} disabled={page <= 1} className="cursor-pointer relative inline-flex items-center px-4 py-2 rounded-l-md bg-(--color-haze-600) text-sm font-medium text-gray-500 hover:bg-(--color-haze-200)">
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </button>

                        <button onClick={onClicToNext} disabled={page > users.length / 5} className="cursor-pointer relative inline-flex items-center px-4 py-2 rounded-r-md bg-(--color-haze-600) text-sm font-medium text-gray-500 hover:bg-(--color-haze-200)">
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </section>
        </>
    )
}