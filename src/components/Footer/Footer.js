import logo from '../../data/Footer/logo.png'
import adress from '../../data/Footer/adress.png'
import Copyright from '../../data/Footer/Copyright.png';
import './Footer.css'


export default function Footer() {
    return (
        <div className="Footer" content="width=device-width">
            <img src={logo} alt="Логотип компании" className="footer_logo" />       
            <img src={adress} alt="г. Москва, Цветной б-р, 40 +74957712111 info@skan.ru" className="adress" />       
            <img src={Copyright} alt="Copyright. 2022" className="Copyright" />       
        </div>
    );
  };