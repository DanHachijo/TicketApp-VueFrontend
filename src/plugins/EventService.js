import axios from "axios";

const loginClient = axios.create({
  baseURL: "http://172.104.81.40:81/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClient = () => {
  return axios.create({
    baseURL: "http://172.104.81.40:81/api",
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
};

const apiFileClient = axios.create({
  baseURL: "http://172.104.81.40:81/api",
  headers: {
    Authorization: `Token ${window.localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
});

// TokenAuth
export const submitLoginEvent = (logininfo) => {
  return loginClient.post("api-token-auth/", logininfo);
};

// MEMBERS
export const getMember = () => {
  return apiClient().get("staff/");
};
export const getOffice = () => {
  return apiClient().get("office/");
};
export const updateOffice = (id, data) => {
  return apiClient().patch(`office/${id}/`, data);
};

// Ticekts
export const getTickets = (id) => {
  if (id !== undefined) {
    return apiClient().get(`tickets/?store__id=${id}`);
  } else {
    return apiClient().get("tickets/");
  }
};

export const createTicket = (data) => {
  return apiClient().post("tickets/", data);
};
export const updateTicket = (id, data) => {
  return apiClient().patch(`tickets/${id}/`, data);
};
export const deleteTicket = (id) => {
  return apiClient().delete(`tickets/${id}/`);
};
export const getTicketCategories = () => {
  return apiClient().get("ticket-categories/");
};
// Open TIckets for Dashboard
export const getOpenTickets = () => {
  return apiClient().get(`tickets/?is_open=true`);
};
// Customer/Company
export const getCompany = (id) => {
  if (id !== undefined) {
    return apiClient().get(`company/${id}/`);
  } else {
    return apiClient().get("company/");
  }
};
export const createCompany = (data) => {
  return apiClient().post("company/", data);
};
export const updateCompany = (id, data) => {
  return apiClient().patch(`company/${id}/`, data);
};
export const deleteCompany = (id) => {
  return apiClient().delete(`company/${id}/`);
};

// Cusomter/Store
export const getStore = (id) => {
  if (id !== undefined) {
    return apiClient().get(`store/${id}/`);
  } else {
    return apiClient().get("store/");
  }
};
export const createStore = (data) => {
  return apiClient().post("store/", data);
};
export const updateStore = (id, data) => {
  return apiClient().patch(`store/${id}/`, data);
};
export const deleteStore = (id) => {
  return apiClient().delete(`store/${id}/`);
};


// Customer/Contact
export const getContact = (id) => {
  if (id !== undefined) {
    return apiClient().get(`customer-contact/?store__id=${id}`);
  } else {
    return apiClient().get("customer-contact/");
  }
};
export const createContact = (data) => {
  return apiClient().post("customer-contact/", data);
};
export const updateContact = (id, data) => {
  return apiClient().patch(`customer-contact/${id}/`, data);
};
export const deleteContact = (id) => {
  return apiClient().delete(`customer-contact/${id}/`);
};

// Tech


