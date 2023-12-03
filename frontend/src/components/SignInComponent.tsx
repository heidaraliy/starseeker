import React from 'react';
import SignUpInput from './inputs/SignUpInput';
import { Link } from 'react-router-dom';
import google_logo from '../assets/google_logo_original.svg';

const SignInComponent = () => {
  return (
    <div className="flex flex-col mt-6">
      <div className="text-center py-8 border-2 border-neutral-400 rounded-sm bg-indigo-50 h-full w-[22rem] xl:w-[30rem]">
        <span className="drop-shadow-2xl text-3xl text-indigo-950 font-heebo">
          Sign In
        </span>
        <SignUpInput label="Enter your email:" type="email" name="email" />
        <SignUpInput
          label="Enter your password:"
          type="password"
          name="password"
        />
        <div className="mx-12 pt-8">
          <button className="border-2 bg-indigo-600 border-indigo-800 rounded-sm w-full font-heebo text-base text-indigo-50 py-1">
            Sign In
          </button>
        </div>
        <div className="relative flex py-4 items-center px-4">
          <div className="flex-grow border-t border-neutral-400"></div>
          <span className="flex-shrink mx-2 text-neutral-400 font-heebo font-light">
            Or, sign in with
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
          <div className="mx-12 pt-1">
            <button className="p-1 border-2 bg-neutral-50 hover:bg-neutral-100 border-neutral-400 rounded-sm w-full font-heebo text-base text-neutral-600">
              <span className="material-symbols-outlined absolute right-1/2 mr-14 rotate-45">
                key
              </span>
              Single Sign-On
            </button>
          </div>
        </div>
      </div>
      <span className="drop-shadow-2xl text-sm font-light text-neutral-50 font-heebo text-center my-3">
        <Link to="/sign_up">
          Don't have an account?{' '}
          <strong className="hover:underline-offset-4 hover:underline">
            Sign up here.
          </strong>
        </Link>
      </span>
    </div>
  );
};

export default SignInComponent;
