import { JSX } from 'react'
import { useAppSelector } from '../../../hooks'
import './Notification.css'
export function Notification({text}: {text: string}): JSX.Element {
    const {userInfo} = useAppSelector(state => state.form)
    return (
        <div className='flex justify-center w-full'>
            <div className='notif-block notif-animation'>
            <div className="p-6 rounded-xl bg-green-50">
                <div className="flex">
                        <div className="text-sm text-green-600">
                            <p>{`${text} ${userInfo?.username}`}</p>
                        </div>
                </div>
            </div>
        </div>
        </div>
    )
}