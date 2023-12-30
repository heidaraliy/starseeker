import React from 'react';
import Logo from '../../assets/starseeker_color.png';
import ParticleSystem from '../components/Particle';
import SignInComponent from './SignInComponent';

const SignInPage = () => {
  return (
    <div className="flex flex-col">
      <div className="matrix animate-fade-in-flat">
        <ParticleSystem />
      </div>
      <div className=" min-h-screen">
        <div className="animate-fade-in-left">
          <div className="flex flex-col justify-center items-center">
            <img src={Logo} className="w-56 lg:w-72 mt-36" />
            <SignInComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
