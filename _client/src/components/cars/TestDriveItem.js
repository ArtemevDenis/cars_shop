import React from 'react'

const TestDriveItem = ({testDrive, deleteTestDrive}) => {
    return (
        <dic className='test-drive-item'>
            <div className='test-drive-item__data'>
                <p className='test-drive-item__label'>Дата:</p><p
                className='test-drive-item__value'>{
                new Date(testDrive.date).toISOString().slice(0, 10).replace('T', ' ')}</p>
                <p className='test-drive-item__label'>Назавание машины:</p><p
                className='test-drive-item__value'>{testDrive.title} {testDrive.name}</p>
                <p className='test-drive-item__label'>Адрес:</p><p
                className='test-drive-item__value'>{testDrive.address}</p>
            </div>
            <div
                className='test-drive-item__action'
                onClick={() => {
                    deleteTestDrive(testDrive.ID)
                }}>X
            </div>
        </dic>
    )
}

export default TestDriveItem