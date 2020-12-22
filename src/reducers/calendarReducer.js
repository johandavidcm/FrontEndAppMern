import moment from 'moment';
import { types } from '../types/types';

const initalState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgColor:'#fafafa',
        notes: 'Comprar el pastel',
        user: {
            _id: '123',
            name: 'Fernando'
        }
    }],
    activeEvent: null
};

export const calendarReducer = ( state = initalState, action ) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return{
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
                // activeEvent: null
            }
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id) ? action.payload : event
                )
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    event => (event.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }
        default:
            return state;
    }
}