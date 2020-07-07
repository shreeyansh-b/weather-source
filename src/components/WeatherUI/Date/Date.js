import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux'

const useStyle =  makeStyles((theme) => ({
    size:{
        fontSize: '94px',
        [theme.breakpoints.down('lg')]: {
            fontSize: '65px',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '50px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '25px',
        },
    },
}));


const Date = (props) => {
    const classes = useStyle();
    return(
        <Typography className={classes.size}>{props.date}</Typography>
    )
}

const mapStateToProps = (state) => {
    return({
        date: state.date
    })
}

export default connect(mapStateToProps)(Date);