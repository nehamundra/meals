import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { Platform } from "react-native";
const CustomHeaderButtons = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      IconSize={23}
      color={
        Platform.OS === "android" && Platform.Version >= 21
          ? "white"
          : Colors.primary
      }
    />
  );
};

export default CustomHeaderButtons;
