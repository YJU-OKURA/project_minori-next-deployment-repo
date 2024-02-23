import {TabsMappingProps} from '@/src/interfaces/group';
import React from 'react';

const TabsMapping = ({activeTab, tabMapping}: TabsMappingProps) => {
  return <>{tabMapping[activeTab]}</>;
};

export default TabsMapping;
