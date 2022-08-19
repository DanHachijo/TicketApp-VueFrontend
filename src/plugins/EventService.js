import axios from "axios";
// import { useUserStore } from "@/stores/members/user";
// import { onMounted, ref } from "vue";

// const token = () => {
//   return useUserStore().token;
// };

// onMounted(()=>{
//   token.value = useUserStore().token.value
//   console.log("onMounted")
//   console.log(useUserStore().token.value)
//   console.log(token.value)
// })

const loginClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClient = () => {
  return axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Token ${window.localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
};

const apiFileClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
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

export const getStoreListEvent = () => {
  return apiClient().get("store-list/");
};

export const getCompanyListEvent = () => {
  return apiClient().get("company-list/");
};

// Manual
export const getManualCategories = () => {
  return apiClient().get("manual-categories/");
};
export const getManual = (id) => {
  return apiClient().get(`kitting-manuals/?manual_cat__id=${id}`);
};
export const createKittingManual = (data) => {
  return apiClient().post("kitting-manuals/", data);
};
export const updateKittingManual = (id, data) => {
  return apiClient().patch(`kitting-manuals/${id}/`, data);
};
export const deleteKittingManual = (id) => {
  return apiClient().delete(`kitting-manuals/${id}/`);
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
export const getTv = (id) => {
  if (id !== undefined) {
    return apiClient().get(`devices/?store__id=${id}&is_teamviewer=true`);
  } else {
    return apiClient().get("devices/?store__id=&is_teamviewer=true");
  }
};

export const getDevice = (id) => {
  if (id !== undefined) {
    return apiClient().get(`devices/?store__id=${id}`);
  } else {
    return apiClient().get("devices/");
  }
};
export const createDevice = (data) => {
  return apiClient().post("devices/", data);
};
export const updateDevice = (id, data) => {
  return apiClient().patch(`devices/${id}/`, data);
};
export const deleteDevice = (id) => {
  return apiClient().delete(`devices/${id}/`);
};
// WebPortal USER
export const getUserLogin = (id) => {
  if (id !== undefined) {
    return apiClient().get(`website-user/?store__id=${id}`);
  } else {
    return apiClient().get("website-user/");
  }
};
export const createuserLogin = (data) => {
  return apiClient().post("website-user/", data);
};
export const updateuserLogin = (id, data) => {
  return apiClient().patch(`website-user/${id}/`, data);
};
export const deleteuserLogin = (id) => {
  return apiClient().delete(`website-user/${id}/`);
};

// WebPortal
export const getWebPortal = () => {
  return apiClient().get("website/");
};
export const createWebPortal = (data) => {
  return apiClient().post("website/", data);
};
export const updateWebPortal = (id, data) => {
  return apiClient().patch(`website/${id}/`, data);
};

export const deleteWebPortal = (id) => {
  return apiClient().delete(`website/${id}/`);
};

// USER TYPE
export const getUserType = () => {
  return apiClient().get("user-type/");
};
// SystemGuide
export const getSystemGuide = (id) => {
  return apiClient().get(`support-guide/?store__id=${id}`);
};
export const createSystemGuide = (data) => {
  return apiClient().post("support-guide/", data);
};
export const updateSystemGuide = (id, data) => {
  return apiClient().patch(`support-guide/${id}/`, data);
};
// deleteSystemGuide(id) {
//   return apiClient.delete(`support-guide/${id}/`);
// },

// WorldPayDoc worldpay-doc/
export const getWorldPayDoc = (id) => {
  return apiFileClient.get(`worldpay-doc/?store__id=${id}`);
};
export const createWorldPayDoc = (data) => {
  return apiFileClient.post("worldpay-doc/", data);
};
export const deleteWorldPayDoc = (id) => {
  return apiClient().delete(`worldpay-doc/${id}/`);
};

// SystemGuideFile
export const getStoreFile = (id) => {
  return apiClient().get(`store-file/?store__id=${id}`);
};
export const createStoreFile = (data) => {
  return apiFileClient.post("store-file/", data);
};
export const deleteStoreFile = (id) => {
  return apiClient().delete(`store-file/${id}/`);
};

export const getProjectLog = (id) => {
  if (id !== undefined) {
    return apiClient().get(`project-logs/?store__id=${id}`);
  } else {
    return apiClient().get("project-logs/");
  }
};
export const getProjectLogById = (id) => {
  return apiClient().get(`project-logs/${id}/`);
};
export const createProjectLog = (data) => {
  return apiClient().post("project-logs/", data);
};
export const updateProjectLog = (id, data) => {
  return apiClient().patch(`project-logs/${id}/`, data);
};
export const deleteProjectLog = (id) => {
  return apiClient().delete(`project-logs/${id}/`);
};
// Project Type
export const getProjectType = () => {
  return apiClient().get("project-type/");
};
// Project Status
export const getProjectStatus = () => {
  return apiClient().get("project-status/");
};
// vendors
export const getVendor = () => {
  return apiClient().get("vendor/");
};
export const createVendor = (data) => {
  return apiClient().post("vendor/", data);
};
export const updateVendor = (id, data) => {
  return apiClient().patch(`vendor/${id}/`, data);
};
// Product
export const getProduct = (id) => {
  return apiClient().get(`product/?product_type__id=${id}`);
};
export const createProduct = (data) => {
  return apiClient().post("product/", data);
};
export const updateProduct = (id, data) => {
  return apiClient().patch(`product/${id}/`, data);
};
export const deleteProduct = (id) => {
  return apiClient().delete(`product/${id}/`);
};
//
export const getCostType = () => {
  return apiClient().get("cost-type/");
};
export const getProductType = () => {
  return apiClient().get("product-type/");
};
export const getProductUnit = () => {
  return apiClient().get("product-unit/");
};
//
export const getEstimateProduct = (prj, ver, type) => {
  return apiClient().get(
    `estimate-product/?project__prj_number=${prj}&project__ver=${ver}&product__product_type=${type}`
  );
};
export const getAllEstimateProduct = (prj, ver) => {
  return apiClient().get(
    `estimate-product/?project__prj_number=${prj}&project__ver=${ver}`
  );
};
export const getEstimateProductByVendor = (prj, ver, vendorId) => {
  return apiClient().get(
    `estimate-product/?project__prj_number=${prj}&project__ver=${ver}&product__vendor=${vendorId}`
  );
};
export const createEstimateProduct = (data) => {
  return apiClient().post("estimate-product/", data);
};
export const updateEstimateProduct = (id, data) => {
  return apiClient().patch(`estimate-product/${id}/`, data);
};
export const deleteEstimateProduct = (id) => {
  return apiClient().delete(`estimate-product/${id}/`);
};
