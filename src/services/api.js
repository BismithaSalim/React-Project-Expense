// import axios from "axios";

// const API_BASE = "http://localhost:3000/api";

// export const getProjects = async () => {
//   return axios.get(`${API_BASE}/project-summary`);
// };

// export const addClient = async (data) => {
//   return axios.post(`${API_BASE}/add-client`, data);
// };


import axios from "axios";
import { getToken } from "../utils/auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Add token to every request automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// CLIENTS
export const addClient = (data) => api.post("/client/addClient", data);
// export const getClients = () => api.get("/client/getAllClients");
// export const getClients = (page = 1, limit = 10) =>
//   api.get(`/client/getAllClients?page=${page}&limit=${limit}`);

export const getClients = async (page = 1, limit = 10, showDeleted = false,search) => {
  return await api.get("/client/getAllClients", {
    params: { page, limit, showDeleted,search }
  });
};

export const getClientById = (clientId) => {
  return api.get(`/client/getClientById?clientId=${clientId}`);
};
export const updateClient = (id, data) => {
  return api.post(`/client/updateClient?id=${id}`, data);
};

export const deleteClient = async (id) => {
  return await api.patch(`/client/deleteClient/${id}`);
};

export const deleteUser = async (id) => {
  return await api.patch(`/user/deleteUser/${id}`);
};

export const updateUser = (id, data) => {
  return api.post(`/user/updateUser?id=${id}`, data);
};

export const addUser = (data) => api.post("/user/addUser", data);

export const getUsers = async (page = 1, limit = 10, showDeleted = false) => {
  return await api.get("/user/getAllUsers", {
    params: { page, limit, showDeleted }
  });
};

export const getUserById = (userId) => {
  return api.get(`/user/getUserById?userId=${userId}`);
};

// export const updateClient = (id, data) => {
//   return api.post(`/client/updateClient/${id}`, data);
// };



// PROJECTS
export const addProject = (data) => api.post("/project/addProject", data);
// export const getProjects = () => api.get("/project/getAllProjects");
// export const getProjects = (page = 1, limit = 10) => {
//   return api.get(`/project/getAllProjects?page=${page}&limit=${limit}`);
// };
export const getProjectById = (projectId) => {
  return api.get(`/project/getProjectById?projectId=${projectId}`);
};
export const updateProject = (id, data) => {
  return api.post(`/project/updateProject?id=${id}`, data);
};
// Add showDeleted parameter
export const getProjects = async (page = 1, limit = 5, showDeleted = false, search) => {
  return await api.get("/project/getAllProjects", {
    params: { page, limit, showDeleted,search }
  });
};
// Delete/Restore project
export const deleteProject = async (projectId) => {
  return await api.patch(`/project/deleteProject/${projectId}`);
};

// EXPENSES
export const addExpense = (data) => api.post("/expense/addExpense", data);
// export const getExpenses = () => api.get("/expense/getAllExpenses");
export const getProjectsByClient = (clientId) => {
  return api.get(`/project/getProjectsByClient?clientId=${clientId}`);
};
export const getExpenseById = (expenseId) => {
  return api.get(`/expense/getExpenseById?expenseId=${expenseId}`);
};
export const updateExpense = (id, data) => {
  return api.post(`/expense/updateExpense?id=${id}`, data);
};
export const getExpenses = async (page = 1, limit = 5, showDeleted = false) => {
  return await api.get("/expense/getAllExpenses", {
    params: { page, limit, showDeleted }
  });
};
export const deleteExpense = async (expenseId) => {
  return await api.patch(`/expense/deleteExpense/${expenseId}`);
};

// USER
export const loginUser = (data) => api.post("/user/login", data);
export const logoutUser = (token) =>
  api.post("/user/logout", {}, { headers: { Authorization: `Bearer ${token}` } });
  // api.post("/user/logout", {}, { headers: { Authorization: `Bearer ${token}` } });



// P&L Summary
export const getProjectPLSummary = (projectId) => {
  return api.post("/expense/profitAndLossAnalysis", {
    projectId
  });
};

// Project Expenses (filters + sorting)
export const getProjectExpenses = (params) => {
  return api.get("/expense/getProjectExpenses", { params });
};

// Get Project Summary
export const getProjectSummary = (params = {}) => {
  return api.get("/expense/projectSummary", { params });
};

// Get Project Financials (Completed projects totals)
export const getProjectFinancials = () => {
  return api.get("/expense/projectFinancials");
};


// Organisation APIs
export const createOrganisation = async (data) => {
  return await api.post("/org/addOrganisation", data);
};

// export const getOrganisations = async () => {
//   return await api.get("/org/organisationList");
// };

export const getOrganisations = async (showDeleted = false, page = 1, limit = 10) => {
  return await api.get("/org/organisationList", {
    params: { showDeleted, page, limit }
  });
};

export const getOrganisationById = async (id) => {
  return await api.get(`/org/getOrganisationById?id=${id}`);
};

export const updateOrganisation = async (id, data) => {
  return await api.put(`/org/updateOrganisation?id=${id}`, data);
};

export const deleteOrganisation = async (id) => {
  return await api.patch(`/org/deleteOrganisation/${id}`);
};

export const addOrganisationAdmin = async (orgId, data) => {
  return await api.post(`/user/addAdminUser/${orgId}`, data);
};

export const getAdminByOrganisation = async (orgId, data) => {
  return await api.get(`/user/${orgId}/getAdminByOrganisation`, data);
};


///////////////////////////--Master APIs--//////////////////////////////
 
export const addMasterData = async (data) => {
  return await api.post("/master/addMaster", data);
};

export const getMasterData = async (page = 1, limit = 10,search) => {
  return await api.get("/master/getAllMasters", {
    params: { page, limit,search }
  });
};

export const getMasterDataById = async (id) => {
  return await api.get(`/master/getMasterById?id=${id}`);
};

export const getMasterDataByCategory = async () => {
  return await api.get("/master/getMasterByCategory")
};

export const updateMasterData = async (id, data) => {
  return await api.put(`/master/updateMaster?id=${id}`, data);
};

export const deleteMasterData = async (id) => {
  return await api.patch(`/master/deleteMaster/${id}`);
};


export const createRateMaster = async (data) => {
  return await api.post("/master/addRateMaster", data);
};

export const updateRateMaster= async (id, data) => {
  return await api.put(`/master/updateRateMaster/${id}`, data);
};

export const getRateMasters = async (page = 1, limit = 10,showDeleted = false,search) => {
  return await api.get("/master/getRateMasters", {
    params: { page, limit,showDeleted, search }
  });
};

export const getRateMasterById = async (id) => {
  return await api.get(`/master/getRateMasterById/${id}`);
};

export const deleteRateMaster = async (id) => {
  return await api.patch(`/master/deleteRateMaster/${id}`);
};

export const getServices = async (showDeleted = false) => {
  return await api.get("/master/getRateMasters", {
    params: { showDeleted }
  });
};

export const getProject = async (page = 1, limit = 5, showDeleted = false, search) => {
  return await api.get("/project/getProjects", {
    params: { page, limit, showDeleted,search }
  });
};

export const createCostCalculation = async (data) => {
  return await api.post(`/master/createCostCalculation`,data);
};

export const updateCostCalculation = async (data) => {
  return await api.put(`/master/updateCostCalculation`,data);
};

export const getCostCalculation = async (projectId,serviceTitle,locationType) => {
  return await api.post(`/master/getCostCalculation`,{projectId,serviceTitle,locationType});
};
export default api;
