import React from 'react'

const AdminTestDriveItem = ({testDrive, deleteTestDrive}) => {

    return (
        <div className='test-drive-item'>
            <div className='test-drive-item__data'>
                <p className='test-drive-item__label'>Дата:</p><p
                className='test-drive-item__value'>{
                new Date(testDrive.date).toISOString().slice(0, 10).replace('T', ' ')}</p>
                <p className='test-drive-item__label'>Назавание машины:</p><p
                className='test-drive-item__value'>{testDrive.title} {testDrive.name}</p>
                <p className='test-drive-item__label'>Адрес:</p><p
                className='test-drive-item__value'>{testDrive.address}</p>
                <p className='test-drive-item__label'>Заказчик:</p><p
                className='test-drive-item__value'>{testDrive.userSurname} {testDrive.userName}</p>
                <p className='test-drive-item__label'>Контактная информация:</p><p
                className='test-drive-item__value'>email: <a
                href={`mailto:${testDrive.email}`}>{testDrive.email}</a> тел.: <a
                href={`tel:${testDrive.phone}`}>{testDrive.phone}</a></p>
            </div>
            <div
                className='test-drive-item__action'
                onClick={() => {
                    deleteTestDrive(testDrive.ID)
                }}>X
            </div>
        </div>
    )
}

export default AdminTestDriveItem