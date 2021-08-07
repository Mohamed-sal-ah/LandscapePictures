import React from "react";
import { TouchableOpacity } from "react-native";
import * as STYLED from "./styled";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenName, screenName } from "../../../navigation/routes";

const NavigationModal = ({ setBoolModal }: any) => {
  const navigation = useNavigation();
  return (
    <STYLED.FullNavigationModal>
      <TouchableOpacity
        onPress={() => {
          setBoolModal(false);
          navigation.navigate(screenName.EXPLORE);
        }}
      >
        <STYLED.LinksText>Explore</STYLED.LinksText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setBoolModal(false);
          navigation.navigate(screenName.ABOUT);
        }}
      >
        <STYLED.LinksText>About us</STYLED.LinksText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setBoolModal(false);
          navigation.navigate(screenName.LOGIN_STACK, {
            screen: LoginScreenName.SIGN_IN,
          });
        }}
      >
        <STYLED.LinksText>Sign in</STYLED.LinksText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setBoolModal(false);
          navigation.navigate(screenName.LOGIN_STACK, {
            screen: LoginScreenName.SIGN_UP,
          });
        }}
      >
        <STYLED.LinksText>Join us</STYLED.LinksText>
      </TouchableOpacity>
    </STYLED.FullNavigationModal>
  );
};

export default NavigationModal;
