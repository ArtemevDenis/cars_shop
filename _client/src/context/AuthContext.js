import {createContext} from 'react'

const noop = {}
export const UserContext = createContext({
    token: null,
    userID: null,
    login: noop,
    logout: noop,
    isAuth: null,
    isAdmin: true,
    email: null,
})