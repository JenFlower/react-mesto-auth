import React from 'react';
import imageSuccess from '../images/imageSuccess.svg';
import imageFail from '../images/imageFail.svg';

export default function InfoTooltip(props) {
    return (
        // <div className={`popup popup__image ${props.isOpen ? 'popup_is-opened' : ''}`}>
        //     <div className="popup__container popup__container_image">
        //         <button className="popup__close" type="button" onClick={props.onClose} ></button>
        //         <div className="popup__result">
        //             <img className="popup__image" src={props.isSuccess ? imageSuccess : imageFail} alt={props.isSuccess ? 'Успешно' : 'Неудачно'} />
        //             <div className="popup__text">
        //                 <p>{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>


    <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`}>
        <div className="success-auth">
            <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            <div className="popup__result">
                <img className="popup__image" src={props.isSuccess ? imageSuccess : imageFail} alt={props.isSuccess ? 'Success' : 'Fail'} />
                <div className="popup__text">
                    <p>{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                </div>
            </div>
        </div>
    </section>
    )
}