import React, {useState, useContext} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonalSettings from './PersonalSettings';
import PetSettings from './PetSettings';
import AdditionalInfo from './AdditionalInfo';
import { Container } from '@mui/material';
import { getToken } from '../../common/utils';
import { PreferencesProvider } from '../../contexts/PreferencesContext';
import { userUpdate } from '../../common/serverApi'; 
const steps = ['Personal settings', 'Pet settings', 'Additional info'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const token = getToken();
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    if(completedSteps() === totalSteps()){
     localStorage.setItem('doneWizard' , 'true');
     window.location.reload();
    }
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalSettings handleComplete={handleComplete}/> 
      case 1:
        return <PetSettings handleComplete={handleComplete}/>;
      case 2:
        return <AdditionalInfo handleComplete={handleComplete}/>;
      default:
        return "Unknown step";
    }
  }
  return (
    <PreferencesProvider>
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Container>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1}}> {getStepContent(activeStep)}</Typography>
            <Button onClick={handleBack} disabled={activeStep === 0}>Back</Button>
          </React.Fragment>
        )}
      </Container>
    </Box>
    </PreferencesProvider>
  );
}
