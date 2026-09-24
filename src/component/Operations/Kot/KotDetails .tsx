import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { getOperationKotDetails } from "../../../Api/Operation/Api";

const KotDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kotDetails, setKotDetails] = useState<any>({});

  useEffect(() => {
    fetchKotDetails();
  }, [id]);

  const fetchKotDetails = async () => {
    if (id) {
      let res = await getOperationKotDetails(id);
      if (res.status === 200) {
        setKotDetails(res.data?.data);
      }
    }
  };

  // console.log("kotDetails", kotDetails);

  return (
    <div className="p-6">
      {/* Order Details Header */}
      <div className="bg-white p-4 rounded-lg ">
        <div className=" flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div
            className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
        <div className=" overflow-auto">
          <table className="w-full overflow-x-auto text-sm border mt-5">
            <thead className="bg-[#f2f2f2] border">
              <tr>
                <th className="border p-2  text-xs text-center">KOT No.</th>
                <th className="border p-2  text-xs text-center">
                  Billing User
                </th>
                <th className="border p-2  text-xs text-center">
                  Customer Name
                </th>
                <th className="border p-2  text-xs text-center">
                  Customer Phone
                </th>
                <th className="border p-2  text-xs text-center">
                  Customer Address
                </th>
                <th className="border p-2  text-xs text-center">
                  Customer Locality
                </th>
                <th className="border p-2  text-xs text-center">Order Type</th>
                <th className="border p-2  text-xs text-center">
                  No. Of Persons
                </th>
                <th className="border p-2  text-xs text-center">created</th>
              </tr>
            </thead>
            <tbody>
              <tr key={kotDetails?.id}>
                <td className="border p-2  text-xs text-center">
                  {kotDetails?.kot_no ?? "--"}
                </td>
                <td className="border p-2  text-xs text-center">
                  {kotDetails?.order?.biller_name ?? "--"}
                </td>
                <td className="border p-2  text-xs text-center">
                  {kotDetails?.order?.customer_name ?? "--"}
                </td>
                <td className="border p-2  text-xs text-center">
                  {kotDetails?.order?.customer_phone ?? "--"}
                </td>
                <td className="border p-2  text-xs text-center">
                  {kotDetails?.order?.customer_address ?? "--"}
                </td>
                <td className="border p-2  text-xs text-center">
                  {kotDetails?.order?.customer_location ?? "--"}
                </td>
                <td className="border p-2  text-xs text-center">
                  {kotDetails?.order?.order_type ?? "--"} (
                  {kotDetails?.order?.table ?? "--"})
                </td>
                <td className="border p-2  text-xs text-center">
                  {kotDetails?.order?.no_of_person ?? "--"}
                </td>
                <td className="border p-2  text-xs text-center">
                  {dayjs(new Date(kotDetails?.create_time)).format(
                    "DD-MM-YYYY HH:mm:s"
                  ) ?? "--"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg  mt-4">
        <h3 className="text-lg font-semibold mb-2">KOT tems</h3>

        <table className="w-full text-sm border">
          <thead className="bg-[#f2f2f2] border">
            <tr>
              <th className="border p-2 text-center text-xs">Item Name</th>
              <th className="border p-2 text-center text-xs">Special Note</th>
              <th className="border p-2 text-center text-xs">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {kotDetails?.items?.map((item: any) => (
              <tr key={item?.id}>
                <td className="border p-2 text-center text-xs">
                  {item?.name ?? "--"}
                </td>
                <td className="border p-2 text-center text-xs">
                  {item?.special_notes ?? "--"}
                </td>
                <td className="border p-2 text-center text-xs">
                  {item?.quantity ?? "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Items */}
    </div>
  );
};

export default KotDetails;
