//import {post} from '../utils/ajax-utils'
import $ from 'jquery'
// export function signOut(){
//   $.ajax({
//     method: 'POST',
//     url: '/signout/'+ name,
//     success: function(data){
//       window.location = "/lobby"
//     },
//     error: function(err){
//       console.log('err')
//     }
//   })
// }


// export function socketUpdate(queue){
//   Dispatcher.dispatch({
//     type: ActionTypes.SOCKET_UPDATE,
//     queue: queue 
//   })
// }

// search(e){
//     let query = e.target.value;
//     if(query.length > 2){
//        $.ajax({
//         url: 'https://www.googleapis.com/youtube/v3/search',
//         data: {
//           key: 'AIzaSyA-2P-UjlhcwiMC4P6z0z9f-SU7s4FMIJQ',
//           type: 'video',
//           maxResults: '8',
//           part: 'id,snippet',
//           fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
//           q: query
//         }
//       })
//       .done( function (data) {
//         this.setState({results: data.items, showResults: true})
//       }.bind(this))
//     }
//   }

export const SEARCH_SUBMIT = "SEARCH_SUBMIT"
export const SEARCH_SUCCESS = "SEARCH_SUCCESS"
export const SEARCH_FAIL = "SEARCH_FAIL"

export function searchAPI(query){
  return (dispatch) => {
    dispatch({type: SEARCH_SUBMIT})
      return $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
          key: 'AIzaSyA-2P-UjlhcwiMC4P6z0z9f-SU7s4FMIJQ',
          type: 'video',
          maxResults: '8',
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
          q: query
        }
      })
      .done((data) => {
        dispatch({type: SEARCH_SUCCESS, results: data.items})
      })
  }
}

