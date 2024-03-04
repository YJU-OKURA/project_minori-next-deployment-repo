interface TabsMappingProps {
  activeTab: string;
  tabMapping: {
    [key: string]: JSX.Element;
  };
}

export default TabsMappingProps;
