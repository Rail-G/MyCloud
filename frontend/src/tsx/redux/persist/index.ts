import { createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { FormState, UserInfo } from '../../typing'

const userTransform = createTransform<FormState, {userInfo: UserInfo | null, isAuthenticated: boolean, cookie: boolean}>(
    (inbound) => ({
        userInfo: inbound.userInfo,
        isAuthenticated: inbound.isAuthenticated,
        cookie: inbound.cookie
    }),
    (onbound) => ({
        userInfo: onbound.userInfo,
        loading: false,
        error: null,
        isAuthenticated: onbound.isAuthenticated,
        cookie: onbound.cookie
    })
)

export const pesistConfig = {
    key: 'userInfo',
    storage,
    whitelist: ['form'],
    transform: [userTransform]
}