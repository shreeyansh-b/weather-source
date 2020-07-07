import * as actionTypes from './actions';
import axios from 'axios';

export const getCoord = (search) => {
    return (dispatch) => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?key=cb5a7baa82d348b0a24d3d8db0f31a3f&q=${search}`)
            .then( res => {
                const lat = res.data.results[0].geometry.lat;
                const lon = res.data.results[0].geometry.lng;
                dispatch({
                    type: actionTypes.UPDATE_STORE,
                    lat: lat,
                    lon: lon,
                    search: search,
                    currCity: search
                })
            })
    }
}

export const getCity = (lat, lon) => {
    return (dispatch) => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=cb5a7baa82d348b0a24d3d8db0f31a3f`)
            .then( res => {
                const cityName = res.data.results[0].components.city ? res.data.results[0].components.city : res.data.results[0].components.state ; //cause cities like delhi is a state in the api
                dispatch({
                    type: actionTypes.UPDATE_STORE,
                    lat: lat,
                    lon: lon,
                    city: cityName,
                    currCity: cityName
                })
            })
    }
}

