import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import MealItem from './MealItem';

const MealList = (props) => {
  const renderItem=itemData=>{
    return <MealItem item={itemData.item} onSelectMeal={()=>{
      props.navigation.navigate({routeName: 'MealDetail', params:{
        selectedMeal: itemData.item
      }})
    }}/>
  }
  return (
    <View style={styles.screen}>
      <FlatList
        style={{ width: "100%" }}
        data={props.displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
