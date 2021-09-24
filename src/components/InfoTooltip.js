import React from 'react';
import imageSuccess from '../images/imageSuccess.svg';
import imageFail from '../images/imageFail.svg';

export default function InfoTooltip(props) {
    return (
    <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`}>
      <div className="auth-popup">
      <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            <div className="auth-popup__result">
                <img className={`auth-popup__image`} src={props.isSuccess ? imageSuccess : imageFail} alt={props.isSuccess ? 'Success' : 'Fail'} />
                <p className="auth-popup__text">
                    {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
            </div>
      </div>
    </section>
    )
}