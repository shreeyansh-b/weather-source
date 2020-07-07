import React, {useState} from 'react';
import { AppBar, Toolbar, Typography, InputBase, Grid, ButtonGroup, Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import * as actionCreators from '../../store/actionCreators';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      textAlign: 'left',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      [theme.breakpoints.down('md')]: {
        width: '55%',
      },
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `${theme.spacing(4)}px`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '30ch',
        '&:focus': {
          width: '35ch',
        },
      },
    },
    whiteColor: {
      color: '#ffffff'
    },
}));


// at line IconButton onClick should have a function and not a direct console.log statement. @https://stackoverflow.com/questions/40167287/react-material-ui-how-do-i-know-i-can-use-onclick-for-button <-- last answer
// @https://reactjs.org/docs/handling-events.html
const Navigation = (props) => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState('');
    const [firstClick, setFirstClick] = useState(0);
    
    const onKeyEnter = (e) => {
      if(e.key === 'Enter'){
        props.onSearch(searchInput)
      }
    }

    const getPosition = async (e) => {
      if(firstClick === 0 || e.target.ariaLabel !== 'search'){
        await navigator.geolocation.getCurrentPosition(
          (currentPosition) => {
            props.onLocation(currentPosition.coords.latitude, currentPosition.coords.longitude);
          }
        )
        setFirstClick(
          firstClick + 1
        );
      }

    }
    const degree = "°";
    return(
        <AppBar position="static"  elevation={0} color="transparent">
            <Toolbar>
                <Grid container>
                    <Grid container item sm={4}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            WeatherApp
                        </Typography>
                    </Grid>
                    <Grid container item sm={5}>
                        <div className={classes.search}>
                            <InputBase
                            placeholder="Search…"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyPress={ (e) => onKeyEnter(e)}
                            onClick={ getPosition }
                            />
                          <label htmlFor="icon-button-location">
                            <IconButton className={classes.whiteColor} aria-label="location" component="span" onClick={(e) => getPosition(e) } >  
                                <MyLocationIcon />
                            </IconButton>
                          </label>
                          <label htmlFor="icon-button-search">
                            <IconButton className={classes.whiteColor} aria-label="search" component="span" onClick={ () => props.onSearch(searchInput)  } >  
                                <SearchIcon />
                            </IconButton>
                        </label>
                        </div>
                    </Grid>
                    <Grid container item sm={3}  justify='flex-end'>
                      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" >
                        <Button onClick={() => props.onUnitChange(true)}>{degree}C</Button>
                        <Button onClick={() => props.onUnitChange(false)}>{degree}K</Button>
                      </ButtonGroup>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state) => {
  return(null)
}

const mapDispatchToProps = (dispatch) => {  
  return{
      onSearch: (searchInput) => dispatch(actionCreators.getCoord(searchInput)),
      onLocation: (lat, lon) => dispatch(actionCreators.getCity(lat, lon)),
      onUnitChange: (value) => dispatch({type: actionTypes.UNITS_CHANGE, value: value})
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(Navigation);