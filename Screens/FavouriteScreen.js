import React from "react";
import {useSelector} from 'react-redux'
import { View, Text, StyleSheet } from "react-native";
import MealList from '../Components/MealList'

const FavouriteScreen = (props) => {
    const favMeals=useSelector(state=>state.meals.favoriteMeals)
    if(!favMeals || !favMeals.length ){
      return (
        <View style={styles.screen}>
          <Text>No Favourite Meals Found. Start adding some! </Text>
        </View>
      )
    }
  return (
    <MealList displayedMeals={favMeals} navigation={props.navigation}/>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

FavouriteScreen.navigationOptions = {
  headerTitle: "Your Favourites!",
};

export default FavouriteScreen;
