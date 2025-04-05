import { useAppDispatch, useAppSelector } from '../../../../../hooks'
import { deleteUser } from '../../../../../redux/slice/AdminSlice/AdminSlice'
import { AdminUser } from '../../../../../typing'
import { formatFileSize } from '../../../../../utils'
import './TableRow.css'

interface TableRowType {
    onClickToEdit: (id: number, username: string, is_staff: boolean) => void,
    user: AdminUser,
    setDelUser: React.Dispatch<React.SetStateAction<boolean>>,
    setDelUserId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export function TableRow({onClickToEdit, user, setDelUser, setDelUserId}: TableRowType) {
    const {userInfo} = useAppSelector(state => state.form)
    let role = 'Пользователь'
    if (user.is_superuser) {
        role = 'Главный администратор'
    } else if (user.is_staff) {
        role = 'Администратор'
    }
    const totalSize = formatFileSize(user.file_size)
    const onDelete = () => {
        setDelUser(true)
        setDelUserId(user.id)
    }
    return (
        <tr>
            <td className="px-6 py-3.5 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {user.username}
                        </div>
                        <div className="text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>
                </div>
            </td>
            <td className="tr-td">
                {role}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`tr-td-role ${user.is_active ? `tr-td-role-active` : `tr-td-role-not_active`}`}>
                    {user.is_active ? 'Активный' : 'Неактивный'}
                </span>
            </td>
            <td className="tr-td">
                {user.files}
            </td>
            <td className="tr-td">
                {user.folders}
            </td>
            <td className="tr-td">
                {totalSize}
            </td>
            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                {((userInfo?.is_superuser && userInfo?.id != user.id) || (userInfo?.is_staff && !user.is_superuser && !user.is_staff)) && <button className="tr-td-action-submit">Хранилище</button>}
                {((userInfo?.is_superuser && userInfo?.id != user.id) || (userInfo?.is_staff && !user.is_superuser && !user.is_staff)) && <button onClick={() => onClickToEdit(user.id, user.username, user.is_staff)} className="tr-td-action-edit">Изменить</button>}
                {((userInfo?.is_superuser && userInfo?.id != user.id) || (userInfo?.is_staff && !user.is_superuser && !user.is_staff)) && <button onClick={onDelete} className="tr-td-action-delete">Удалить</button>}
            </td>
        </tr>
    )
}