import React from 'react'

const UserItem = ({user, deleteHandler}) => {
    return (
        <div className='user-item'>
            <div className='user-item__data'>
                <p className='user-item__label'>Имя:</p><p
                className='user-item__value'>{user.name}</p>
                <p className='user-item__label'>Фамилия:</p><p
                className='user-item__value'>{user.surname}</p>
                <p className='user-item__label'>Контактная информация:</p><p
                className='user-item__value'>email: <a href={`mailto:${user.email}`}>{user.email}</a> тел.: <a
                href={`tel:${user.phone}`}>{user.phone}</a></p>

            </div>
            <div className='user-item__image-wrap'>
                <img
                    className='user-item__image'
                    src={`/images/${user.avatar}`}
                    alt=''/>
            </div>
            <div
                className='user-item__action'
                onClick={() => {
                    deleteHandler(user.ID)
                }}>X
            </div>
        </div>
    )
}

export default UserItem