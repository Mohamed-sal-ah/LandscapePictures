import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../navigation/routes";
import { ScaledSize, useWindowDimensions, View } from "react-native";
import useConnect from "../../hooks/useConnect";
import NavigationBar from "../../components/NavigationBar";
import ImageGallery from "../../components/ImageGallery";
import theme from "../../themes";
import Modal from "react-modal";
import ImageModal from "../../components/ImageModal";
import { UserSvg } from "../../assets";
import * as STYLED from "./styled";

const UserScreen = ({ route }: any) => {
  const dimensions: ScaledSize = useWindowDimensions();
  const navigation = useNavigation();
  const { images, users } = useConnect((state) => state.data);
  const [userPage, setUserPage]: any = useState("");
  const [filtredImages, setFiltredImages]: any[] = useState([]);
  const [loading, setLoading] = useState(true);
  const [boolModal, setBoolModal] = useState(false);
  const [imageValues, setImageValues] = useState("");
  const openImageModal = (oneImageData: any) => {
    setBoolModal(true);
    setImageValues(oneImageData);
  };
  const closeImageModal = () => {
    setImageValues("");
    setBoolModal(false);
  };
  const onNavigateUser = (userId: any, name: any) => {
    setBoolModal(false);
    navigation.navigate(screenName.USER, {
      user: userId,
      username: name,
    });
  };

  useEffect(() => {
    if (route.params) {
      const userFilter = Object.keys(users).filter(
        (item: any) => item === route.params.user
      );
      const imageFilter = images.filter(
        (image: any) => image.user_id === userFilter[0]
      );
      setUserPage(users[userFilter[0]]);
      setFiltredImages(imageFilter);
      setLoading(false);
    } else {
      navigation.navigate(screenName.HOME);
    }
  }, [route.params]);
  return (
    <STYLED.FullPage>
      <NavigationBar />
      {!loading && (
        <STYLED.FullUserView>
          <STYLED.UserInfoView
            style={{
              flexDirection: dimensions.width > 650 ? "row" : "column",
            }}
          >
            {userPage.profilePicture ? (
              <View>
                <STYLED.ProfilePicture
                  source={{
                    uri: userPage.profilePictureFile
                      ? userPage.profilePictureFile
                      : require(`../../storage/profileImage/${userPage.profilePicture}`),
                  }}
                />
              </View>
            ) : (
              <STYLED.DefaultProfilePictureView>
                <UserSvg size={50} fillColor={theme.colors.white} />
              </STYLED.DefaultProfilePictureView>
            )}
            <STYLED.UserInfoTextView
              style={{
                maxWidth: dimensions.width > 650 ? 200 : "fit-content",
                alignItems: dimensions.width > 650 ? "flex-start" : "center",
                paddingLeft: dimensions.width > 650 ? 20 : 0,
              }}
            >
              <STYLED.UserTitle>{userPage.username}</STYLED.UserTitle>
              <STYLED.UserText
                style={{ textAlign: dimensions.width > 650 ? "left" : "center" }}
              >
                {userPage.user_info}
              </STYLED.UserText>
            </STYLED.UserInfoTextView>
          </STYLED.UserInfoView>
          <Modal
            isOpen={boolModal}
            onRequestClose={() => setBoolModal(false)}
            style={{
              content: {
                top: dimensions.width > 650 ? "50%" : "0",
                left: dimensions.width > 650 ? "50%" : "0",
                right: "auto",
                bottom: "auto",
                marginRight: dimensions.width > 650 ? "-50%" : "0",
                transform:
                  dimensions.width > 650 ? "translate(-50%, -50%)" : "none",
                width: dimensions.width > 650 ? "fit-content" : "100%",
                height: dimensions.width > 650 ? "fit-content" : "100%",
                padding: 0,
                borderRadius: dimensions.width > 650 ? 4 : 0,
                display: "flex",
                alignItems: "center",
              },
              overlay: {
                backgroundColor: theme.colors.gradient.regular,
              },
            }}
            ariaHideApp={false}
            contentLabel="Example Modal"
          >
            <ImageModal
              imageData={imageValues}
              onNavigateUser={onNavigateUser}
              closeImageModal={closeImageModal}
            />
          </Modal>
          <ImageGallery
            onNavigateUser={onNavigateUser}
            openImageModal={openImageModal}
            imagesArray={filtredImages}
            setOnAuth={false}
          />
        </STYLED.FullUserView>
      )}
    </STYLED.FullPage>
  );
};

export default UserScreen;
