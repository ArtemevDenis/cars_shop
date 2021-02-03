import React, {useContext, useRef, useState} from 'react'
import {UserContext} from "../context/AuthContext";
import {NavLink, useHistory} from "react-router-dom";

const Registration = () => {
    const user = useContext(UserContext)
    const avatar = useRef()

    const [error, setError] = useState(null)
    const history = useHistory();
    const [form, setForm] = useState({
        email: '', password: '', passwordRepeat: '', name: '', surname: '', phone: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registrationHandler = () => {

        if (avatar.current.files.length)
            new Promise(async resolve => {
                const formData = new FormData()
                await formData.append('avatar', avatar.current.files[0], avatar.current.files[0].name);
                await formData.append('data', JSON.stringify(form))
                const req = await fetch('/api/v1/auth/registration', {
                    mode: 'no-cors',
                    method: 'POST',
                    body: formData
                })
                const res = await req.json()
                if (!res.error)
                    resolve(res)
                else
                    setError(res.error)

            })
                .then((data) => {
                    user.login(data.token, data.userID, data.role, data.email)
                    history.push('/home');
                })

    }
    return (
        <div className='content-center '>
            <div className="auth__line"><h2 className='auth__title'>Форма регистрации</h2><NavLink
                className='link-back'
                to='/'>на главную</NavLink>
            </div>
            <div className='registration'>
                <div className='auth__input_block'>
                    <label className='widget--title'>
                        Email
                    </label>
                    <input
                        className='widget--input'
                        id='email'
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={changeHandler}
                    />
                </div>
                <div className='auth__input_block'>
                    <label className='widget--title'>
                        Телефон
                    </label>
                    <input
                        className='widget--input'
                        id='phone'
                        name='phone'
                        type='phone'
                        value={form.phone}
                        onChange={changeHandler}
                    />
                </div>
                <div className='auth__input_block'>
                    <label className='widget--title'>
                        Пароль
                    </label>
                    <input
                        className='widget--input'
                        id='password'
                        name='password'
                        type='password'
                        value={form.password}
                        onChange={changeHandler}
                    />
                </div>
                <div className='auth__input_block'>
                    <label className='widget--title'>
                        Пароль повторно
                    </label>
                    <input
                        className='widget--input'
                        id='passwordRepeat'
                        name='passwordRepeat'
                        type='password'
                        value={form.passwordRepeat}
                        onChange={changeHandler}
                    />
                </div>
                <div className='auth__input_block'>

                    <label className='widget--title'>
                        Имя
                    </label>
                    <input
                        className='widget--input'
                        id='name'
                        name='name'
                        type='text'
                        value={form.name}
                        onChange={changeHandler}
                    />
                </div>
                <div className='auth__input_block'>
                    <label className='widget--title'>
                        Фамилия
                    </label>
                    <input
                        className='widget--input'
                        id='surname'
                        name='surname'
                        type='text'
                        value={form.surname}
                        onChange={changeHandler}
                    />
                </div>
                <div className='auth__input_block'>
                    <label className='widget--title'>
                        Аватар
                    </label>
                    <input

                        className='widget--upload'
                        ref={avatar}
                        type='file'
                        onChange={changeHandler}
                    />
                </div>
            </div>
            {error && <p className='error-text'>{error}</p>}
            <div className='auth__line'>
                <button

                    className="button--primary"
                    onClick={() => {
                        history.push('/login')
                    }}
                >
                    Войти
                </button>
                <button
                    className="button--primary"
                    onClick={registrationHandler}
                >
                    Регистрация
                </button>
            </div>
        </div>
    )
}

export default Registration