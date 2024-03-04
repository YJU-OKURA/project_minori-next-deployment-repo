import React from 'react';
import {TabsMappingProps} from '@/src/interfaces/dashboard';

const TabsMapping = ({activeTab, tabMapping}: TabsMappingProps) => {
  return <>{tabMapping[activeTab]}</>;
};

export default TabsMapping;
