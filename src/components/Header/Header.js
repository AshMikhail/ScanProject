import SGN from '../../data/Header/SGN.png'
import Rectangle from '../../data/Header/Rectangle.png'
import spiner from '../../data/Header/spner.gif'
import { useAuth } from '../../context/AuthProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Header.css' 

export default function Header() {

    const { isAuth, setIsAuth } = useAuth()
    const { userphoto } = useAuth()
    const { username } = useAuth()
    const [CompanyCount, setCompanyCount] = useState('')
    const [CompanyLimit , setCompanyLimit] = useState('')
    const [loading, setLoading] = useState(false)

    const name = formatName(username)
    function formatName(Name) {
        const parts = Name.split(' ');
        if (parts.length > 1) {
            return `${parts[0]} ${parts[1].charAt(0)}.`;
        }
        return Name;
    } 
    const handleLogout = () => {
        setIsAuth(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire'); 
    };
    
    useEffect(() => {
        const userLimit = async () => {
            setLoading(true)
            try{
            const response = await axios({
                method: 'GET',
                url: 'https://gateway.scan-interfax.ru/api/v1/account/info',
                headers: {
                    ContentType: 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setCompanyCount(response?.data?.eventFiltersInfo.usedCompanyCount);
            setCompanyLimit(response?.data?.eventFiltersInfo.companyLimit);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        userLimit();
        const interval = setInterval(userLimit, 60000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="Header">
            <div className="header_logo"><img src={SGN} alt="logo"/></div>
            <div className='Naigation'>
                <a className='Link' href='/'>Главная</a>
                <a className='Link' href='#'>Тарифы</a>
                <a className='Link' href='#'>FAQ</a>
            </div>     
                {isAuth ?
                    <> {loading? 
                        <div className='user_limit'><img src={spiner} alt="spiner" className='spiner'/></div>
                        :
                        <div className='user_limit'>
                            <div className='CompanyCountName'>Использовано компаний</div>
                            <div className='CompanyCountCount'>{CompanyCount}</div>
                            <div className='CompanyLimitName'>Лимит по компаниям</div>
                            <div className='CompanyLimitCount'>{CompanyLimit}</div>
                        </div>
                        }
                        <div className='user_name'>
                            <div className='name'>{name}</div>
                            <a href='#' className='logout' onClick={handleLogout}>Выйти</a>
                            <div className='user_img'><img src={userphoto} alt="userPhoto"/></div>
                            </div>
                    </>
                    :
                    <div className='Auth'>
                    <div className='authlink'><a href='#'>Зарегестрироватся</a></div>
                    <div className='separator'><img src={Rectangle} alt="Rectangle"/></div>
                    <div className='authbutton'><form action={`/auth/`}><button className='Login_btn'>Войти</button></form></div>  
                </div>
                }

        </div>
    );
  };