import axios from "axios";
import { useUserStore } from "@/stores/members/user";
import { onMounted, ref } from "vue";

const token = () => {
  return useUserStore().token;
};

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

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Token `,
      "Content-Type": "application/json",
    },
  });

// const apiFileClient = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
//   headers: {
//     Authorization: `Token ${token()}`,
//     "Content-Type": "multipart/form-data",
//   },
// });

export default {
  // TokenAuth
  submitLogin(logininfo) {
    return loginClient.post("api-token-auth/", logininfo);
  },

  // Ticekts
  getTickets(id) {
    if (id !== undefined) {
      return apiClient.get(`tickets/?store__id=${id}`);
    } else {
      return apiClient.get("tickets/");
    }
  },

  // MEMBERS
  getMember() {
    return apiClient.get("staff/");
  },
  getOffice() {
    return apiClient.get("office/");
  },
  updateOffice(id, data) {
    return apiClient.patch(`office/${id}/`, data);
  },

  createTicket(data) {
    return apiClient.post("tickets/", data);
  },
  updateTicket(id, data) {
    return apiClient.patch(`tickets/${id}/`, data);
  },
  deleteTicket(id) {
    return apiClient.delete(`tickets/${id}/`);
  },
  getTicketCategories() {
    return apiClient.get("ticket-categories/");
  },
  // Open TIckets for Dashboard
  getOpenTickets() {
    return apiClient.get(`tickets/?is_open=true`);
  },
  // Customer/Company
  getCompany(id) {
    console.log(token());
    if (id !== undefined) {
      return apiClient.get(`company/${id}/`);
    } else {
      return apiClient.get("company/");
    }
  },
  createCompany(data) {
    return apiClient.post("company/", data);
  },
  updateCompany(id, data) {
    return apiClient.patch(`company/${id}/`, data);
  },
  deleteCompany(id) {
    return apiClient.delete(`company/${id}/`);
  },

  // Cusomter/Store
  getStore(id) {
    if (id !== undefined) {
      return apiClient.get(`store/${id}/`);
    } else {
      return apiClient.get("store/");
    }
  },
  createStore(data) {
    return apiClient.post("store/", data);
  },
  updateStore(id, data) {
    return apiClient.patch(`store/${id}/`, data);
  },
  deleteStore(id) {
    return apiClient.delete(`store/${id}/`);
  },

  getCompanyList() {
    return apiClient.get("company-list/");
  },

  // Manual
  getManualCategories() {
    return apiClient.get("manual-categories/");
  },
  getManual(id) {
    return apiClient.get(`kitting-manuals/?manual_cat__id=${id}`);
  },
  createKittingManual(data) {
    return apiClient.post("kitting-manuals/", data);
  },
  updateKittingManual(id, data) {
    return apiClient.patch(`kitting-manuals/${id}/`, data);
  },
  deleteKittingManual(id) {
    return apiClient.delete(`kitting-manuals/${id}/`);
  },
  // Customer/Contact
  getContact(id) {
    if (id !== undefined) {
      return apiClient.get(`customer-contact/?store__id=${id}`);
    } else {
      return apiClient.get("customer-contact/");
    }
  },
  createContact(data) {
    return apiClient.post("customer-contact/", data);
  },
  updateContact(id, data) {
    return apiClient.patch(`customer-contact/${id}/`, data);
  },
  deleteContact(id) {
    return apiClient.delete(`customer-contact/${id}/`);
  },

  // Tech
  getTv(id) {
    if (id !== undefined) {
      return apiClient.get(`devices/?store__id=${id}&is_teamviewer=true`);
    } else {
      return apiClient.get("devices/");
    }
  },
  getDevice(id) {
    if (id !== undefined) {
      return apiClient.get(`devices/?store__id=${id}`);
    } else {
      return apiClient.get("devices/");
    }
  },
  createDevice(data) {
    return apiClient.post("devices/", data);
  },
  updateDevice(id, data) {
    return apiClient.patch(`devices/${id}/`, data);
  },
  deleteDevice(id) {
    return apiClient.delete(`devices/${id}/`);
  },
  // FoodIT
  getFoodITList(id) {
    if (id !== undefined) {
      return apiClient.get(`foodit-list/?store__id=${id}`);
    } else {
      return apiClient.get("foodit-list/");
    }
  },
  createFoodITList(data) {
    return apiClient.post("foodit-list/", data);
  },
  updateFoodITList(id, data) {
    return apiClient.patch(`foodit-list/${id}/`, data);
  },
  deleteFoodITList(id) {
    return apiClient.delete(`foodit-list/${id}/`);
  },
  getFoodIT() {
    return apiClient.get("foodit/");
  },
  createFoodIT(data) {
    return apiClient.post("foodit/", data);
  },
  updateFoodIT(id, data) {
    return apiClient.patch(`foodit/${id}/`, data);
  },

  // FOODIT USER TYPE
  getUserType() {
    return apiClient.get("user-type/");
  },
  // SystemGuide
  getSystemGuide(id) {
    return apiClient.get(`support-guide/?store__id=${id}`);
  },
  createSystemGuide(data) {
    return apiClient.post("support-guide/", data);
  },
  updateSystemGuide(id, data) {
    return apiClient.patch(`support-guide/${id}/`, data);
  },
  // deleteSystemGuide(id) {
  //   return apiClient.delete(`support-guide/${id}/`);
  // },

  // WorldPayDoc worldpay-doc/
  getWorldPayDoc(id) {
    return apiFileClient.get(`worldpay-doc/?store__id=${id}`);
  },
  createWorldPayDoc(data) {
    return apiFileClient.post("worldpay-doc/", data);
  },
  deleteWorldPayDoc(id) {
    return apiClient.delete(`worldpay-doc/${id}/`);
  },

  // SystemGuideFile
  getStoreFile(id) {
    return apiClient.get(`store-file/?store__id=${id}`);
  },
  createStoreFile(data) {
    return apiFileClient.post("store-file/", data);
  },
  deleteStoreFile(id) {
    return apiClient.delete(`store-file/${id}/`);
  },

  getProjectLog(id) {
    if (id !== undefined) {
      return apiClient.get(`project-logs/?store__id=${id}`);
    } else {
      return apiClient.get("project-logs/");
    }
  },
  getProjectLogById(id) {
    return apiClient.get(`project-logs/${id}/`);
  },
  createProjectLog(data) {
    return apiClient.post("project-logs/", data);
  },
  updateProjectLog(id, data) {
    return apiClient.patch(`project-logs/${id}/`, data);
  },
  deleteProjectLog(id) {
    return apiClient.delete(`project-logs/${id}/`);
  },
  // Project Type
  getProjectType() {
    return apiClient.get("project-type/");
  },
  // Project Status
  getProjectStatus() {
    return apiClient.get("project-status/");
  },
  // vendors
  getVendor() {
    return apiClient.get("vendor/");
  },
  createVendor(data) {
    return apiClient.post("vendor/", data);
  },
  updateVendor(id, data) {
    return apiClient.patch(`vendor/${id}/`, data);
  },
  // Product
  getProduct(id) {
    return apiClient.get(`product/?product_type__id=${id}`);
  },
  createProduct(data) {
    return apiClient.post("product/", data);
  },
  updateProduct(id, data) {
    return apiClient.patch(`product/${id}/`, data);
  },
  deleteProduct(id) {
    return apiClient.delete(`product/${id}/`);
  },
  //
  getCostType() {
    return apiClient.get("cost-type/");
  },
  getProductType() {
    return apiClient.get("product-type/");
  },
  getProductUnit() {
    return apiClient.get("product-unit/");
  },
  //
  getEstimateProduct(prj, ver, type) {
    return apiClient.get(
      `estimate-product/?project__prj_number=${prj}&project__ver=${ver}&product__product_type=${type}`
    );
  },
  getAllEstimateProduct(prj, ver) {
    return apiClient.get(
      `estimate-product/?project__prj_number=${prj}&project__ver=${ver}`
    );
  },
  getEstimateProductByVendor(prj, ver, vendorId) {
    return apiClient.get(
      `estimate-product/?project__prj_number=${prj}&project__ver=${ver}&product__vendor=${vendorId}`
    );
  },
  createEstimateProduct(data) {
    return apiClient.post("estimate-product/", data);
  },
  updateEstimateProduct(id, data) {
    return apiClient.patch(`estimate-product/${id}/`, data);
  },
  deleteEstimateProduct(id) {
    return apiClient.delete(`estimate-product/${id}/`);
  },
};
