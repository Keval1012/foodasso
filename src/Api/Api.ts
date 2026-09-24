import axios from "axios"
import apiClient from "./ApiClient";

const baseUrl = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create();

// type TableDataType = {
//     id: number;
//     name: string;
//     // Add other properties as needed
// };

// type GetTablesResponse = {
//     data: TableDataType[];
// };

// export const getTables = async (data: Record<string, any>): Promise<GetTablesResponse> => {
//   const response = await axios.post<GetTablesResponse>(`${baseUrl}/orders/v1/order/billing_tables/`, data);
//   return response.data;
// };


// -------------------------------------- Table --------------------------------------

export const getTables = async (data: any) => {
    return await apiClient.post(`${baseUrl}/orders/v1/order/billing_tables/`, data);
};

export const checkExistsTable = async (data: any) => {
    return await apiClient.post(`${baseUrl}/orders/v1/order/check_exists_table/`, data);
};

// -------------------------------------- Table-Item --------------------------------------

export const getGroupWiseAllData = async (data: any) => {
    return await apiClient.post(`${baseUrl}/menu_management/v1/group/group_wise_category_menu_items/`, data);
};

export const getVariationMenuItem = async (data: any) => {
    return await apiClient.post(`${baseUrl}/orders/v1/order/variation_menu_items/`, data);
};

// -------------------------------------- Orders --------------------------------------

export const getWaiter = async (data: any) => {
    return await apiClient.post(`${baseUrl}/user_management/v1/biller_app_user/get_all_data/`, data);
};

export const getOrderType = async () => {
    return await apiClient.post(`${baseUrl}/configuration/v1/order_type/get_all_data/`);
};

export const getPaymentType = async () => {
    return await apiClient.post(`${baseUrl}/configuration/v1/payment_type/get_all_data/`);
};

export const appliedCouponCode = async (data: any) => {
    return await apiClient.post(`${baseUrl}/orders/v1/applied_coupon_code/`, data);
};

export const addOrder = async (data: any) => {
    return await apiClient.post(`${baseUrl}/orders/v1/order/`, data);
};

export const getTableWiseOrder = async (data: any) => {
    return await apiClient.post(`${baseUrl}/orders/v1/order/table_wise_order/`, data);
};

export const editOrder = async (id: any, data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/order/${id}/patch_data/`, data);
};

// -------------------------------------- Customer --------------------------------------

export const getCustomerDetails = async (data: any) => {
  return await apiClient.post(`${baseUrl}/crm/v1/customer/get_all_data/`, data);
};

export const getCustomerHistory = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/customer_his/get_list/`, data);
};

// -------------------------------------- Tax --------------------------------------

export const getAllTax = async (data: any) => {
  return await apiClient.post(`${baseUrl}/menu_management/v1/taxes/all/`, data);
};

// -------------------------------------- Order Payment --------------------------------------

export const getOtherPaymentType = async (data: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/other_payment_type/active_listing/`, data);
};

export const getPartPaymentType = async (data: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/payment_type/card_active_listing/`, data);
};

export const addPartPayment = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/part_payment/`, data);
};
// otehr payment type
export const getOtherPaymentTypeDetails = async (data: any) => {
  return await apiClient.post(`${baseUrl}configuration/v1/other_payment_type/get_all_data/`, data);
};
//settled payment
export const settledPayment = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/live_orders_settle/${data.id}/update_data/`, data);
};
// -------------------------------------- View Order --------------------------------------

export const getLiveOrders = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/live_orders/get_list/`, data);
};

export const getLiveOrderDetails = async (id: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/live_orders/${id}/get_retrieve/`);
};

// -------------------------------------- Live Kot Order --------------------------------------

export const getLiveKotView = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/live_kot_order/get_list/`, data);
};

export const updateLiveKotView = async (id: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/live_kot_order/${id}/update_data/`);
};

export const cancelLiveKotView = async (id: any, data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/kot_order/${id}/cancel_kot/`, data);
};


// -------------------------------------- Recent Orders --------------------------------------

export const getRecentKotOrders = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/recent_kot_orders/get_list/`, data);
};

export const getRecentOrders = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/recent_orders/get_list/`, data);
};

// -------------------------------------- Hold Orders --------------------------------------

export const getHoldOrders = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/hold_orders/get_list/`, data);
};

export const deleteHoldOrder = async (id: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/hold_orders/${id}/delete_order/`);
};


// -------------------------------------- Move Kot --------------------------------------

// -------------------------------------- Table Wise --------------------------------------

export const getTabelArea = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/move_kot/get_table/`, data);
};

export const moveKotTableWise = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/move_kot/move_kot_table/`, data);
};

// -------------------------------------- Kot Wise --------------------------------------

export const getKotArea = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/order/get_item_wise_move_kot/`, data);
};

export const moveKot_KotWise = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/order/post_item_wise_move_kot/`, data);
};

// -------------------------------------- Item Wise --------------------------------------

export const getItemArea = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/order/get_item_wise_move_kot/`, data);
};

export const moveKotItemWise = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/order/post_item_wise_move_kot/`, data);
};


// -------------------------------------- Reports --------------------------------------

export const getCategory = async (data: any) => {
  return await apiClient.post(`${baseUrl}/reports/v1/category/get_data/`, data);
};

export const getItemsDetail = async (data: any) => {
  return await apiClient.post(`${baseUrl}/reports/v1/item/category_wise_sales/`, data);
};

export const getSalesReport = async (data: any) => {
  return await apiClient.post(`${baseUrl}/reports/v1/sale/get_data/`, data);
};

export const getOrderReport = async (data: any) => {
  return await apiClient.post(`${baseUrl}/reports/v1/order/order_summery_report/`, data);
};