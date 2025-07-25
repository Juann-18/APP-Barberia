import React  from 'react';
import { useState } from 'react';
import { SegmentedButtons } from '../components/SegmentedButtons';
import { FormInput } from '../components/FormInput';
import type { User } from '../services/interface' 

export const SignUp: React.FC = () => {

  const [user, setUser] = useState<User>({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    faults: 0,
    status: true
  });
  const [segmented, setSegmented] = useState<string>("user");

  const hanledSegmentedChange = (value: string) => {
    setSegmented(value);
  }

  console.log(user);
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
        <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Sign up</h2>
        <SegmentedButtons 
        segmented={segmented}
        onSegmentedChange={hanledSegmentedChange}
        />
        {segmented === 'user' && (
        <div>
          <FormInput 
          id='name'
          type='text'
          value={user.name}
          setValue={(value: string) => setUser({ ...user, name: value })}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="First name" />

          <FormInput
            placeholder="Last name"
            value={user.lastName || ''}
            setValue={(value: string) => setUser({ ...user, lastName: value })}
          />
          <FormInput
            type='email'
            placeholder="Email"
            value={user.email || ''}
            setValue={(value: string) => setUser({ ...user, email: value })}
          />
          <FormInput
            placeholder="Password"
            value={user.password || ''}
            setValue={(value: string) => setUser({ ...user, password: value })}
          />
          <FormInput
            placeholder="Phone number"
            value={user.phone || ''}
            setValue={(value: string) => setUser({ ...user, phone: value })}
          />
        </div>
      )}
        <div className="flex px-4 py-3">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Sign up</span>
          </button>
        </div>
        <p className="text-[#60758a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">By signing up, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};




