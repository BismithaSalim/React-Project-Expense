// src/utils/auth.js

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};

export const getOrganisationId = () => {
  const user = getUser();
  return user?.organisationId || null;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};