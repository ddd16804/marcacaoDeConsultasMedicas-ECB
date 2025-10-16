import React from 'react';
import { Icon } from 'react-native-elements';
import { TabType } from '../../hooks/useAdminDashboard';
import {
  Container,
  TabButton,
  TabIcon,
  TabText
} from './styles';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { 
    id: 'appointments' as TabType, 
    label: 'Consultas', 
    icon: 'calendar-today' 
  },
  { 
    id: 'users' as TabType, 
    label: 'Usuários', 
    icon: 'people' 
  }
];

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => (
  <Container>
    {tabs.map(tab => (
      <TabButton 
        key={tab.id}
        active={activeTab === tab.id}
        onPress={() => onTabChange(tab.id)}
      >
        <TabIcon active={activeTab === tab.id}>
          <Icon 
            name={tab.icon} 
            size={20} 
            color={activeTab === tab.id ? '#fff' : theme.colors.text}
          />
        </TabIcon>
        <TabText active={activeTab === tab.id}>
          {tab.label}
        </TabText>
      </TabButton>
    ))}
  </Container>
);

export default TabNavigation;