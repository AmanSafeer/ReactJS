import { githubURL } from './constants'

export const getUserData = (username) => {
  return new Promise((resolve,reject) =>{
    fetch(githubURL + username)
      .then(res => {
        return res.json();
      })
      .then(user => resolve(user))
      .catch(error => reject(error));
  })
}