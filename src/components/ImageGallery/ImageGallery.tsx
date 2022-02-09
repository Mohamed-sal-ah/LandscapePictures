import React, { useEffect, useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import * as STYLED from "./styled";
import ImageItem from "./ImageItem";
import useConnect from "../../hooks/useConnect";
import { ScaledSize, useWindowDimensions } from "react-native";

type Props = {
  onDeleteImage: (oneImage: any) => void;
  setOnAuth: boolean;
  onNavigateUser: (userId: string, name: string) => void;
  openImageModal: (oneImageData: any) => void;
  imagesArray: any;
};

const ImageGallery = ({
  imagesArray,
  setOnAuth,
  onDeleteImage,
  onNavigateUser,
  openImageModal,
}: Partial<Props>) => {
  const { users } = useConnect((state) => state.data);
  const dimensions: ScaledSize = useWindowDimensions();
  const [onResize, setOnResize] = useState<boolean>(false);
  const timeRef: any = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      clearTimeout(timeRef.current);
      setOnResize(true);
      timeRef.current = setTimeout(() => setOnResize(false), 500);
    };

    window.addEventListener("resize", () => handleResize());

    return () => window.removeEventListener("resize", () => handleResize());
  });
  return (
    <STYLED.ImagesList
      style={{
        paddingRight: dimensions.width > 650 ? 10 : 0,
        paddingLeft: dimensions.width > 650 ? 10 : 0,
      }}
    >
      {onResize ? (
        <></>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 650: 2, 900: 3 }}>
          <Masonry columnsCount={3} gutter="10px">
            {imagesArray.map((oneImage: any, index: number) => (
              <ImageItem
                openImageModal={openImageModal}
                oneImage={oneImage}
                setOnAuth={setOnAuth}
                onDeleteImage={onDeleteImage}
                onNavigateUser={onNavigateUser}
                users={users}
                key={index}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </STYLED.ImagesList>
  );
};

export default ImageGallery;
