import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface BillingDataState {
  loginUserData: any;
  tableData: any;
  orderStatusData: any;
  currentBillingData: any;
  menuItemsData: any;
  subTotalPrice: any;
  totalItemData: any;
  orderItemData: any;
  userDetailsData: any;
  orderTypeId: any;
  groupData: any;
  ActiveKot: Boolean;
  kotData: any;
  orderData: any;
  liveKot: any;
  orderType: any;
  liveOrder: any;
  tablewiseorder: any;
  paymenttype: any;
  categoryReport: any;
  categoryItem: any;
  selsReport: any;
  orderReport: any;
  paymentstatus: any;
  existsOrderItem: [];
  orderItems: any;
  itemsAlert:any;
  closeDialog:any;
  addOrder:any
}

const initialState: BillingDataState = {
  loginUserData: null,
  tableData: null,
  orderStatusData: null,
  currentBillingData: null,
  menuItemsData: null,
  subTotalPrice: null,
  totalItemData: null,
  orderItemData: null,
  userDetailsData: null,
  orderTypeId: null,
  groupData: null,
  ActiveKot: false,
  kotData: null,
  orderData: null,
  liveKot: null,
  orderType: null,
  liveOrder: null,
  tablewiseorder: null,
  paymenttype: null,
  categoryReport: null,
  categoryItem: null,
  selsReport: null,
  orderReport: null,
  paymentstatus: null,
  existsOrderItem: [],
  orderItems: [],
  itemsAlert:null,
  closeDialog:null,
  addOrder:null
};

export const billingDataSlice = createSlice({
  name: "billingData",
  initialState,
  reducers: {
    setLoginUserData: (state, action: PayloadAction<any>) => {
      state.loginUserData = action.payload;
    },
    setTableData: (state, action: PayloadAction<any>) => {
      state.tableData = action.payload;
    },
    setOrderStatusData: (state, action: PayloadAction<any>) => {
      state.orderStatusData = action.payload;
    },
    setMenuItemsData: (state, action: PayloadAction<any>) => {
      state.menuItemsData = action.payload;
    },
    setSubTotalPrice: (state, action: PayloadAction<any>) => {
      state.subTotalPrice = action.payload;
    },
    setTotalItemData: (state, action: PayloadAction<any>) => {
      state.totalItemData = action.payload;
    },
    setOrderItemData: (state, action: PayloadAction<any>) => {
      state.orderItemData = action.payload;
    },
    setExistsItems: (state, action: PayloadAction<any>) => {
        console.log(action.payload, "action.payload");
    
        if (action.payload.length === 0) {
            state.orderItems = []; // Clear the orderItems if payload is empty
            return;
        }
    
        // Map through the payload and return updated objects with selected_items populated
        const records = action.payload.map((item: any) => {
            // Create a new selectedItem object with required details
            const selectedItem = {
                id: item.id,
                menu_item: item.menu_item,
                quantity: parseInt(item.quantity),
                price: parseInt(item.price),
            };
    
            // Update the selected_items array by adding the new selectedItem
            return {
                ...item, // Spread the existing item
                quantity: parseInt(item.quantity),
                selected_items: [...item.selected_items, selectedItem] // Add the selectedItem
            };
        });
    
        // Set the updated records to the state
        state.orderItems = records;
    },
    
    setUserDetailsData: (state, action: PayloadAction<any>) => {
      state.userDetailsData = action.payload;
    },
    setCurrentData: (state, action: PayloadAction<any>) => {
      state.currentBillingData = action.payload;
    },
    setOrderTypeId: (state, action: PayloadAction<any>) => {
      state.orderTypeId = action.payload;
    },
    setGroupData: (state, action: PayloadAction<any>) => {
      state.groupData = action.payload;

      let allMenuItems: any[] = [];
      console.log(state.orderItems,"allMenuItemsallMenuItems")
      if(state.groupData.groups.length==0){
        return
      }
      // Iterate through the groups and categories, pushing menu items into the new array
      state.groupData.groups.forEach((group: { categories: any[]; group_name: any; }) => {
        group.categories.forEach(category => {
          allMenuItems = allMenuItems.concat(category.menu_items.map((item: any) => ({
            ...item,
            group_name: group.group_name,
            category_name: category.category_name
          })));
        });
      });


      const previousOrderItems = [...state.orderItems];
      state.orderItems = state.orderItems.filter((item1: { id: any; menu_item: any }) => 
        allMenuItems.some((item2: { id: any }) => 
          item2.id === item1.id || item2?.id=== item1?.menu_item
        )
      );
      const changesDetected = previousOrderItems.length !== state.orderItems.length;
      
      state.itemsAlert=changesDetected
    },
    setOpenKot: (state, action: PayloadAction<any>) => {
      state.ActiveKot = action.payload.status;
    },
    setKotData: (state, action: PayloadAction<any>) => {
      state.kotData = action.payload;
    },
    setEditOrder: (state, action: PayloadAction<any>) => {
      state.orderData = action.payload;
    },
    setLiveKot: (state, action: PayloadAction<any>) => {
      state.liveKot = action.payload;
    },
    setOrderType: (state, action: PayloadAction<any>) => {
      state.orderType = action.payload;
    },
    setCloseDialog: (state, action: PayloadAction<any>) => {
        state.closeDialog = action.payload;
      },
    setLiveOrder: (state, action: PayloadAction<any>) => {
      state.liveOrder = action.payload;
    },
    setTablewiseOrer: (state, action: PayloadAction<any>) => {
      state.tablewiseorder = action.payload;
    },
    setPaymenttype: (state, action: PayloadAction<any>) => {
      state.paymenttype = action.payload;
    },
    setCategoryReport: (state, action: PayloadAction<any>) => {
      state.categoryReport = action.payload;
    },
    setCategoryItemReport: (state, action: PayloadAction<any>) => {
      state.categoryItem = action.payload;
    },
    seSelsReport: (state, action: PayloadAction<any>) => {
      state.selsReport = action.payload;
    },
    setOrderReport: (state, action: PayloadAction<any>) => {
      state.orderReport = action.payload;
    },
    paymentpopup: (state, action: PayloadAction<any>) => {
      state.paymentstatus = action.payload;
    },
    setOrderItem: (state, action: PayloadAction<any>) => {
        if(action.payload?.blank==true){
            state.orderItems=[]
            return
        }
      const newItem = action.payload;
      // state.orderItems=[]
      // Check if there are any order items
      if (state.orderItems.length === 0) {
        const itemWithQuantity = {
          ...newItem,
          quantity: 1,
          selected_items: [
            {
              id: newItem.id,
              name: newItem.name,
              quantity: 1,
              price: newItem.price,
              totalPrice: newItem.price,
            },
          ],
        };
        state.orderItems.push(itemWithQuantity);
        return;
      }

      // Find if the item already exists in the orderItems array
      const existingItemIndex = state.orderItems.findIndex(
        (item: any) => item.id === newItem.id  ||  item.menu_item === newItem.id
      );

      if (existingItemIndex >= 0) {
        // If item exists, update its quantity by 1 and update the selected_items
        const updatedItem = state.orderItems[existingItemIndex];
        updatedItem.quantity += 1;

        // Find if the item already exists in selected_items, and update it
        const selectedItemIndex = updatedItem.selected_items.findIndex(
          (selectedItem: any) => selectedItem.id === newItem.id || selectedItem.menu_item === newItem.id
        );

        if (selectedItemIndex >= 0) {
          // Update the existing selected item
          const existingSelectedItem =
            updatedItem.selected_items[selectedItemIndex];
          existingSelectedItem.quantity += 1;
          existingSelectedItem.totalPrice =
            existingSelectedItem.quantity * existingSelectedItem.price;
        } else {
          // If item doesn't exist in selected_items, add it
          updatedItem.selected_items.push({
            id: newItem.id,
            name: newItem.name,
            quantity: 1,
            price: newItem.price,
            totalPrice: newItem.price, // totalPrice = price * quantity
          });
        }
      } else {
        // If item does not exist in the orderItems array, add it with quantity 1
        const itemWithQuantity = {
          ...newItem,
          quantity: 1,
          selected_items: [
            {
              id: newItem.id,
              name: newItem.name,
              quantity: 1,
              price: newItem.price,
              totalPrice: newItem.price, // totalPrice = price * quantity
            },
          ],
        };
        state.orderItems.push(itemWithQuantity);
      }
    },
    updateOrder: (state, action: PayloadAction<any>) => {
      const { operation, id } = action.payload;
      if (operation == "delete") {
        const itemIndexToDelete = state.orderItems.findIndex(
          (item: any) => item.id === id
        );

        if (itemIndexToDelete >= 0) {
          // Remove the item from the orderItems array
          state.orderItems.splice(itemIndexToDelete, 1);
        }
      }
      if (action.payload.operation == "decrement") {
        const existingItemIndex = state.orderItems.findIndex(
          (item: any) => item.id === id
        );

        if (existingItemIndex >= 0) {
          // If item exists, update its quantity by 1 and update the selected_items
          const updatedItem = state.orderItems[existingItemIndex];
          if (updatedItem.quantity == 1) {
            return;
          }
          updatedItem.quantity -= 1;

          // Find if the item already exists in selected_items, and update it
          const selectedItemIndex = updatedItem.selected_items.findIndex(
            (selectedItem: any) => selectedItem.id === id
          );

          if (selectedItemIndex >= 0) {
            // Update the existing selected item
            const existingSelectedItem =
              updatedItem.selected_items[selectedItemIndex];
            existingSelectedItem.quantity -= 1;
            existingSelectedItem.totalPrice =
              existingSelectedItem.quantity * existingSelectedItem.price;
          }
        }
      }
      if (action.payload.operation == "increment") {
        const existingItemIndex = state.orderItems.findIndex(
          (item: any) => item.id === id
        );
        if (existingItemIndex >= 0) {
          // If item exists, update its quantity by 1 and update the selected_items
          const updatedItem = state.orderItems[existingItemIndex];
          updatedItem.quantity += 1;
          // Find if the item already exists in selected_items, and update it
          const selectedItemIndex = updatedItem.selected_items.findIndex(
            (selectedItem: any) => selectedItem.id === id
          );
          if (selectedItemIndex >= 0) {
            // Update the existing selected item
            const existingSelectedItem =
              updatedItem.selected_items[selectedItemIndex];
            existingSelectedItem.quantity += 1;
            existingSelectedItem.totalPrice =
              existingSelectedItem.quantity * existingSelectedItem.price;
          }
        }
      }
      // state.orderItems = action.payload;
    },
    setAddOrder: (state, action: PayloadAction<any>) => {
      state.addOrder = action.payload;
    },
  },
});

export const {
  setLoginUserData,
  setTableData,
  setOrderStatusData,
  setMenuItemsData,
  setSubTotalPrice,
  setTotalItemData,
  setOrderItemData,
  setUserDetailsData,
  setCurrentData,
  setOrderTypeId,
  setGroupData,
  setOpenKot,
  setKotData,
  setEditOrder,
  setLiveKot,
  setOrderType,
  setLiveOrder,
  setTablewiseOrer,
  setPaymenttype,
  setCategoryReport,
  setCategoryItemReport,
  seSelsReport,
  setOrderReport,
  paymentpopup,
  setExistsItems,
  setOrderItem,
  updateOrder,
  setCloseDialog,
  setAddOrder
} = billingDataSlice.actions;

export default billingDataSlice.reducer;

function item(value: never, index: number, obj: never[]): unknown {
  throw new Error("Function not implemented.");
}
