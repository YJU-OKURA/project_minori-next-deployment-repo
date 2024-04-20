'use client';

import React from 'react';
import {RecoilRoot} from 'recoil';
import RecoilRootContainerProps from '../interfaces/recoilRootContainerProps';

const RecoilRootContainer = function ({children}: RecoilRootContainerProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootContainer;
