import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stepper from '../Stepper/Stepper';
import Date from './Date/Date';
import Skeleton from '@material-ui/lab/Skeleton';



import cloudy from '../../assests/svgs/cloudy.svg';
import day from '../../assests/svgs/day.svg';
import night from '../../assests/svgs/night.svg';
import cloudyDay from '../../assests/svgs/cloudyDay.svg';
import cloudyNight from '../../assests/svgs/cloudyNight.svg';
import thunder from '../../assests/svgs/thunder.svg';
import drizzle from '../../assests/svgs/drizzle.svg';
import rainy from '../../assests/svgs/rainy.svg';
import snowy from '../../assests/svgs/snowy.svg';
import haze from '../../assests/svgs/haze.png';

import humidity from '../../assests/svgs/humidity.svg'
import wind from '../../assests/svgs/wind.svg';
import pressure from '../../assests/svgs/air.svg';
import { ButtonGroup } from '@material-ui/core';
import {connect} from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 50,
      flex: 1,
      backgroundColor: "transparent",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 30,
      [theme.breakpoints.down('md')]: {
        fontSize: 20,
    },
    },
    pos: {
      marginBottom: 12,
    },
    capitalize: {
        textTransform: 'capitalize',
        fontSize: '50px',
        [theme.breakpoints.down('md')]: {
            fontSize: '30px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px',
        },
    },
    bg:{
        backgroundColor: "rgba(0,0,0, 0.3)",
        backdropFilter: "blur(10px)",
        alignItems: 'center'
    },
    icons:{
        height: 70, 
        objectFit: "contain",
        [theme.breakpoints.down('md')]: {
            height: 50, 
        },
    },
    subs:{
        fontSize: '16px',
        [theme.breakpoints.down('md')]: {
            fontSize: '12px',
        },
    }
}));
  

const WeatherUI = (props) => {
    const classes = useStyles();
    const degree = "°";
    let temp_unit = 'C';
    let speed_unit = 'k/h';
    if(!props.isMetric){
        temp_unit = 'K';
        speed_unit = 'm/h';
    }
    let weatherIcon = null;
    if(props.weatherType === 'Clear' && !props.isNight){
        weatherIcon = day;
    }
    else if(props.weatherType === 'Clear' && props.isNight){
        weatherIcon = night;
    }
    else if(props.weatherType === 'Clouds' && !props.isNight && props.weatherDescription === 'few clouds'){
        weatherIcon = cloudyDay;
    }
    else if(props.weatherType === 'Clouds' && props.isNight && props.weatherDescription === 'few clouds'){
        weatherIcon = cloudyNight;
    }
    else if(props.weatherType === 'Clouds' && (props.weatherDescription === 'scattered clouds' || props.weatherDescription === 'broken clouds' || props.weatherDescription === 'overcast clouds') ){
        weatherIcon = cloudy;
    }
    else if(props.weatherType === 'Thunderstorm'){
        weatherIcon = thunder;
    }
    else if(props.weatherType === 'Drizzle'){
        weatherIcon = drizzle;
    }
    else if(props.weatherType === '	Rain'){
        weatherIcon = rainy;
    }
    else if(props.weatherType === 'Snow'){
        weatherIcon = snowy;
    }
    else{
        weatherIcon = haze;
    }
    return(
        props.dataLoaded ? (
        <React.Fragment>
        <Grid container item xs={12} sm={12} md={4} lg={4} className={classes.bg}>
            <Card className={classes.root} square elevation={0} >
                <CardContent>
                        <Typography  color="textPrimary" className={classes.capitalize}>
                            {props.currentCity}'s Weather
                        </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid container>
            <Grid container item xs={12} sm={12} md={4} className={classes.bg}>
                <Card className={classes.root} square elevation={0}>
                    <CardContent>
                        <Grid container item xs={12} justify='center'>
                            <Date />
                        </Grid>
                        <Grid container item xs={12} justify='center'>
                            <Stepper></Stepper>
                        </Grid>
                        
                    </CardContent>
                </Card>
            </Grid>
            <Grid container item xs={6} sm={6} md={2} className={classes.bg}>
                <Card className={classes.root} square elevation={0}>
                    <CardContent>
                        <CardMedia image={weatherIcon} title={props.weatherDescription} className={classes.icons} component="img" ></CardMedia>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                        {props.temperature}{degree}{temp_unit}
                        </Typography>
                        <Typography className={classes.subs}>
                            Feels like {props.feelsLike}{degree}{temp_unit}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container item xs={6} sm={6} md={2} className={classes.bg}>
                <Card className={classes.root} square elevation={0}>
                    <CardContent>
                    <CardMedia image={humidity} title="Humidity" className={classes.icons}  component="img" ></CardMedia>
                        <Typography className={classes.title} color="textPrimary" gutterBottom >
                            {props.humidity}%
                        </Typography>
                        <Typography className={classes.subs}>
                            Humidity
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container item xs={6} sm={6} md={2} className={classes.bg}>
                <Card className={classes.root} square elevation={0}>
                    <CardContent>
                    <CardMedia image={wind} title="Wind" className={classes.icons}  component="img" ></CardMedia>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            {props.windSpeed}{speed_unit}
                        </Typography>
                        <Typography className={classes.subs}>
                            Wind
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container item xs={6} sm={6} md={2} className={classes.bg}>
                <Card className={classes.root} square elevation={0}>
                    <CardContent>
                    <CardMedia image={pressure} title="Pressure" className={classes.icons}  component="img" ></CardMedia>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            {props.pressure}hPa
                        </Typography>
                        <Typography className={classes.subs}>
                            Pressure
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid> 
        </React.Fragment> ) : ( <Skeleton animation="wave" height={150} width="100%"  />)
    );
};

const mapStateToProps = (state) => {
    return({
        dataLoaded: state.dataLoaded,
        lat: state.latitude,
        lon: state.longitude,
        currentCity: state.currentCity
    })
}



export default connect(mapStateToProps)(WeatherUI);