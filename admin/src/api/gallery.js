import axiosInstance from "../utils/axiosInstance";

//    Create a new album
export const createAlbum = (albumData) => {
  return axiosInstance.post("/albums", albumData);
};

//    Get all albums
export const getAllAlbums = () => {
  return axiosInstance.get("/albums");
};

//    Get a single album by ID
export const getAlbumById = (id) => {
  return axiosInstance.get(`/albums/${id}`);
};

//    Delete an album
export const deleteAlbum = (id) => {
  return axiosInstance.delete(`/albums/${id}`);
};

//    Update album info (name, preview image, etc.)
export const updateAlbum = (id, formData) => {
  return axiosInstance.post(`/albums/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//    Upload an image to an album
export const uploadImageToAlbum = (id, formData) => {
  return axiosInstance.post(`/albums/${id}/upload-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//    Get only images in a specific album
export const getImagesInAlbum = (albumId) => {
  return axiosInstance.get(`/albums/${albumId}/image`);
};

//    Update a single image in an album
export const updateAlbumImage = (imageId, formData) => {
  return axiosInstance.put(`/albums/images/${imageId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//    Delete a single image in an album
export const deleteAlbumImage = (imageId) => {
  return axiosInstance.delete(`/albums/images/${imageId}`);
};

//    Get all images from all albums
export const getAllAlbumImages = () => {
  return axiosInstance.get(`/albums/images`);
};
