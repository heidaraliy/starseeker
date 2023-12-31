import React from 'react';
import Logo from '../../assets/starseeker_color.png';
import ParticleSystem from '../components/Particle';
import SignUpComponent from './SignUpComponent';

const SignUpPage = () => {
  return (
    <div className="flex flex-col">
      <div className="matrix animate-fade-in-flat">
        <ParticleSystem />
      </div>
      <div className=" min-h-screen">
        <div className="animate-fade-in-left">
          <div className="flex flex-col justify-center items-center">
            <img src={Logo} className="w-56 lg:w-72 mt-36" />
            <SignUpComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
