import React, { ReactElement, ReactNode, useState } from 'react';

interface IUseMultiStep {
  defaultStep: number;
  totalSteps: number;
}
export const useMultiStep = ({
  defaultStep = 1,
  totalSteps = 1,
}: IUseMultiStep) => {
  const [currentIndex, setCurrentIndex] = useState(defaultStep);

  const next = () => {
    if (currentIndex < totalSteps) {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const previous = () => {
    if (currentIndex > 1) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const reset = () => {
    setCurrentIndex(defaultStep);
  };
  return { currentStep: currentIndex, next, previous, reset };
};

interface IStep {
  step: number;
  children?: ReactNode;
  className?: string;
}
const Step = ({ children, step, className }: IStep) => {
  return (
    <div className={className} data-step={step}>
      {children}
    </div>
  );
};

interface IRoot {
  currentStep: number;
  children?: ReactNode;
}
const Root = ({ children, currentStep }: IRoot) => {
  return (
    <>
      {React.Children.map(children as ReactElement[], (child) => {
        if (child?.props?.step === currentStep) {
          return child;
        }
        return null;
      })}
    </>
  );
};

const MultiStep = {
  Root,
  Step,
};

export default MultiStep;
