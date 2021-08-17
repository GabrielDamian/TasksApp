import {createStore} from 'redux';
import reducer from './reducer';

//store structure
// {
//     categories:
//     {
//         current_categories: 0,
//         categories:[
//             {
//                 id: 3424,
//                 title: 'cevaTitle',
//                 tasks:[
//                     {
//                         title: 'ceva',
//                         content: 'altceva'
//                     }
//                 ]
//             }
//               ]
//     ,
//      scheduleState:
//      {
//          current-state: 'empty' || 'schedule-new' || 'schedule-old'
//      }
// }



const store = createStore(reducer);

export default store;
