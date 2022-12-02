import { atom } from "recoil";

export const editTitleState = atom({
  key: "editTitle",
  default: "",
});

export const editStartDateState = atom({
  key: "editStartDate",
  default: "",
});

export const editEndDateState = atom({
  key: "editEndDate",
  default: "",
});

export const editImagesState = atom({
  key: "editImage",
  default: [],
});

export const editContentState = atom({
  key: "editContent",
  default: "",
});

export const editPlaceState = atom({
  key: "editPlace",
  default: "",
});

export const editCityState = atom({
  key: "editCity",
  default: "",
});

export const editDistrictState = atom({
  key: "editDistrict",
  default: "",
});

export const editStreetState = atom({
  key: "editStreet",
  default: "",
});

export const editLatState = atom({
  key: "editLat",
  default: "",
});

export const editLngState = atom({
  key: "editLng",
  default: "",
});

export const editScoreState = atom({
  key: "editScore",
  default: "",
});
