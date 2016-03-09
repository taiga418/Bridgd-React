import {combineReducers} from 'redux'

import player from './player-reducer';
import queue from './queue-reducer';
import search from './search-reducer';


 export default combineReducers({app, player, queue, search})
