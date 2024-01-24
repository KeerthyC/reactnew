import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import UserPremsg from '../UserPremsg';
import UserTest from '../UserTest';
import UserPostmsg from '../UserPostmsg';



const VerticalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Page 1', 'Page 2', 'Page 3'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <PageOne />;
      case 1:
        return <PageTwo />;
      case 2:
        return <PageThree />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box display="flex" flexDirection="row" p={1}>
      <Box flexGrow={1} maxWidth="250px" style={{border:'1px solid #ccc'}}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Box flexGrow={3} pl={2} style={{border:'1px solid #ccc'}}>
        <div>{getStepContent(activeStep)}</div>
        <div>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Box>
    </Box>
  );
};

const PageOne = () => <UserPremsg />;
const PageTwo = () => <UserTest/>;
const PageThree = () => <UserPostmsg/>;

export default VerticalStepper;
