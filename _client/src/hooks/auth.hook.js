import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData';

export const useAuth = () => {

    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState(null);
    const [load, setLoad] = useState(false);


    const login = useCallback((jwtToken, id, userRole, email) => {
        setToken(jwtToken);
        setUserID(id);
        setRole(userRole);
        setEmail(email)
        localStorage.setItem(storageName, JSON.stringify({
            userRole: userRole,
            userID: id,
            token: jwtToken,
            email: email
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserID(null)
        setRole(null)

        localStorage.removeItem(storageName)

    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userID, data.userRole, data.email)
        }
    }, [login])

    const loadData = useCallback(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userID, data.userRole, data.email)
        }
        setLoad(true)
    }, [])

    return {login, logout, token, userID, role, email, loadData, load}
}