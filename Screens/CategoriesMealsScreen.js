import React from "react";
import MealList from "../Components/MealList";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const CategoriesMealsScreen = (props) => {
  const selectedCategory = props.navigation.getParam("category");
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(selectedCategory.id) >= 0
  );
  if (!displayedMeals.length) {
    return (
      <View style={styles.screen}>
        <Text>No meals found. Please check your filter</Text>
      </View>
    );
  }

  return (
    <MealList displayedMeals={displayedMeals} navigation={props.navigation} />
  );
};

CategoriesMealsScreen.navigationOptions = (navigationData) => {
  const selectedCategory = navigationData.navigation.getParam("category");
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesMealsScreen;
