import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import DashboardScreen from '../screens/manager/DashboardScreen';
import PropertiesScreen from '../screens/manager/PropertiesScreen';
import PropertyDetailScreen from '../screens/manager/PropertyDetailScreen';
import AddEditPropertyScreen from '../screens/manager/AddEditPropertyScreen';
import TenantsScreen from '../screens/manager/TenantsScreen';
import TenantDetailScreen from '../screens/manager/TenantDetailScreen';
import AddEditTenantScreen from '../screens/manager/AddEditTenantScreen';
import PaymentsScreen from '../screens/manager/PaymentsScreen';
import ComplaintsScreen from '../screens/manager/ComplaintsScreen';
import BroadcastScreen from '../screens/manager/BroadcastScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PropertiesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PropertiesList" component={PropertiesScreen} />
    <Stack.Screen name="PropertyDetail" component={PropertyDetailScreen} />
    <Stack.Screen name="AddEditProperty" component={AddEditPropertyScreen} />
  </Stack.Navigator>
);

const TenantsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TenantsList" component={TenantsScreen} />
    <Stack.Screen name="TenantDetail" component={TenantDetailScreen} />
    <Stack.Screen name="AddEditTenant" component={AddEditTenantScreen} />
  </Stack.Navigator>
);

const ManagerNavigator = () => (
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
        shadowColor: colors.primary,
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          Dashboard: focused ? 'grid' : 'grid-outline',
          Properties: focused ? 'business' : 'business-outline',
          Tenants: focused ? 'people' : 'people-outline',
          Payments: focused ? 'cash' : 'cash-outline',
          Complaints: focused ? 'alert-circle' : 'alert-circle-outline',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Properties" component={PropertiesStack} />
    <Tab.Screen name="Tenants" component={TenantsStack} />
    <Tab.Screen name="Payments" component={PaymentsScreen} />
    <Tab.Screen name="Complaints" component={ComplaintsScreen} />
  </Tab.Navigator>
);

export default ManagerNavigator;
