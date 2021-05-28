import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import CustomHeaderButtons from "../Components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "../store/actions/meals";

const MealDetailScreen = (props) => {
  const selectedMeal = props.navigation.getParam("selectedMeal");
  const isFavouriteMeal = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === selectedMeal.id)
  );
  const dispatch = useDispatch();
  const toggleFavouriteHandler = () => {
    dispatch(toggleFavourite(selectedMeal.id));
  };

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavouriteHandler });
  }, [selectedMeal]);

  useEffect(() => {
    props.navigation.setParams({ isFav: isFavouriteMeal });
  }, [isFavouriteMeal]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
        <Text>{selectedMeal.duration}m</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map((ing) => (
          <View style={styles.listItem} key={ing}>
            <Text>{ing}</Text>
          </View>
        ))}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map((step) => (
          <View style={styles.listItem} key={step}>
            <Text>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const selectedMeal = navigationData.navigation.getParam("selectedMeal");
  const toggleFavourite = navigationData.navigation.getParam("toggleFav");
  const isFav = navigationData.navigation.getParam("isFav");
  return {
    headerTitle: selectedMeal.title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item
          title="Fav"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          iconSize={26}
          onPress={toggleFavourite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mealRow: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "700",
  },
  detailContainer: {
    padding: 10,
  },
  listItem: {
    marginVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default MealDetailScreen;
