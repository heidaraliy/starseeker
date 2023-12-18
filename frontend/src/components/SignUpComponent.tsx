import { useState } from 'react';
import SignUpInput from './inputs/SignUpInput';
import { Link } from 'react-router-dom';
import google_logo from '../assets/google_logo_original.svg';
import axios from 'axios';
import { validatePassword, validateEmail } from '../utils/signUpErrorHandling';

const SignUpComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignUpSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const [isEmailValid, emailError] = validateEmail(email);
    const [isPasswordValid, passwordError] = validatePassword(password);

    //pw confirmation
    const isConfirmPasswordValid = password === confirmPassword;
    const confirmPasswordError = isConfirmPasswordValid
      ? ''
      : 'Passwords do not match.';

    setEmailError(emailError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) return;

    try {
      const response = await axios.post('http://localhost:8080/sign_up', {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col mt-6">
      <div className="text-center py-8 border-2 border-neutral-400 rounded-sm bg-indigo-50 h-full w-[22rem] xl:w-[30rem]">
        <span className="drop-shadow-2xl text-3xl text-indigo-950 font-heebo">
          Sign Up
        </span>
        <SignUpInput
          label="Enter your email:"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <SignUpInput
          label="Enter your password:"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        <SignUpInput
          label="Confirm your password:"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
        />
        <div className="mx-12 pt-8">
          <button
            className="border-2 bg-indigo-600 border-indigo-800 rounded-sm w-full font-heebo text-base text-indigo-50 py-1"
            onClick={handleSignUpSubmit}
          >
            Create Account
          </button>
        </div>
        <div className="relative flex py-4 items-center px-4">
          <div className="flex-grow border-t border-neutral-400"></div>
          <span className="flex-shrink mx-2 text-neutral-600 font-heebo font-light">
            Or, sign up with
          </span>
          <div className="flex-grow border-t border-neutral-400"></div>
        </div>
        <div>
          <div className="mx-12">
            <button className="p-1 border-2 bg-neutral-50 hover:bg-neutral-100 border-neutral-400 rounded-sm w-full font-heebo text-base text-neutral-600">
              <img
                src={google_logo}
                className="w-5 absolute right-1/2 mr-8 mt-0.5"
              />
              Google
            </button>
          </div>
        </div>
      </div>
      <span className="drop-shadow-2xl text-sm font-light text-neutral-50 font-heebo text-center my-3">
        <Link to="/sign_in">
          Already have an account?{' '}
          <strong className="hover:underline-offset-4 hover:underline">
            Sign in here.
          </strong>
        </Link>
      </span>
      <span className="drop-shadow-2xl text-sm font-light text-neutral-50 font-heebo text-center -mt-2">
        <Link to="/documentation">
          New to Starseeker?{' '}
          <strong className="hover:underline-offset-4 hover:underline">
            Learn more.
          </strong>
        </Link>
      </span>
    </div>
  );
};

export default SignUpComponent;
