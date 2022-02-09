import React, { useContext, useState, FC } from "react";
import NavigationBar from "../../components/NavigationBar";
import * as STYLED from "./styled";
import SearchBar from "../../components/SearchBar";
import CategorySelect from "../../components/CategorySelect";
import { DatabaseContext } from "../../firebase";
import ImageGallery from "../../components/ImageGallery";
import Modal from "react-modal";
import theme from "../../themes";
import ImageModal from "../../components/ImageModal";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../navigation/routes";
import { ScaledSize, useWindowDimensions } from "react-native";

const HomeScreen: FC = () => {
  const dimensions: ScaledSize = useWindowDimensions();
  const data = useContext(DatabaseContext);
  const { curentData }: any = data;
  const { images } = curentData;
  const firstImage = images[0];
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
  const navigation = useNavigation();
  const onNavigateUser = (userId: string, name: string) => {
    setBoolModal(false);
    navigation.navigate(screenName.USER, {
      user: userId,
      username: name,
    });
  };

  return (
    <STYLED.FullPage>
      <NavigationBar showSearchBar={false} />
      <STYLED.FullImageView>
        <STYLED.HomePageImage
          accessibilityLabel={
            firstImage.hasOwnProperty("alt")
              ? firstImage.alt
              : `Photo by ${firstImage.username}`
          }
          source={{
            uri: firstImage.hasOwnProperty("fileUrl")
              ? firstImage.fileUrl
              : require(`../../storage/images/${firstImage.fileName}`),
          }}
        />
        <STYLED.CenterPositionView
          style={{
            justifyContent: dimensions.width > 650 ? "center" : "flex-end",
          }}
        >
          <STYLED.BackgroundView
            style={{
              borderRadius: dimensions.width > 650 ? 15 : 0,
              alignItems: dimensions.width > 650 ? "flex-start" : "center",
              width: dimensions.width > 650 ? "fit-content" : "100%",
              padding: dimensions.width > 650 ? 30 : 10,
            }}
          >
            <STYLED.BackgroundTitle
              style={{ fontSize: dimensions.width > 650 ? 36 : 30 }}
            >
              Landscape Pictures
            </STYLED.BackgroundTitle>
            <STYLED.BackgroundText
              style={{ 
                fontSize: dimensions.width > 650 ? 15 : 12,
                paddingBottom: dimensions.width > 650 ? 10 : 0,
              }}
            >
              This is where you can find beautiful photos of nature
            </STYLED.BackgroundText>
            {dimensions.width > 650 && <SearchBar widthStyle={"100%"} />}
          </STYLED.BackgroundView>
        </STYLED.CenterPositionView>
        <STYLED.BackgroundImageInfo
          style={{ display: dimensions.width > 650 ? "flex" : "none" }}
        >
          <STYLED.BackgroundText>
            Picture taken by {firstImage.username}
          </STYLED.BackgroundText>
          <STYLED.BackgroundText>{firstImage.location}</STYLED.BackgroundText>
        </STYLED.BackgroundImageInfo>
      </STYLED.FullImageView>
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
            transform: dimensions.width > 650 ? "translate(-50%, -50%)" : "none",
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
      <CategorySelect />
      <ImageGallery
        openImageModal={openImageModal}
        imagesArray={images}
        setOnAuth={false}
        onNavigateUser={onNavigateUser}
      />
    </STYLED.FullPage>
  );
};

export default HomeScreen;
