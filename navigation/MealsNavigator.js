import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CategoriesScreen from "../Screens/CategoriesScreen";
import CategoriesMealsScreen from "../Screens/CategoriesMealsScreen";
import MealDetailScreen from "../Screens/MealDetailScreen";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import Colors from "../Constants/Colors";
import FavouriteScreen from "../Screens/FavouriteScreen";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import {
  createDrawerNavigation,
  createDrawerNavigator,
} from "react-navigation-drawer";
import FilterScreen from "../Screens/FilterScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../Components/HeaderButton";

const defaultStackNavOptions = {
  mode: "modal",
  // initialRouteName:'MealDetail',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  },
};

const MealNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: (navData) => {
        return {
          headerTitle: "Meals Categories",
          headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                iconSize={28}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        };
      },
    },
    CategoriesMeals: { screen: CategoriesMealsScreen },
    MealDetail: MealDetailScreen,
  },
  defaultStackNavOptions
);

const FavNavigator = createStackNavigator(
  {
    Favourites: {
      screen: FavouriteScreen,
      navigationOptions: (navData) => {
        return {
          headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                iconSize={28}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
        };
      },
    },
    MealDetail: MealDetailScreen,
  },
  defaultStackNavOptions
);
const tabScreenConfig = {
  Meals: {
    screen: MealNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
  Favourites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColorLight: Colors.accent,
        shifting: true,
        barStyleLight: {
          backgroundColor: "white",
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accent,
          inactiveBackgroundColor: "#edeef7",
        },
      });
const FilterNavigator = createStackNavigator(
  {
    Filters: {
      screen: FilterScreen,
      navigationOptions: (navData) => {
        return {
          headerTitle: "Filter Meals",
          headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                iconSize={28}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Save"
                iconName="ios-save"
                iconSize={25}
                onPress={navData.navigation.getParam("save")}
              />
            </HeaderButtons>
          ),
        };
      },
    },
  },
  defaultStackNavOptions
);
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: { drawerLabel: "Meals" },
    },
    Filters: FilterNavigator,
  },
  {
    contentOptions: {
      activeTintColor: "white",
      activeBackgroundColor: Colors.accent,
    },
  }
);

export default createAppContainer(MainNavigator);
