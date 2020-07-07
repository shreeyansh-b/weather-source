import React, {Component} from 'react';
import WeatherUI from '../../components/WeatherUI/WeatherUI';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import * as actionTypes from '../../store/actions';
class Weather extends Component{
    state = {
        dailyWeather: [],
        date: null,
        temperature: null,
        feelsLike: null,
        humidity: null,
        windSpeed: null,
        windDegree: null,
        pressure: null,
        weatherType: null,
        weatherDescription: null,
        isMetric: true,
        isForecast: false,
        inputSearch: null,
        inputLat: null,
        inputLon: null
    }
    stateLoaderHandler(search, lat, lon, date) {
        const units = this.props.metric ? 'metric' : 'imperial';
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=1ee8a98a2077ca34d3b117fa0e9dc2f9&exclude=hourly&units=${units}`)
            .then( res => { 
                const updatedDailyWeather = res.data.daily;
                this.setState({
                inputSearch: search,
                inputLat:lat, 
                inputLon:lon,
                isForecast: false,
                isMetric: this.props.metric,
                dailyWeather: updatedDailyWeather,
                date: this.convertDate(res.data.current.dt),
                temperature: Math.round(res.data.current.temp),
                feelsLike: Math.round(res.data.current.feels_like),
                humidity: res.data.current.humidity,
                windSpeed: this.props.metric ? this.msTokmh(res.data.current.wind_speed) : res.data.current.wind_speed ,
                windDegree: this.degToCompass(res.data.current.wind_deg),
                pressure: res.data.current.pressure,
                weatherType: res.data.current.weather[0].main,
                weatherDescription: res.data.current.weather[0].description
                });
                this.props.onDataLoad();
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.search && (this.state.inputSearch !== this.props.search)) {  //if not for "and" statement it goes into infinite loop cause setstate re-renders and then componentDidUpdate gets triggered
            this.stateLoaderHandler(this.props.search, this.props.lat, this.props.lon, this.props.date);
        }
        if((this.props.lat && this.props.lon) && (this.state.inputLat !== this.props.lat) && (this.state.inputLon !== this.props.lon)){
            this.stateLoaderHandler(this.props.search, this.props.lat, this.props.lon, this.props.date);
        }
        if(this.props.metric !== this.state.isMetric){
            this.stateLoaderHandler(this.props.search, this.props.lat, this.props.lon, this.props.date);
        }
        if(this.props.currDay !== 0 && this.props.date !== this.state.date ){
            const givenDaysWeather = this.state.dailyWeather[this.props.currDay];
            this.setState({
                isMetric: this.props.metric,
                isForecast: true,
                date: this.convertDate(givenDaysWeather.dt),
                temperature: Math.round((givenDaysWeather.temp.max + givenDaysWeather.temp.max) / 2),
                feelsLike: Math.round((givenDaysWeather.feels_like.day + givenDaysWeather.feels_like.day) /2),
                humidity: givenDaysWeather.humidity,
                windSpeed: this.props.metric ? this.msTokmh(givenDaysWeather.wind_speed) : givenDaysWeather.wind_speed ,
                windDegree: this.degToCompass(givenDaysWeather.wind_deg),
                pressure: givenDaysWeather.pressure,
                weatherType: givenDaysWeather.weather[0].main,
                weatherDescription: givenDaysWeather.weather[0].description
            })
        }
        if(prevState.isForecast && this.props.currDay === 0){
            this.stateLoaderHandler(this.props.search, this.props.lat, this.props.lon, this.props.date);
        }
        
    }
    convertDate(date){
        const convertedDate = new Date(date * 1000); //as openweathermap has date in unix format
        let convertedDateFormated =  moment(convertedDate).format('LL');
        return convertedDateFormated;
    }
    degToCompass(num) { //@https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
    msTokmh(speed){
        const kmphSpeed = (speed * (18/5)).toFixed(1);
        return kmphSpeed;
    }
    isNight(){
        const timeofDay = new Date();
        const hourofDay = timeofDay.getHours();
        if(hourofDay > 19 && hourofDay < 6)
            return true;
        else
            return false;
    }

    render(){
        {this.isNight()}
        return(
            <WeatherUI temperature={this.state.temperature} 
            feelsLike={this.state.feelsLike} 
            humidity={this.state.humidity} 
            windSpeed={this.state.windSpeed} //its in m/s convert to km/h
            windDegree={this.state.windDegree} 
            pressure={this.state.pressure} 
            weatherType={this.state.weatherType}
            weatherDescription={this.state.weatherDescription}
            isMetric={this.state.isMetric}
            isForecast={this.state.isForecast}
            isNight={this.isNight()}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return({
        search: state.search,
        lat: state.latitude,
        lon: state.longitude,
        date: state.date,
        metric: state.metric,
        currDay: state.currentDayArrayIndex
    })
}
const mapDispatchToProps = (dispatch) => {  
    return{
        onDataLoad: () => dispatch({type: actionTypes.DATA_LOADED}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Weather);

//change store not local state when search and lon lat