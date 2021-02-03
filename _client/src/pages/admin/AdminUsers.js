import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import UserItem from "../../components/admin/UserItem";

const AdminUser = () => {
    const [users, setUsers] = useState(null)

    const {token} = useContext(UserContext)
    const {request} = useHttp()

    const loadUsers = () => {
        request('/api/v1/admin/users', 'GET', null, {Authorization: `Bearer ${token}`})
            .then(setUsers)
    }
    const deleteHandler = (id) => {
        request(`/api/v1/admin/users?userID=${id}`, 'DELETE', null, {Authorization: `Bearer ${token}`})
            .then(setUsers)
    }
    useEffect(() => {
        loadUsers()
    }, [])
    return (
        <div className='content'>
            <h2>Список пользователей</h2>
            {users && users.map((user) =>
                <UserItem key={user.ID} user={user} deleteHandler={deleteHandler}/>
            )}
        </div>
    )
}

export default AdminUser