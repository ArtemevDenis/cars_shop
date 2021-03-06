import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";
import TestDriveItem from "../../components/cars/TestDriveItem";

const TestDrives = () => {
    const {request} = useHttp()
    const [testDrives, setTestDrives] = useState(null)
    const [message, setMessage] = useState(null)

    const {token} = useContext(UserContext)
    const loadTestDrives = () => {
        request('/api/v1/test-drives', 'GET', null, {Authorization: `Bearer ${token}`})
            .then((r) => {

                if (r.message) {
                    setMessage(r.message)
                    setTestDrives(null)
                } else {
                    setMessage(null)
                    setTestDrives(r)
                }
            })
    }
    useEffect(() => {
        loadTestDrives()
    }, [])

    const deleteTestDrive = (id) => {
        request(`/api/v1/test-drives?id=${id}`, 'DELETE', null, {Authorization: `Bearer ${token}`})
            .then((r) => {
                if (r.message) {
                    setMessage(r.message)
                    setTestDrives(null)
                } else {
                    setMessage(null)
                    setTestDrives(r)
                }
            })
    }

    return (
        <div className='test-drive'>
            <h2 className='test-drive__title'>Ваши тест драйвы</h2>
            {message && <p>{message}</p>}
            {(testDrives && testDrives.length !== 0) && testDrives.map((testDrive) =>
                <TestDriveItem key={testDrive.ID} testDrive={testDrive} deleteTestDrive={deleteTestDrive}/>
            )}
        </div>
    )
}

export default TestDrives