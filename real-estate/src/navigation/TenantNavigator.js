import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import TenantDashboardScreen from '../screens/tenant/TenantDashboardScreen';
import MyLeaseScreen from '../screens/tenant/MyLeaseScreen';
import PayRentScreen from '../screens/tenant/PayRentScreen';
import MyInvoicesScreen from '../screens/tenant/MyInvoicesScreen';
import RaiseComplaintScreen from '../screens/tenant/RaiseComplaintScreen';

const Tab = createBottomTabNavigator();

const TenantNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.tabInactive,
      tabBarStyle: {
        backgroundColor: colors.primary,
        borderTopWidth: 0,
        height: 65,
        paddingBottom: 10,
        paddingTop: 5,
        elevation: 20,
      },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          Home: focused ? 'home' : 'home-outline',
          'My Lease': focused ? 'document-text' : 'document-text-outline',
          'Pay Rent': focused ? 'wallet' : 'wallet-outline',
          Invoices: focused ? 'receipt' : 'receipt-outline',
          Complaint: focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={TenantDashboardScreen} />
    <Tab.Screen name="My Lease" component={MyLeaseScreen} />
    <Tab.Screen name="Pay Rent" component={PayRentScreen} />
    <Tab.Screen name="Invoices" component={MyInvoicesScreen} />
    <Tab.Screen name="Complaint" component={RaiseComplaintScreen} />
  </Tab.Navigator>
);

export default TenantNavigator;
