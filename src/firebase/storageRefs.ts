import { storage } from "./firebase";

export const imagesStorage = () => storage.ref("images/");
export const profilePictures = () => storage.ref("profilePicture/");