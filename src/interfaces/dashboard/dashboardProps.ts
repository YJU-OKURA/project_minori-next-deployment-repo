interface DashboardProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  tabs: string[];
}

export default DashboardProps;
