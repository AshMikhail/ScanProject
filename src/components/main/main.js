import { useAuth } from '../../context/AuthProvider';
import lamp from '../../data/main/lamp.png'
import arrow from '../../data/main/arrow.png'
import laptop from '../../data/main/laptop.png'
import main1 from '../../data/main/main1.png'
import main2 from '../../data/main/main2.png'
import carusel_1 from '../../data/main/carusel_1.png'
import carusel_2 from '../../data/main/carusel_2.png'
import carusel_3 from '../../data/main/carusel_3.png'
import carusel_button from '../../data/main/carusel_button.png'

import './main.css'


export default function Main() {
    const { isAuth } = useAuth()

    function leftScroll() {
        const left = document.querySelector(".carusel_item");
        left.scrollBy(400, 0)
    }
    function rigthScroll() {
        const right = document.querySelector(".carusel_item");
        right.scrollBy(-400, 0)
    }
    
  return (
    <div className='main'>
        <div className='service'>
            <h1 className='service_text_h1'>сервис по поиску публикаций о компании по его ИНН</h1>
            <p className='service_text_p'>Комплексный анализ публикаций, получение данных 
                в формате PDF на электронную почту.</p>
            {isAuth ?
            <form className='search_form' action={`/search`}>
            <button className='search_button'>Запросить данные</button>
            </form>
            :
            <div></div>}
            <img src={main1} alt="" className="main_img_1" />
        </div>
        <div className='why_us'>
            <h2 className='why_us_h2'>Почему именно мы</h2>
            <div className='carusel'>
                <button id="button_left" className='carusel_button' onClick={leftScroll}><img src={carusel_button} className='button_image_left'/></button>
                <div id="scroll_container" className='carusel_item'>
                    <div className='carusel_element'>
                        <img src={carusel_1} alt="" className="carusel_image" />
                        <p className='carusel_p'>Высокая и оперативная скорость обработки заявки</p>
                    </div>
                    <div className='carusel_element'>
                        <img src={carusel_2} alt="" className="carusel_image" />
                        <p className='carusel_p'>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
                    </div>
                    <div className='carusel_element'>
                        <img src={carusel_3} alt="" className="carusel_image" />
                        <p className='carusel_p'>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
                    </div>
                    <div className='carusel_element'>
                        <img src={carusel_2} alt="" className="carusel_image" />
                        <p className='carusel_p'>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
                    </div>
                    <div className='carusel_element'>
                        <img src={carusel_1} alt="" className="carusel_image" />
                        <p className='carusel_p'>Высокая и оперативная скорость обработки заявки</p>
                    </div>
                </div>
                <button id="button_right" className='carusel_button' onClick={rigthScroll}><img src={carusel_button}/></button>
            </div>
        </div>
        <img src={main2} alt="" className="main_img_2" />
        <div className='tarifs'>
            <h2 className='tarifs_h2'>наши тарифы</h2>
            <div className='tarif_cards'>
                <div id='card' className='beginer'>
                    <div id='Beginer' className='tarif_name'>
                        <img src={lamp} alt="" className="tarif_img" />
                        <p id='tarif_name'>Beginer</p>
                        <p id='tarif_text'>Для небольшого исследования</p>
                    </div>
                    <div className='price_box'>
                        
                        <p id='tarif_name'>799 ₽</p>
                        <p className='old_price'>1 200 ₽</p>
                        {isAuth ?<p className='you_tarif'>Текущий тариф</p>
                        : <p></p>}
                    </div>
                    <p className='price_text'>или 150 ₽/мес. при рассрочке на 24 мес.</p>
                    <div className='in_tarif'>
                        <h3>В тариф входит:</h3>
                        <ul>
                            <li>Безлимитная история запросов</li>
                            <li>Безопасная сделка</li>
                            <li>Поддержка 24/7</li>
                        </ul>
                    </div>
                        {isAuth ? 
                        <button className='price_button_auth'>Перейти в личный кабинет</button>
                        : 
                        <button className='price_button'>Подробнее</button>
                        }
                </div>
                <div id='card' className='pro'>
                    <div id='pro' className='tarif_name'>
                        <img src={arrow} alt="" className="arrow_img" />
                        <p id='tarif_name'>Pro</p>
                        <p id='tarif_text'>Для HR и фрилансеров</p>
                    </div>
                    <div className='price_box'>
                        <p id='tarif_name'>1 299 ₽</p>
                        <p className='old_price'>2 600 ₽</p>
                    </div>
                    <p className='price_text'>или 279 ₽/мес. при рассрочке на 24 мес.</p>
                    <div className='in_tarif'>
                        <h3>В тариф входит:</h3>
                        <ul>
                            <li>Все пункты тарифа Beginner</li>
                            <li>Экспорт истории</li>
                            <li>Рекомендации по приоритетам</li>
                        </ul>
                    </div>
                        <button className='price_button'>Подробнее</button>
                </div>
                <div id='card' className='business'>
                    <div id='business' className='tarif_name'>
                        <img src={laptop} alt="" className="tarif_img" />
                        <p id='tarif_name'>Business</p>
                        <p id='tarif_text'>Для корпоративных клиентов</p>
                    </div>
                    <div className='price_box'>
                        <p id='tarif_name'>2 379 ₽</p>
                        <p className='old_price'>3 700 ₽</p>
                    </div>
                    <p className='price_text_pro' >   /  </p>
                    <div className='in_tarif'>
                        <h3>В тариф входит:</h3>
                        <ul>
                            <li>Все пункты тарифа Pro</li>
                            <li>Безлимитное количество запросов</li>
                            <li>Приоритетная поддержка</li>
                        </ul>
                    </div>
                        <button className='price_button'>Подробнее</button>
                </div>
            </div>
        </div>
    </div>
  );
};