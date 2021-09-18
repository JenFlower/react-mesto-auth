import React from 'react';
import ImageSuccess from '../images/imageSuccess.svg';
import ImageError from '../images/imageError.svg';

export default function InfoTooltip(props) {
    return (
        <div className={`popup popup__image ${props.isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container popup__container_image">
                <button className="popup__close" type="button" onClick={props.onClose} ></button>
                <div className="popup__result">
                    <img className="popup__image" src={props.isSuccess ? ImageSuccess : ImageError} alt={props.isSuccess ? 'Успешно' : 'Неудачно'} />
                    <div className="popup__text">
                        <p>{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}