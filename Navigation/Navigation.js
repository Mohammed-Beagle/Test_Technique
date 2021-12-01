// Navigation/Navigation.js

import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Search from "../Components/Search";
import Favorites from "../Components/Favorites";

// we can use Stack Navigator to navigate inside each tab Navigator between components
// like this 2 Stack Navigator but here we don't need to do so because wa have just  2
// components one for each tab screen ... :

/* const Stack = createStackNavigator();

function SearchStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My contacts" component={Search} />
      <Stack.Screen name="Contact Detail" component={ContactDetail} />
    </Stack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite Contacts" component={Favorites} />
      <Stack.Screen name="Contact Detail" component={ContactDetail} />
    </Stack.Navigator>
  );
} */

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarActiveBackgroundColor: "#DDDDDD",
          tabBarInactiveBackgroundColor: "#FFFFFF",
          tabBarShowLabel: true,
        }}
      >
        <Tab.Screen
          name="My Contacts"
          component={Search}
          options={{
            tabBarIcon: () => {
              return (
                <Image
                  source={require("../Images/search.png")}
                  style={styles.icon}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="My Favorite Contacts"
          component={Favorites}
          options={{
            tabBarIcon: () => {
              return (
                <Image
                  source={require("../Images/plein.png")}
                  style={styles.icon}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default App;
