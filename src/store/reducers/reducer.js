import * as actionTypes from '../actions';
import moment from 'moment';
const initialState = {
    search: null,
    city: null,
    latitude: null,
    longitude: null,
    date: moment(new Date()).format('LL'),
    metric: true,
    currentDayArrayIndex: 0,
    dataLoaded: false,
    isReset: true,
    currentCity: null
}
const reducer = (state = initialState, action) => {
    if(action.type === actionTypes.UPDATE_STORE){
        return{
            ...state,
            search: action.search ? action.search : state.search ? state.search : null,
            city: action.city ? action.city : state.city ? state.city : null,
            latitude: action.lat,
            longitude: action.lon,
            date:moment(new Date()).format('LL'),   //so that when one searches or changes location they aren't in forecast anymore
            isReset: true,
            currentDayArrayIndex: 0,
            currentCity: action.currCity
        }
    }
    if(action.type === actionTypes.UNITS_CHANGE){
        return{
            ...state,
            metric: action.value
        }
    }
    if(action.type === actionTypes.DATE_INCREMENT){
        const convertedCurrentDate = moment(state.date).format(); //if not for this then moment first converts the formatted date to its default format and which leads to one less day
        const updatedCurrentDayArrayIndex = state.currentDayArrayIndex + 1;
        return{
            ...state,
            date: moment(convertedCurrentDate).add(1, 'days').format('LL'),
            currentDayArrayIndex: updatedCurrentDayArrayIndex,
            isReset: false

        }
    }
    if(action.type === actionTypes.DATE_DECREMENT){
        const convertedCurrentDate = moment(state.date).format(); //if not for this then moment first converts the formatted date to its default format and which leads to one less day
        const updatedCurrentDayArrayIndex = state.currentDayArrayIndex - 1;
        const shouldReset = updatedCurrentDayArrayIndex ? false : true;
        return{
            ...state,
            date: moment(convertedCurrentDate).subtract(1, 'days').format('LL'),
            currentDayArrayIndex: updatedCurrentDayArrayIndex,
            isReset: shouldReset
        }
    }
    if(action.type === actionTypes.DATA_LOADED){
        return{
            ...state,
            dataLoaded: true
        }
    }

    return state;
}
export default reducer;