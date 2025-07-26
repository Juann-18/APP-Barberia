import React, { useState } from 'react';
import { SegmentedButtons } from '../components/SegmentedButtons';
import { FormUser  } from '../components/FormUser';
import { FormBarber } from '../components/FormBarber';


export const SignUp: React.FC = () => {
    
  const [segmented, setSegmented] = useState<string>("user");

  const handleSegmentedChange = (value: string) => {
    setSegmented(value);
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
        <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Sign up</h2>
        <SegmentedButtons 
          segmented={segmented}
          onSegmentedChange={handleSegmentedChange}
        />
        <div>
          {segmented === 'user' && (
            <FormUser/>
          )}
        </div>
        <div>
          {segmented === 'barber' && (
            <FormBarber/>
          )}
        </div>
        
        <p className="text-[#60758a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">By signing up, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};
