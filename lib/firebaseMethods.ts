import { uuidv4 } from "@firebase/util";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
} from "firebase/storage";
import router from "next/router";

// import { HouseI } from "../types/house.interface";
// import { databaseRef, db, storage } from "@/config/firebase.config";

// const getData = async () => {
//   try {
//     const response = await getDocs(databaseRef);

//     const houses = response.docs.map((data) => {
//       const houseList = data.data();
//       const identificator = data.id;

//       return { collectionId: identificator, ...houseList } as HouseI;
//     });

//     const sortedHouses = houses.sort((a, b) => {
//       return b.createdAt - a.createdAt;
//     });

//     return sortedHouses;
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };

// const deleteData = async (collectionId: string) => {
//   try {
//     await deleteDoc(doc(db, "houses", collectionId));
//     alert("Your offer is deleted");
//     router.push("/profile");
//   } catch (err) {
//     console.log(err);
//   }
// };

// const uploadPhotoToStorage = async (photo: any) => {
//   if (photo.length === 0) return;

//   const photoSource = `images/${photo.name + uuidv4()}`;

//   const imageRef = ref(storage, photoSource);

//   await uploadBytes(imageRef, photo);

//   return imageRef;
// };

// const getUrlFromImageRef = async (imageRef: StorageReference) => {
//   const url = await getDownloadURL(imageRef);

//   return url;
// };

// const uploadPhotoAndGetLink = async (photo: any) => {
//   let url = "";

//   const imageRef = await uploadPhotoToStorage(photo);

//   if (imageRef) {
//     url = await getUrlFromImageRef(imageRef);
//   }

//   return url;
// };

// export { getData, deleteData, uploadPhotoAndGetLink };
