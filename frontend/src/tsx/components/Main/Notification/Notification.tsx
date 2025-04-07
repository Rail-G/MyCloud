import { JSX } from 'react'
import './Notification.css'
import { NotificationType } from '../../../typing'

export function Notification({operationType, text}: NotificationType): JSX.Element {
    return (
        <div className='flex justify-center w-full absolute'>
            <div className='notif-main notif-animation'>
            <div className={`notif-block ${operationType ? 'notif-block-success' : 'notif-block-error'}`}>
                <div className="flex">
                        <div className={`${operationType ? 'notif-text-seccess' : 'notif-text-error'}`}>
                            <p>{`${text}`}</p>
                        </div>
                </div>
            </div>
        </div>
        </div>
    )
}