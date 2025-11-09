const API_URL = "https://backend.fxcreationstudio.com/api";

// Helper function to get Authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token"); // get token from localStorage
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
};

// === Services APIs ===

export const getServices = async () => {
  const res = await fetch(`${API_URL}/services`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch services");
  return await res.json();
};

export const createService = async (formData) => {
  const res = await fetch(`${API_URL}/services`, {
    method: "POST",
    headers: getAuthHeaders(), // token + Accept
    body: formData, // formData must not set content-type manually
  });
  if (!res.ok) throw new Error("Failed to create service");
  return await res.json();
};

export const updateService = async (id, formData) => {
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: "POST", // Laravel PUT spoofing
    headers: getAuthHeaders(),
    body: formData, // formData must include _method=PUT if needed
  });
  if (!res.ok) throw new Error("Failed to update service");
  return await res.json();
};

export const deleteService = async (id) => {
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete service");
  return await res.json();
};

// === Videos APIs ===

export const getVideos = async () => {
  const res = await fetch(`${API_URL}/videos`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch videos");
  return await res.json();
};

export const createVideo = async (formData) => {
  console.log(getAuthHeaders());
  const res = await fetch(`${API_URL}/videos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create video");
  return await res.json();
};

export const updateVideo = async (id, formData) => {
  const res = await fetch(`${API_URL}/videos/${id}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData, // formData must include _method=PUT
  });
  if (!res.ok) throw new Error("Failed to update video");
  return await res.json();
};

export const deleteVideo = async (id) => {
  const res = await fetch(`${API_URL}/videos/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete video");
  return await res.json();
};
