export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password 
    })
  })
  .then(checkResponse)
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password 
      })
    })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        console.log('data', data.token)
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
  };

  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(checkResponse)
    .then(data => data)
  }