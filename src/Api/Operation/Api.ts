import axios from "axios";
import apiClient from "../ApiClient";

const baseUrl = process.env.REACT_APP_BASE_URL;


// -------------------------------------- Orders --------------------------------------

// -------------------------------------- Current-Orders --------------------------------------

export const getOperationOrderList = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/dashboard_order/list/`, data);
};

export const getOperationOrderDetails = async (id: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/dashboard_order/${id}/get_retrieve_data/`);
};

export const cancelOperationOrder = async (id: any, data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/dashboard_order/${id}/cancel_order/`, data);
};

// -------------------------------------- Advance-Orders --------------------------------------

export const getOperationAdvanceOrderList = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/advance_order/list/`, data);
};

export const getOperationAdvanceOrderDetails = async (id: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/advance_order/${id}/get_retrieve_data/`);
};


// -------------------------------------- KOTs --------------------------------------

export const getOperationKotList = async (data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/kot_order/get_list/`, data);
};

export const getOperationKotDetails = async (id: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/kot_order/${id}/get_detail/`);
};

export const cancelOperationKot = async (id: any, data: any) => {
  return await apiClient.post(`${baseUrl}/orders/v1/kot_order/${id}/cancel_kot/`, data);
};

// -------------------------------------- Customers --------------------------------------

export const getCustomers = async (data: any) => {
  return await apiClient.post(`${baseUrl}/crm/v1/customer/get_all_data/`, data);
};

export const patchCustomers = async (id: any, data: any) => {
  return await apiClient.post(`${baseUrl}/crm/v1/customer/${id}/patch_data/`, data);
};

export const getCustomerTag = async () => {
  return await apiClient.post(`${baseUrl}/crm/v1/customer_tag/get_all_data/`);
};

// -------------------------------------- Expense --------------------------------------

export const getExpense = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/expense_dates/get_all_data/`, data);
};

export const getExpenseDate = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/get_expense/`, data);
};

export const getExpenseEmployee = async () => {
  return await apiClient.post(`${baseUrl}/operation/v1/expense_date_reason/get_expense_employee/`);
};

export const getExpenseReason = async () => {
  return await apiClient.post(`${baseUrl}/operation/v1/expense_date_reason/get_all_data/`);
};

export const postExpense = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/post_expense/`, data);
};

// -------------------------------------- Withdrawl --------------------------------------

export const getWithdrawl = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/withdrawal_dates/get_all_data/`, data);
};

export const getWithdrawlDate = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/get_withdrawal/`, data);
};

export const getWithdrawlReason = async () => {
  return await apiClient.post(`${baseUrl}/operation/v1/withdrawal_dates_reason/get_all_data/`);
};

export const postWithdrawl = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/post_withdrawal/`, data);
};

// -------------------------------------- Help --------------------------------------

export const getHelpTips = async () => {
  return await apiClient.post(`${baseUrl}/operation/v1/help_tipes/get_all_data/`);
};

// -------------------------------------- Due Payment --------------------------------------

export const getDuePayment = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/deu_payment/due_payments_list/`, data);
};

export const getOrderWiseDuePayment = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/deu_payment/get_list/`, data);
};

export const getCustomerWiseDuePayment = async (data: any) => {
  return await apiClient.post(`${baseUrl}/operation/v1/deu_payment/total_remaining_amount/`, data);
};

// -------------------------------------- Billing User Profile --------------------------------------

export const getBillingUserProfile = async (data: any) => {
  return await apiClient.post(`${baseUrl}/user_management/v1/biller_app_user/biller_prof_list_data/`, data);
};

// -------------------------------------- Delivery Boys --------------------------------------

export const getDeliveryBoys = async (data: any) => {
  return await apiClient.post(`${baseUrl}/user_management/v1/biller_app_user/delivery_boy_list_data/`, data);
};

export const postDeliveryBoy = async (data: any) => {
  return await apiClient.post(`${baseUrl}/user_management/v1/biller_app_user/delivery_boy_post_update_data/`, data);
};

export const deleteDeliveryBoy = async (id: any, data: any) => {
  return await apiClient.post(`${baseUrl}/user_management/v1/biller_app_user/${id}/delivery_boy_delete_data/`, data);
};



// -------------------------------------- Configuration --------------------------------------
// -------------------------------------- Bill/KOT Print --------------------------------------


// ------------------------------ Bill/KOT Preferred Configuration ------------------------------

export const getBillKOTPreferredConfiguration = async (id: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/${id}/print_options/`);
};

export const postBillKOTPreferredConfiguration = async (data: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/outlet_billing_screen_print/create_update/`, data);
};


// ------------------------------ Multiple Printer Settings ------------------------------

// ------------------------------ Multiple Printer ------------------------------

export const getPrinter = async () => {
  // return await apiClient.post(`${baseUrl}/configuration/v1/printer/get_all_data/`);
  return await apiClient.post(`${baseUrl}/configuration/v1/printer/list_with_kot/`);
};

export const postPrinter = async (data: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/printer/`, data);
};

export const updatePrinter = async (id: any, data: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/printer/${id}/patch_data/`, data);
};

export const deletePrinter = async (id: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/printer/${id}/delete_data/`);
};

// ------------------------------ Assign Printer ------------------------------

export const getAssignPrinter = async (data: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/assign_printers/`, data);
};

export const postAssignPrinter = async (data: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/assign_printers/create/`, data);
};


// ------------------------------ Configuration Printer ------------------------------

export const getPrinterList = async (data: any) => {
  return await apiClient.get(`${baseUrl}/configuration/v1/printer/get_printer_list/`, data);
};






// -------------------------------------- Inventory -------------------------------------- //


// -------------------------------------- Purchase --------------------------------------

// -------------------------------------- Purchase Management --------------------------------------

export const getPurchase = async (data: any) => {
  return await apiClient.post(`${baseUrl}/inventory/v1/purchase/stock_purchase/get_all_datas/`, data);
};

export const postPurchase = async (data: any) => {
  return await apiClient.post(`${baseUrl}/inventory/v1/purchase/stock_purchase/`, data);
};

// -------------------------------------- Request For Purchase --------------------------------------

export const getRequestForPurchase = async (data: any) => {
  return await apiClient.post(`${baseUrl}/inventory/v1/purchase/request_purchase/get_all_data/`, data);
};

export const getSupplier = async (data: any) => {
  return await apiClient.post(`${baseUrl}/inventory/v1/suppliers/get_all_data/`, data);
};

export const getKitchen = async (data: any) => {
  return await apiClient.post(`${baseUrl}/configuration/v1/kitchen/get_all_data/`, data);
};

export const getRowMaterial = async (data: any) => {
  return await apiClient.post(`${baseUrl}/inventory/v1/raw_material/all/`, data);
};

export const getUnit = async (data: any) => {
  return await apiClient.post(`${baseUrl}/menu_management/v1/unit/get_all_data/`, data);
};

export const postRequestForPurchase = async (data: any) => {
  return await apiClient.post(`${baseUrl}/inventory/v1/purchase/request_purchase/`, data);
};