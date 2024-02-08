/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import MultiStep, { useMultiStep } from './multistep';
import './css/index.scss';

const textInputCss =
  'zener-p-2 zener-outline-none zener-border-none !zener-border-solid zener-border-gray-700 zener-border-2 zener-ring-gray-500 focus:zener-ring-2';

const btnCss =
  'zener-outline-none zener-bg-none zener-border-none !zener-border-solid zener-border-white zener-bg-black zener-p-2 zener-min-w-[100px] zener-text-white zener-ring-gray-500 focus:zener-ring-2';

const StepOne = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  return (
    <>
      <h2 className="zener-text-center zener-font-sans">Step 1</h2>
      <input
        placeholder="firstname"
        name="firstname"
        value={firstname}
        onChange={({ target }) => setFirstName(target.value)}
        required
        className={textInputCss}
      />
      <input
        placeholder="lastname"
        name="lastname"
        value={lastname}
        onChange={({ target }) => setLastName(target.value)}
        required
        className={textInputCss}
      />
      <input
        placeholder="email"
        type="email"
        name="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        required
        className={textInputCss}
      />
      <input
        placeholder="password"
        type="password"
        name="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        required
        className={textInputCss}
      />
      <input
        placeholder="re-password"
        type="password"
        name="re-password"
        value={repassword}
        onChange={({ target }) => setRepassword(target.value)}
        required
        className={textInputCss}
      />
    </>
  );
};

const StepTwo = () => {
  const [message, setMessage] = useState('');
  return (
    <>
      <h2 className="zener-text-center zener-font-sans zener-w-full">Step 2</h2>
      <textarea
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        required
        rows={7}
        className={`${textInputCss} zener-w-full`}
      />
    </>
  );
};

const StepThree = () => {
  const [check, setCheck] = useState(false);
  return (
    <>
      <h2 className="zener-text-center zener-font-sans zener-w-full">Step 3</h2>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <input
        type="checkbox"
        checked={check}
        onChange={({ target }) => setCheck(target.checked)}
      />
    </>
  );
};

const App = () => {
  const { reset, next, previous, currentStep } = useMultiStep({
    totalSteps: 3,
    defaultStep: 1,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    switch (currentStep) {
      case 1:
      case 2:
        next();
        break;
      case 3:
      default:
        alert('Thank you.');
        break;
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="zener-flex zener-flex-col zener-gap-4"
    >
      <MultiStep.Root currentStep={currentStep}>
        <MultiStep.Step
          step={1}
          className="zener-flex zener-flex-col zener-gap-2"
        >
          <StepOne />
        </MultiStep.Step>
        <MultiStep.Step step={2}>
          <StepTwo />
        </MultiStep.Step>
        <MultiStep.Step
          step={3}
          className="zener-flex zener-flex-col zener-gap-3 zener-items-start"
        >
          <StepThree />
        </MultiStep.Step>
      </MultiStep.Root>

      <div className="zener-flex zener-flex-row zener-items-center zener-gap-4">
        {currentStep > 1 && (
          <button onClick={previous} type="button" className={btnCss}>
            previous
          </button>
        )}
        <button className={btnCss}>next</button>
      </div>
    </form>
  );
};

const Basic = () => {
  const { next, previous, currentStep } = useMultiStep({
    totalSteps: 6,
    defaultStep: 1,
  });

  return (
    <div>
      <MultiStep.Root currentStep={currentStep}>
        <MultiStep.Step step={1}>Step 1</MultiStep.Step>
        <MultiStep.Step step={2}>Step 2</MultiStep.Step>
        <MultiStep.Step step={3}>Step 3</MultiStep.Step>
        <MultiStep.Step step={4}>Step 4</MultiStep.Step>
        <MultiStep.Step step={5}>Step 5</MultiStep.Step>
        <MultiStep.Step step={6}>Step 6</MultiStep.Step>
      </MultiStep.Root>
      <div>
        <button onClick={previous}>previous</button>
        <button onClick={next}>next</button>
      </div>
    </div>
  );
};
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '50%',
      }}
    >
      <App />
      <Basic />
    </div>
  </div>
);
