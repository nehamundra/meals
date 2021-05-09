import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CategoriesScreen from "../Screens/CategoriesScreen";
import CategoriesMealsScreen from "../Screens/CategoriesMealsScreen";
import MealDetailScreen from "../Screens/MealDetailScreen";
import { createAppContainer} from "react-navigation";
import { Platform } from "react-native";
import Colors from "../Constants/Colors";
import FavouriteScreen from '../Screens/FavouriteScreen'

const MealNavigator = createStackNavigator(
  {
    Categories: {screen:CategoriesScreen, navigationOptions:{
      headerTitle: "Meals Categories"
    }},
    CategoriesMeals: { screen: CategoriesMealsScreen },
    MealDetail: MealDetailScreen,
  },
  {
    mode:'modal',
    // initialRouteName:'MealDetail',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);
const Tab = createBottomTabNavigator();
const MealsFavTabNavigator=createBottomTabNavigator({
  Meals: MealNavigator,
  Favourites: FavouriteScreen
})

export default createAppContainer(MealsFavTabNavigator);
