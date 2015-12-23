// api
import fetch from 'isomorphic-fetch'

export function post (url, body, next) {
  return fetch(url, {
    credentials: 'same-origin',
    method:'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(result => {
    console.log('here')
    if(result.status == 500){
      return next(result)
    }
    next(null, result)
  })
}

export function put (url, body, next) {
  return fetch(url, {
    credentials: 'same-origin',
    method:'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(result => {
    next(result)
  })
}

export function get (url, next) {
  return fetch(url, {
    credentials: 'same-origin',
    method:'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(result => {
    next(result)
  }) 
 } 