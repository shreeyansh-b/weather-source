import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navigation from '../Navigation/Navigation';
import background from '../../assests/mt.jpg';
import Weather from '../../containers/Weather/Weather';
import { Paper } from '@material-ui/core';
const useStyle =  makeStyles((theme) => ({
    backgroundImage:{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    fullHeight: {
        height: '100vh'
    },
    mainContent: {
        position: "absolute",
        bottom: 0,
        left: 0
    },
    padding: {
        padding: '5px'
    }
}));

const Layout = (props) => {
    const classes = useStyle();
    return(
        <Paper square className={[classes.backgroundImage, classes.fullHeight].join(' ')}>
            <Grid container direction="column" className={classes.padding}>
                <Grid container item xs={12} >
                    <Navigation />
                </Grid>
                <Grid container item xs={12} className={classes.mainContent}>
                    <Weather />
                </Grid>
            </Grid>
        </Paper>
    );
};
export default Layout;