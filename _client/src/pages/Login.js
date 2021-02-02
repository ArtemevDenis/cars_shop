import React, {useContext, useState} from 'react'
import {UserContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {NavLink, useHistory} from "react-router-dom";

const Login = () => {
    const user = useContext(UserContext)
    const {request} = useHttp()
    const history = useHistory();

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const [error, setError] = useState(null)

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = () => {
        request('/api/v1/auth/login', 'POST', {...form})
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                    return
                }
                user.login(data.token, data.userID, data.role, data.email)
                history.push('/home');
            })
    }

    return (
        <div className='content-center login'>

            <div className="auth__line"><h2 className='auth__title'>Форма входа</h2><NavLink
                className='link-back'
                to='/'>на главную</NavLink>
            </div>
            <div className='auth__input_block'>
                <lable className='widget--title'>Email</lable>
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
                <lable className='widget--title'>Пароль</lable>
                <input
                    className='widget--input'
                    id='password'
                    name='password'
                    type='password'
                    value={form.password}
                    onChange={changeHandler}
                />
            </div>
            {error && <p className='error-text'>{error}</p>}
            <div className='auth__line'>
                <button
                    className='button--primary'
                    onClick={loginHandler}
                >
                    Войти
                </button>
                <button
                    className='button--primary'
                    onClick={() => {
                        history.push('/registration')
                    }}
                >
                    Регистрация
                </button>
            </div>
        </div>
    )
}

export default Login