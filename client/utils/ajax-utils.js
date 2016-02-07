// api
import fetch from 'isomorphic-fetch'

//TODO: resolve promise with reject if there's a server error
export function post (url, body, next) {
  return fetch(url, {
    credentials: 'same-origin',
    method:'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ?  JSON.stringify(body) : null
  })
  .then(result => {
    if(result.status > 200){
       return result.json()
        .then(err => {
          return next(err, null)
        })
    }
    return result.json()
      .then(body => {
        return next(null, body)
      })
  }).catch(err => {
    return next(err)
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
  .then(result => {
    if(result.status > 200){
       return result.json()
        .then(err => {
          return next(err, null)
        })
    }
    return result.json()
      .then(body => {
        return next(null, body)
      })
  }).catch(err => {
    return next(err)
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
  .then(result => {
    if(result.status > 200){
       return result.json()
        .then(err => {
          return next(err, null)
        })
    }
    return result.json()
      .then(body => {
        return next(null, body)
      })
  }).catch(err => {
    return next(err)
  })
 }
