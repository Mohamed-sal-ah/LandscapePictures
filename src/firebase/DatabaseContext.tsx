import React, { useContext, useState, useEffect } from "react";
import actions from "../redux/actions";
import { useDispatch } from "react-redux";
import useConnect from "../hooks/useConnect";
import JsonData from "../data/index.json";

export const DatabaseContext = React.createContext(null);

export const useDatabase = () => {
  return useContext(DatabaseContext);
};

export const DatabaseProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { images, users } = useConnect((state) => state.data);
  const [curentData, setCurrentData]: any = useState({
    images: null,
    users: null,
  });
  const fetchImages = (fullUsers: any) => {
    // Fetch images
    const setJson = {
      images: JsonData.images,
      users: JsonData.users,
    };
    setCurrentData({
      images: setJson.images,
      users: fullUsers,
    });
    dispatch(
      actions.database.fetchDatabase({
        images: setJson.images,
        users: fullUsers,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    // Fetch users
    const setJson = {
      users: JsonData.users,
    };
    let fullUsers: any;
    fetchImages(JsonData.users);
  }, []);

  const deleteImage = (filtredImages: any) => {
    // Delete image
    setCurrentData({
      images: filtredImages,
      users: curentData.users,
    });
    dispatch(actions.database.imageDeleted(filtredImages));
  };

  const updateInfo = (userInfo: any, user_id_key: any) => {
    // update user info
    dispatch(actions.auth.setUserStatus({ ...userInfo }));
    const allUsers = curentData.users;
    const restUsers = userInfo;
    delete restUsers.uid;
    for (let index = 0; index < Object.keys(allUsers).length; index++) {
      if (Object.keys(allUsers)[index] === user_id_key) {
        allUsers[Object.keys(allUsers)[index]] = {
          ...restUsers,
        };
      }
    }
    setCurrentData({
      images: curentData.images,
      users: allUsers,
    });
    dispatch(actions.database.updateUserInfo(allUsers));
  };
  const addNewUser = (newUser: any) => {
    // add new user
    const newObj = {
      ...curentData.users,
      ...newUser,
    };
    setCurrentData({
      images: curentData.images,
      users: newObj,
    });
    dispatch(actions.database.createUser(newUser));
  };

  const uploadImage = (data: any) => {
    // upload image
    const newImages = [...curentData.images, { ...data }];
    setCurrentData({
      images: newImages,
      users: curentData.users,
    });
    dispatch(actions.database.imageUpload(data));
  };

  const value: any = {
    curentData,
    updateInfo,
    uploadImage,
    addNewUser,
    deleteImage,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {!loading && children}
    </DatabaseContext.Provider>
  );
};
