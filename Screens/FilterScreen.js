import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import Colors from "../Constants/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";

const FilterScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFee, setIsLactoseFee] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVeg, setIsVeg] = useState(false);
  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFee,
      vegan: isVegan,
      vegeterian: isVeg,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFee, isVegan, isVeg]);

  useEffect(() => {
    props.navigation.setParams({ save: saveFilters });
  }, [saveFilters]);
  const FilterView = (props) => {
    return (
      <View style={styles.filterContainer}>
        <Text>{props.label}</Text>
        <Switch
          value={props.filterState}
          onValueChange={(newValue) => props.setFilterState(newValue)}
          trackColor={{ true: Colors.primary, false: "#ccc" }}
          thumbColor={Colors.primary}
        />
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restriction</Text>
      <FilterView
        label="Gluten-free"
        filterState={isGlutenFree}
        setFilterState={setIsGlutenFree}
      />
      <FilterView
        label="Lactose-free"
        filterState={isLactoseFee}
        setFilterState={setIsLactoseFee}
      />
      <FilterView
        label="Vegan"
        filterState={isVegan}
        setFilterState={setIsVegan}
      />
      <FilterView
        label="Vegeterian"
        filterState={isVeg}
        setFilterState={setIsVeg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontWeight: "700",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
});

export default FilterScreen;
