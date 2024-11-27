import { useState, useRef, useEffect, useContext } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Navigate, useNavigate } from 'react-router-dom';

import './Auth.css'
// import axios from '../../api/axios';
import axios from 'axios';
import Castle from '../../data/Auth/Castle.png'
import userphoto from '../../data/Auth/userphoto.png'
import Characters from '../../data/Auth/Characters.png'
import google from '../../data/Auth/google.png'
import facebook from '../../data/Auth/facebook.png'
import yandex from '../../data/Auth/yandex.png'


const UserName = 'Алексей Алексеев'

// export default function Auth() {
const Auth = () => {
    const { isAuth, setIsAuth } = useAuth()
    const { setUserPhoto } = useAuth()
    const { setUserName } = useAuth()
    const UserRef = useRef();

    const [login, setLogin]=useState('');
    const [LoginErr, setLoginErr]=useState(false);
    const [password, setPassword]=useState('');
    const [passwordErr, setPasswordErr]=useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
          navigate('/');
        }
      }, [isAuth, navigate]);

    useEffect(() => {
        UserRef.current.focus();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: 'post',
                url: 'https://gateway.scan-interfax.ru/api/v1/account/login',
                data: {
                    login: login,
                    password: password,
                }
            })
            localStorage.setItem('accessToken', response?.data?.accessToken);
            localStorage.setItem('tokenExpire', response?.data?.expire);
            setIsAuth(true);
            setUserPhoto(userphoto)
            setUserName(UserName)
            navigate('/');

        } catch (err) {
                setLoginErr(true);
                setPasswordErr(true);
        }
    }

    const handleLoginChange = (e) => {
        const input = e.target.value;
        setLogin(input);
        validateLogin(input);
    };

    const validateLogin = (input) => {
        setLoginErr(false);
    };
    
    const handlePasswordChange = (e) => {
        const input = e.target.value;
        setPassword(input);
        validatePassword(input);  
    };    
    const validatePassword = (input) => {
        setPasswordErr(false);
    };  

    return(
        <div className='Authentification'>
            <div className='content'>
            <h1 className='text'>для оформления подписки 
            на тариф, необходимо авторизоваться.</h1>
            <img className="Characters" src={Characters} alt="Characters" />
            </div>
            <div className="authForm">
                <img className="CastleImage" src={Castle} alt="Castle image" />
                
                <div className="tabs">
                    <div className="tab active">Войти</div>
                    <div className="tab"><a className="inactive" href="#">Зарегистрироваться</a></div>
                    {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
                </div>
                <form className="authCard" onSubmit={handleSubmit}>
                    <div className="input">
                        <label htmlFor="username">Логин или номер телефона:</label>
                        <input
                            type="text"
                            id="username"
                            ref={UserRef}
                            autoComplete="on"
                            value={login}
                            onChange={handleLoginChange}
                            required
                            style={{ borderColor: LoginErr ? 'red' : '' }}
                        />
                            {LoginErr ? 
                            <div className="authCard_error">Введите корректные данные</div> 
                            : 
                            <div></div>}

                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={handlePasswordChange}
                            value={password}
                            required
                            style={{ borderColor: passwordErr ? 'red' : '' }}
                        />
                            {passwordErr ? 
                            <div className="authCard_error">Неправильный пароль</div> 
                            : 
                            <div></div>}
                    </div>         
                    <button className="auth-button" type="submit" disabled={!login || !password}>Войти</button>  
                    <a className="reset-password" href="#">Восстановить пароль</a>
                    <div className='socialNetwork'>
                        <p>Войти через:</p>
                        <div className='socialButtons'>
                            <button className='socialButton'><img src={google} alt="google"/></button>
                            <button className='socialButton'><img src={facebook} alt="facebook"/></button>
                            <button className='socialButton'><img src={yandex} alt="yandex"/></button> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
        // )}</>
    ) 
}

export default Auth