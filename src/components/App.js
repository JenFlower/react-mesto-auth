import '../index.css';
import { useState, useEffect } from 'react'
import { api } from '../utils/Api'
import * as authApi from '../utils/Auth'

import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useHistory, Route, Switch } from 'react-router-dom';

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute' 
import InfoTooltip from './InfoTooltip' 


export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)

  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory()

  useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
    .then(([ userData, cards ]) => { 
      setCards(cards)
      setCurrentUser(userData)
    })
    .catch(error => console.log(error));
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(error => console.log(error))
  }  

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item !== card));
    })
    .catch(error => console.log(error))
  }  

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }


  const handleCardClick = (data) => {
    setSelectedCard(data)
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard(null)
  }

  const handleUpdateUser = (data) => {
    api.patchUserData(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
    .catch(error => console.log(error))
  }

  const handleUpdateAvatar = (data) => {
    api.updateAvatar(data)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
    .catch(error => console.log(error))
  }

  const handleAddPlace = (data) => {
    api.postCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]); 
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  const handleRegisterUser = (email, password) => {
    authApi.register(email, password)
      .then(res => {
        history.push('/sign-in')
        setIsRegistrationSuccess(true)
      })
      .catch(() => setIsRegistrationSuccess(false))
      .finally(() => setIsInfoTooltipOpen(true)) // открыть модалку
  }

  const [email, setEmail] = useState('')
  
  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
  // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      // проверим токен
      authApi.getContent(jwt)
        .then((res) => {
          if(res) {
            // авторизуем пользователя
            // сохранение почты для вывода в хедер
            console.log('tokenCheck', res)
            setEmail(res.data.email)
            setLoggedIn(res.data != null)
            history.push('/')
          }
        })
        .catch(e => console.log(e)) 
    }
  } 
  
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt === null) { return }
    tokenCheck();
  }, []);

  const handleLogin = (email, password) => {

    authApi.login(email, password)
    .then((data) => {
        setLoggedIn(true)
        history.push('/')
        tokenCheck()
    })
    .catch(e => console.log(e))
  }

  const onExit = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userName={email} clickExit={onExit}/>
        <Switch>
          <Route path='/sign-up'> 
            <Register register={handleRegisterUser}/>
          </Route>

          <Route path='/sign-in'> 
            <Login onLogin={handleLogin} />
          </Route>

          <ProtectedRoute exact path='/'
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            card={selectedCard}
            onOpenPreview={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

        </Switch>

        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
       
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} buttonText="Сохранить"/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <ImagePopup name="preview" card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip name="isSuccessAuth" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isRegistrationSuccess}/>

      </div>

    </CurrentUserContext.Provider>
      
  );
}
