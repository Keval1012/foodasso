import { IoSearchOutline } from "react-icons/io5";
import TableSidebar from "./TableSidebar";
import Select from "react-select";
import { useEffect, useId, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGroupWiseAllData, getTableWiseOrder, getVariationMenuItem } from "../../../Api/Api";
import DialogBox from "../../common/Dilog-Box";
import PriceDialog from "./TabsComponent/OrderDialog/PriceDialog";
import VariationDialog from "./TabsComponent/OrderDialog/VariationDialog";
import SimpleDialog from "./TabsComponent/OrderDialog/SimpleDialog";
import { useDispatch, useSelector } from "react-redux";
import { setGroupData, setOrderItem } from "../../../redux/Features/BillingDataSlice";
import { setEditOrder } from "../../../redux/Features/BillingDataSlice";
import { setTablewiseOrer } from "../../../redux/Features/BillingDataSlice";
interface TableDataProps {
  areaType?: string;
  tableId?: number;
  tableOrderId?: number;
  tableDetails: any;
  areaTypeId: any;
}

interface Group {
  group_id: string;
  group_name: string;
}

interface ListItem {
  id: string;
  name: string;
  // Add other properties as needed
}

const SelectTable = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { areaType, tableId, tableOrderId, tableDetails, areaTypeId } =
    (location.state as TableDataProps) || {};
    console.log(location.state ,"location.state location.state ")
  const { orderTypeId } = useSelector((state: any) => state.billingData) ?? {};
  const searchId = useId();
  const [groupLabel, setGroupLabel] = useState(null);
  const [allOrderData, setAllOrderData] = useState<any>([]);
  const [categoriesData, setCategoriesData] = useState<any>([]);
  const [menuItems, setMenuItems] = useState<any>([]);
  const [cardItemData, setCardItemData] = useState<any>([]);
  const [allMenuData, setAllMenuData] = useState<any>([]);
  const [allMenuPriceData, setAllMenuPriceData] = useState<any>([]);
  const [allMenuAddOnData, setAllMenuAddOnData] = useState<any>([]);
  const [allMenuVariatioData, setAllMenuVariationData] = useState<any>([]);
  const [addOnData, setAddOnData] = useState<any>([]);
  const [menuItemsVariationData, setMenuItemsVariationData] = useState<any>([]);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);
  const [isVariationModalOpen, setIsVariationModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [tableWiseOrderData, setTableWiseOrderData] = useState([]);

  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);
  const handleOpenPriceDialog = () => {
    setIsPriceModalOpen(true);
  };
  const handleOpenSimpleDialog = () => {
    setIsSimpleModalOpen(true);
  };
  const handleOpenVariationDialog = () => {
    setIsVariationModalOpen(true);
  };

  const handleClosePriceDialog = () => {
    setIsPriceModalOpen(false);
  };
  const handleCloseSimpleDialog = () => {
    setIsSimpleModalOpen(false);
  };
  const handleCloseVariationDialog = () => {
    setIsVariationModalOpen(false);
  };

  const handleItemSelect = (menu: any) => {
    if (menu?.is_variation === true) {
      setIsVariationModalOpen(true);
      setCardItemData(menu);
      // setAllMenuVariationData((prevCardItemData: any) => {
      //   if (!Array.isArray(prevCardItemData)) {
      //     return [menu];
      //   }
      //   const isItemAlreadyAdded = prevCardItemData.some((item: any) => item.id === menu.id);
      //   if (!isItemAlreadyAdded) {
      //     return [...prevCardItemData, menu];
      //   }
      //   return prevCardItemData;
      // });
    } else if (menu?.is_add_on === true) {
      setIsSimpleModalOpen(true);
      setCardItemData(menu);
      // setAllMenuAddOnData((prevCardItemData: any) => {
      //   if (!Array.isArray(prevCardItemData)) {
      //     return [menu];
      //   }
      //   const isItemAlreadyAdded = prevCardItemData.some((item: any) => item.id === menu.id);
      //   if (!isItemAlreadyAdded) {
      //     return [...prevCardItemData, menu];
      //   }
      //   return prevCardItemData;
      // });
    } else if (menu?.price === 0) {
      setIsPriceModalOpen(true);
      setCardItemData(menu);
      // setAllMenuPriceData((prevCardItemData: any) => {
      //   debugger
      //   if (!Array.isArray(prevCardItemData)) {
      //     return [menu];
      //   }
      //   const isItemAlreadyAdded = prevCardItemData?.some((item: any) => item.id === menu.id);
      //   if (!isItemAlreadyAdded) {
      //     return [...prevCardItemData, menu];
      //   }
      //   return prevCardItemData;
      // });
    } else {
      setIsPriceModalOpen(false);
      setIsSimpleModalOpen(false);
      setIsVariationModalOpen(false);
      setCardItemData(menu);
      setAllMenuData((prevCardItemData: any) => {
        const isItemAlreadyAdded = prevCardItemData.some(
          (item: any) => item.id === menu.id
        );
        if (!isItemAlreadyAdded) {
          return [...prevCardItemData, menu];
        }
        return prevCardItemData;
      });
      let items={...menu}
dispatch(setOrderItem(items))
    }
  };

  useEffect(() => {
    fetchGroupWiseAllData(groupWiseData);
  }, [selectedTab]);

  useEffect(() => {
    if (cardItemData?.id) fetchVariationMenuItem(cardData);
  }, [cardItemData?.id]);

  useEffect(() => {
    fetchTableWiseOrder();
  }, []);

  const fetchTableWiseOrder = async () => {
 
    let data = {
      order: tableOrderId,
    };

    try {
      const res = await getTableWiseOrder(data);
      if (res.status === 200) {
        setTableWiseOrderData(res.data?.data);
        dispatch(setTablewiseOrer(res.data?.data))
      }
    } catch (error) {
      dispatch(setTablewiseOrer({}))

    }
  };

  const groupWiseData = {
    kitchen_id: 1,
    order_id:tableOrderId,
    order_type: selectedTab,
  };

  const cardData = {
    menu_item: cardItemData?.id,
    outlet: 1,
    kitchen: 1,
    area_type: areaType,
  };
  const fetchGroupWiseAllData = async (data: any) => {
    const res = await getGroupWiseAllData(groupWiseData);
    if (res?.status === 200) {
      setAllOrderData(res?.data?.data);
      dispatch(setGroupData(res?.data?.data));
    }
  };
  const fetchVariationMenuItem = async (data: any) => {
    const res = await getVariationMenuItem(cardData);
    if (res?.status === 200) {
      // debugger
      setAddOnData(res?.data?.data?.add_on_details);
      setMenuItemsVariationData(res?.data?.data?.menu_items_variation);
    }
  };

  // const groups = [
  //   { group_id: 1, group_name: 'gd', categories: [{ category_id: 1, category_name: 'fdg' }, { category_id: 2, category_name: 'fdfghg' }] },
  //   { group_id: 2, group_name: 'a', categories: [{ category_id: 1, category_name: 'gd' }, { category_id: 2, category_name: 'gds' }] },
  //   { group_id: 3, group_name: 'ddf', categories: [{ category_id: 1, category_name: 'hgj' }, { category_id: 2, category_name: 'hgfj' }] }
  // ];

  // const categories = [
  //   { category_id: 1, category_name: 'gd', menu_items: [{ menu_id: 1, name: 'fdg' }, { menu_id: 2, name: 'fdfghg' }] },
  //   { category_id: 2, category_name: 'a', menu_items: [{ menu_id: 1, name: 'gd' }, { menu_id: 2, name: 'gds' }] },
  //   { category_id: 3, category_name: 'ddf', menu_items: [{ menu_id: 1, name: 'hgj' }, { menu_id: 2, name: 'hgfj' }] }
  // ];

  // const menus = [
  //   { menu_id: 1, name: 'fdg', price: 500 },
  //   { menu_id: 2, name: 'gd', price: 0 },
  //   { menu_id: 3, name: 'hgj', price: 500 }
  // ];

  // const groupOptions = (allOrderData?.groups || [])?.map((item: any) => ({
  //   value: item.group_id,
  //   label: item.group_name
  // }));

  const groupOptions = useMemo(() => {
    return (allOrderData?.groups || [])?.map((item: any) => ({
      value: item.group_id,
      label: item.group_name,
    }));
  }, [allOrderData]);

  const [defaultSelectedValue, setDefaultSelectedValue] = useState<any>(
    groupOptions[0] || null
  );
  const [defaultSelectedMenu, setDefaultSelectedMenu] = useState<any>(
    menuItems?.[0] || null
  );

  // useEffect(() => {
  //   if (groupOptions.length > 0) {
  //     handleGroupChange(groupOptions[0]);
  //   }
  // }, [groupOptions]);

  useEffect(() => {
    if (groupOptions.length > 0) {
      const firstGroup = groupOptions[0];
      setDefaultSelectedValue(firstGroup);

      const selectedGroup = allOrderData?.groups?.find(
        (group: any) => group.group_id === firstGroup.value
      );
      const categories = selectedGroup ? selectedGroup.categories : [];
      setCategoriesData(categories);

      if (categories.length > 0) {
        const firstCategory = categories[0];
        setMenuItems(firstCategory.menu_items || []);
      }
    }
  }, [groupOptions, allOrderData]);

  const handleGroupChange = (selectedGroupOption: any) => {
 
    setGroupLabel(selectedGroupOption);
    // setDefaultSelectedValue(selectedGroupOption);
    const selectedGroup = allOrderData?.groups?.find(
      (group: any) => group.group_id === selectedGroupOption.value
    );
    setCategoriesData(selectedGroup ? selectedGroup.categories : []);

    setMenuItems(selectedGroup?.categories[0]?.menu_items);
  };
  console.log("select", categoriesData);

  const handleCategoryClick = (category: any) => {
    setMenuItems(category?.menu_items);
  };

  const handleActiveCategory = (id: number) => {
    setActiveCategoryId(id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,25rem] gap-4">
      {/* Main content section */}
      <div className="pl-4 space-y-4">
        {/* Search bar */}
        {/* <form className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <IoSearchOutline className="ml-2 text-gray-900" size={25} />
            </div>
            <input
              type="search"
              id={searchId}
              className="outline-none block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Search Here"
              required
            />
          </div>
        </form> */}

        {/* Select dropdown and card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[20rem,1fr] gap-4">
          {/* Select dropdown */}
          <div className="border-dashed">
            {/* <Select
            //   className="w-full shadow-sm sm:text-sm"
            //   options={[
            //     { value: "foodies7", label: "Foodies 7" },
            //     { value: "foodies8", label: "Foodies 8" },
            //   ]}
            //   defaultValue={{ value: "foodies7", label: "Foodies 7" }}
            // /> */}
            <Select
              className="w-full shadow-sm sm:text-sm"
              options={groupOptions}
              value={groupLabel || defaultSelectedValue}
              onChange={handleGroupChange}
              placeholder="Select a group"
            />
            <ul className=" border border-gray-300">
              {categoriesData?.map((category: any) => (
                <li
                  key={category.category_id}
                  className={`cursor-pointer border border-gray-300 p-3 ${
                    activeCategoryId === category.category_id
                      ? 'bg-gradient-to-r from-[rgba(255,158,27,0.4)] to-transparent'
                      : ''
                  }`}
                  onClick={() => {
                    handleCategoryClick(category);
                    handleActiveCategory(category.category_id);
                  }}
                >
                  {category.category_name}
                </li>
              ))}
            </ul>
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* {["Card1", "Card2", "Card3", "Card4"].map((card, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md p-2 flex flex-col items-center justify-center space-y-2"
              >
                <img
                  src={ImageFruite}
                  alt={`Card ${index + 1}`}
                  className="h-24 w-24 object-cover cursor-pointer"
                />
                <h2 className="font-medium text-sm">{card}</h2>
              </div>
            ))} */}

            {menuItems?.map((card: any) => (
              <div
                key={card?.id}
                className={`border rounded-lg shadow-md p-2 ${
                  card.dietary_name === "Veg"
                    ? "border-b-4 border-b-green-500"
                    : "border-b-4 border-b-red-500"
                } flex flex-col items-center justify-center space-y-2`}
                onClick={() => {
                  // handleOpenPriceDialog();
                  // handleOpenSimpleDialog();
                  // handleOpenVariationDialog();
                  handleItemSelect(card);
                }}
              >
                <img
                  src={""} //card?.image
                  alt={card?.name}
                  className="h-24 w-24 object-cover cursor-pointer"
                />
                <h2 className="font-medium text-sm">{card?.name}</h2>
              </div>
            ))}

            {/* {categories.map((category) => (
              <div
                key={category.category_id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="p-4 flex flex-col items-center justify-center space-y-2">
                  <img
                    src="/api/placeholder/100/100"
                    alt={category.category_name}
                    className="h-24 w-24 object-cover"
                  />
                  <h2 className="font-medium text-sm">{category.category_name}</h2>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Sidebar section */}
      <div className="border">
        <TableSidebar
          areaType={areaType}
          tableId={tableId}
          tableDetails={tableDetails}
          allMenuData={allMenuData}
          setAllMenuData={setAllMenuData}
          allMenuPriceData={allMenuPriceData}
          setAllMenuPriceData={setAllMenuPriceData}
          allMenuAddOnData={allMenuAddOnData}
          setAllMenuAddOnData={setAllMenuAddOnData}
          allMenuVariatioData={allMenuVariatioData}
          setAllMenuVariationData={setAllMenuVariationData}
          areaTypeId={areaTypeId}
          setSelectedTab={setSelectedTab}
          tableWiseOrderData={tableWiseOrderData}
        />
      </div>

      {cardItemData?.price === 0 && (
        <DialogBox
          isOpen={isPriceModalOpen}
          onClose={handleClosePriceDialog}
          title={cardItemData?.name}
          children={
            <PriceDialog
              setIsPriceModalOpen={setIsPriceModalOpen}
              cardItemData={cardItemData}
              allMenuPriceData={allMenuPriceData}
              setAllMenuPriceData={setAllMenuPriceData}
              selectedTab={selectedTab}
            />
          }
        />
      )}
      {cardItemData?.is_add_on === true && (
        <DialogBox
          isOpen={isSimpleModalOpen}
          onClose={handleCloseSimpleDialog}
          title={cardItemData?.name}
          children={
            <SimpleDialog
              setIsSimpleModalOpen={setIsSimpleModalOpen}
              cardItemData={cardItemData}
              addOnData={addOnData}
              allMenuAddOnData={allMenuAddOnData}
              setAllMenuAddOnData={setAllMenuAddOnData}
            />
          }
        />
      )}
      {cardItemData?.is_variation === true && (
        <DialogBox
          isOpen={isVariationModalOpen}
          onClose={handleCloseVariationDialog}
          title={cardItemData?.name}
          children={
            <VariationDialog
              setIsVariationModalOpen={setIsVariationModalOpen}
              cardItemData={cardItemData}
              menuItemsVariationData={menuItemsVariationData}
              allMenuVariatioData={allMenuVariatioData}
              setAllMenuVariationData={setAllMenuVariationData}
            />
          }
        />
      )}
    </div>
  );
};

export default SelectTable;