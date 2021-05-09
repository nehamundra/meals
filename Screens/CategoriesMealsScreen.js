import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import {CATEGORIES,MEALS } from "../data/dummy-data"
import MealItem from '../Components/MealItem'

const CategoriesMealsScreen = (props) => {
  const selectedCategory= props.navigation.getParam('category')
  const displayedMeals=MEALS.filter(meal=>meal.categoryIds.indexOf(selectedCategory.id)>=0)
  const renderItem=itemData=>{
    return <MealItem item={itemData.item} onSelectMeal={()=>{
      props.navigation.navigate({routeName: 'MealDetail', params:{
        mealId: itemData.item.id
      }})
    }}/>
  }
  return (
    <View style={styles.screen}>
      <FlatList style={{width:'100%'}} data={displayedMeals} keyExtractor={(item,index)=>item.id} renderItem={renderItem}/>
    </View>
  );
};

CategoriesMealsScreen.navigationOptions=navigationData=>{
  const selectedCategory=navigationData.navigation.getParam('category')
  return {
    headerTitle:selectedCategory.title
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesMealsScreen;
