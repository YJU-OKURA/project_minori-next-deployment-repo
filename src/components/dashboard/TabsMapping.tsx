import React from 'react';
import {TabsMappingProps} from '@/src/interfaces/group';

const TabsMapping = ({activeTab, tabMapping}: TabsMappingProps) => {
  return <>{tabMapping[activeTab]}</>;
};

export default TabsMapping;
