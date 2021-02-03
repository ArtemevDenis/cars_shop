import React, {useContext, useEffect, useState} from 'react'
import ImageUpload from "../../components/inputs/ImageUpload";
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";

const Profile = () => {

    const [error, setError] = useState(null)
    const [selectedFile, setSelectedFile] = useState()
    const {request} = useHttp()
    const [form, setForm] = useState({
        email: '', name: '', surname: '', phone: ''
    })
    const [imgLink, setImgLink] = useState(null)
    const {token} = useContext(UserContext)

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const updateHandler = () => {
        if (selectedFile)
            new Promise(async resolve => {
                const formData = new FormData()
                await formData.append('avatar', selectedFile, selectedFile.name);
                await formData.append('data', JSON.stringify(form))

                const headers = {}
                headers['Authorization'] = `Bearer ${token}`
                const req = await fetch('/api/v1/user', {
                    method: 'POST',
                    body: formData,
                    headers
                })
                const res = await req.json()
                console.log(res)
                if (!res.error)
                    resolve(res)
                else
                    setError(res.error)

            })
        else
            request('/api/v1/user/fields', 'POST', form, {Authorization: `Bearer ${token}`})
                .then(r => {
                    setForm({email: r.email, name: r.name, surname: r.surname, phone: r.phone});
                    setImgLink(r.img);
                })
    }


    const loadUser = () => {
        request('/api/v1/user', 'GET', null, {Authorization: `Bearer ${token}`})
            .then(r => {
                setForm({email: r.email, name: r.name, surname: r.surname, phone: r.phone});
                setImgLink(r.img);
            })
    }
    useEffect(() => {
        loadUser()
    }, [])


    return (
        <div>
            <h2>Персональные данные</h2>
            <div className='profile-content'>

                <div>
                    <div className='profile-content__input_block'>

                        <lable className='widget--title'>
                            Имя
                        </lable>
                        <input
                            className='widget--input widget--input--dark'
                            id='name'
                            name='name'
                            type='text'
                            value={form.name}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='profile-content__input_block'>
                        <lable className='widget--title'>
                            Фамилия
                        </lable>
                        <input
                            className='widget--input widget--input--dark'
                            id='surname'
                            name='surname'
                            type='text'
                            value={form.surname}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='profile-content__input_block'>
                        <lable className='widget--title'>
                            Email
                        </lable>
                        <input
                            className='widget--input widget--input--dark'
                            id='email'
                            name='email'
                            type='email'
                            value={form.email}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='profile-content__input_block'>
                        <lable className='widget--title'>
                            Телефон
                        </lable>
                        <input
                            className='widget--input widget--input--dark'
                            id='phone'
                            name='phone'
                            type='phone'
                            value={form.phone}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='profile-content__input_block'>
                        <button className='button--primary' onClick={updateHandler}>Обновить данные</button>
                    </div>
                </div>
                <ImageUpload link={imgLink} selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
            </div>
        </div>
    )
}

export default Profile