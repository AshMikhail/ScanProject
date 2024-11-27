import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; 
import Document from '../../data/Search/Document.png'
import Folders from '../../data/Search/Folders.png'
import Group from '../../data/Search/Group.png'

import './Search.css'

const Search = () => {

    const [tonality, setTonality] = useState('Любая');
    const [innCompany, setInnCompany] = useState('');
    const [innErr, setInnErr] = useState('');
    const [numDoc, setNumDoc] = useState('');
    const [numDocErr, setNumDocErr] = useState('');
    const [checkboxStates, setCheckboxStates] = useState({
        maxCompleteness: true,
        businessMentions: true,
        mainRole: true,
        riskFactorsOnly: false,
        includeMarketNews: false, 
        includeAnnouncements: true,
        includeNewsSummaries: false,
      });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [inputType, setInputType] = useState('text');
    const [dateError, setDateError] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
    
        const isValid = innCompany && numDoc && startDate && endDate;
        setIsFormValid(isValid);
      }, [innCompany, numDoc, startDate, endDate, checkboxStates]);

    const validateInn = (inn) => {
        let result = false;
        let error = {code: '', message: ''}
        if (typeof inn === 'number') {
            inn = inn.toString();
        } else if (typeof inn !== 'string') {
            inn = '';
        }
        if (!inn.length) {
            error.code = 1;
            error.message = 'ИНН пуст';
        } else if (/[^0-9]/.test(inn)) {
            error.code = 2;
            error.message = 'ИНН может состоять только из цифр';
        } else if ([10, 12].indexOf(inn.length) === -1) {
            error.code = 3;
            error.message = 'ИНН может состоять только из 10 или 12 цифр';
        } else {
            const checkDigit = function (inn, coefficients) {
                let n = 0;
                for (let i in coefficients) {
                    n += coefficients[i] * inn[i];
                }
                return parseInt(n % 11 % 10);
            };
            switch (inn.length) {
                case 10:
                    var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if (n10 === parseInt(inn[9])) {
                        result = true;
                    }
                    break;
                case 12:
                    var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                    if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
                        result = true;
                    }
                    break;
            }
            if (!result) {
                error.code = 4;
                error.message = 'Введите корректные данные';
            }
        }
        setInnErr(error.message)
        return result;
    };
    const validateNumDoc = (number) => {
    
        if (!number) {
          setNumDocErr("Обязательное поле");
        } else if (isNaN(number) || number < 1) {
          setNumDocErr("Введите цифры");
        } else if (number > 1000) {
          setNumDocErr("Введите корректные данные");
        } else {
          setNumDocErr("");
        }
      };    
    const validateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    if (!startDate || !endDate) {
        setDateError("Обязательное поле");
    } else if (new Date(startDate) > new Date(endDate)) {
        setDateError("Введите корректные данные");
    } else if (new Date(startDate) > currentDate || new Date(endDate) > currentDate) {
        setDateError("Дата не может быть позже текущей даты");
    } else {
        setDateError("");
    }
    };

    const labels = {
        maxCompleteness: "Признак максимальной полноты",
        businessMentions: "Упоминания в бизнес-контексте",
        mainRole: "Главная роль в публикации",
        riskFactorsOnly: "Публикации только с риск-факторами",
        includeMarketNews: "Включать технические новости рынков",
        includeAnnouncements: "Включать анонсы и календари",
        includeNewsSummaries: "Включать сводки новостей",
        };
    
      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxStates(prevState => ({
          ...prevState,
          [name]: checked,
        }));
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (isFormValid) {
          
          const searchParams = {
            issueDateInterval: {
              startDate: `${startDate}T00:00:00+03:00`,
              endDate: `${endDate}T23:59:59+03:00`
            },
            searchContext: {
              targetSearchEntitiesContext: {
                targetSearchEntities: [{
                  type: "company",
                  inn: innCompany,
                  maxFullness: checkboxStates.maxCompleteness,
                }],
                onlyMainRole: checkboxStates.mainRole,
                tonality: tonality,
                onlyWithRiskFactors: checkboxStates.riskFactorsOnly,
              }
            },
            attributeFilters: {
              excludeTechNews: !checkboxStates.includeMarketNews,
              excludeAnnouncements: !checkboxStates.includeAnnouncements,
              excludeDigests: !checkboxStates.includeNewsSummaries,
            },
            limit: Number(numDoc),
            sortType: "sourceInfluence",
            sortDirectionType: "desc",
            intervalType: "month",
            histogramTypes: ["totalDocuments", "riskFactors"]
          };
      
          console.log('Отправка запроса на сервер с данными:', searchParams);
      
        //   navigate('/results', { state: { searchParams: searchParams } });
        } else {
          console.log('Форма не валидна, перенаправление не выполнено.');
        }
      };


    return(
        <div className="Search">
            <h2 className='Search_h2'>Найдите необходимые данные в пару кликов.</h2>
            <p className='Search_p'>Задайте параметры поиска.<br/>
            Чем больше заполните, тем точнее поиск</p>
            <form onSubmit={handleSubmit} className='Search_form'>
                <label className='Search_inn_label' htmlFor="INNCo">ИНН Компании <span className={innErr ? "asterisk_inn_error" : "asterisk"}>*</span><br/></label>
                    <input
                        className='Search_inn_input'
                        type="text"
                        id="INNCo"
                        autoComplete="off"
                        value={innCompany}
                        onChange={(e) => setInnCompany(e.target.value)}
                        onBlur={() => validateInn(innCompany)}
                        placeholder='10 или 12 цифр'
                        style={{ borderColor: innErr ? 'red' : '' }}
                    />
                    {innErr ? <div className="Search_inn_error">{innErr}</div>:<div></div>}

                    <label className='Search_tonality_label' htmlFor="tonality">Тональность</label>
                    <select className='Search_tonality_select' name="tonality" value={tonality} onChange={(e) => setTonality(e.target.value)}>
                        <option value="any">Любая</option>
                        <option value="positive">Позитивная</option>
                        <option value="negative">Негативная</option>
                    </select>

                    <label className='search_number_of_documents_label' htmlFor="number of documents">ИНН Компании <span className={numDocErr ? "asterisk_number_of_documents_error" : "asterisk"}>*</span><br/></label>
                    <input
                        className='search_number_of_documents_input'
                        type="text"
                        id="INNCo"
                        autoComplete="off"
                        value={numDoc}
                        onChange={(e) => setNumDoc(e.target.value)}
                        onBlur={() => validateNumDoc(numDoc)}
                        placeholder='От 1 до 1000'
                        style={{ borderColor: numDocErr ? 'red' : '' }}
                    />
                    {numDocErr ? <div className="search_number_of_documents_error">{numDocErr}</div>:<div></div>}
                    
                    <label className='search_date_label' htmlFor="startDate">Диапазон поиска <span className={dateError ? "asterisk_date_error" : "asterisk"}>*</span></label>
                    <input
                        type={inputType}
                        onFocus={() => setInputType('date')}
                        onBlur={() => {
                        validateDateRange();
                        if (!startDate) setInputType('text');
                        }}
                        id="startDate"
                        name="startDate"
                        placeholder="Дата начала"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className='search_start_Date'
                        style={{ borderColor: dateError ? 'red' : '' }}
                    />
                    <input
                        type={inputType}
                        onFocus={() => setInputType('date')}
                        onBlur={() => {
                        validateDateRange();
                        if (!endDate) setInputType('text');
                        }}
                        id="endDate"
                        name="endDate"
                        placeholder="Дата конца"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className='search_end_Date'
                        style={{ borderColor: dateError ? 'red' : '' }}
                    />
                    {dateError && <div className="search_date_error">{dateError}</div>}

                    <div className="search_checkbox_block">
                        {Object.keys(checkboxStates).map((key) => (
                        <div  className="search_checkbox_container">
                            <input
                                type="checkbox"
                                id={`checkbox-${key}`}
                                name={key}
                                checked={checkboxStates[key]}
                                onChange={handleCheckboxChange}
                                className="search_checkbox_input"
                            />
                            <label htmlFor={`checkbox-${key}`} className={checkboxStates[key] ? "checked-label" : ""}>
                                <span className="search_checkbox_span"></span>
                                <span className="label-text">{labels[key]}</span>
                            </label>
                        </div>
                        ))}
                    </div>
                    <button className="search_checkbox_button" type="submit" disabled={!isFormValid}>Поиск</button>
                    <p className="search_checkbox_annotation">* Обязательные к заполнению поля</p>
            </form>            
            <img src={Document} alt="" className="Search_img_1" />
            <img src={Folders} alt="" className="Search_img_2" />
            <img src={Group} alt="" className="Search_img_3" />
        </div>
    )
}

export default Search