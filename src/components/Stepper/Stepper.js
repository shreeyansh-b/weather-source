import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    background: '#fafafa2f',
    [theme.breakpoints.down('sm')]: {
      height: 12
  },
  },
}));

const Stepper = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if(props.isReset)
      prevActiveStep = 0; //else stepper jumps when search is updated
      return prevActiveStep + 1
    });
    props.onDateIncrement();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>{
      return prevActiveStep - 1
    } );
    props.onDateDecrement();
  };

  return (
    <MobileStepper
      variant="dots"
      steps={7}
      position="static"
      activeStep={props.isReset ? 0 : activeStep}
      className={classes.root}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={props.dataLoaded ? activeStep === 6 : activeStep === 0}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0 || props.isReset}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
  );
}

const mapStateToProps = (state) => {
  return({
    isReset: state.isReset,
    dataLoaded: state.dataLoaded
  })
}

const mapDispatchToProps = (dispatch) => {  
  return{
      onDateIncrement: () => dispatch({type: actionTypes.DATE_INCREMENT}),
      onDateDecrement: () => dispatch({type: actionTypes.DATE_DECREMENT})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stepper)