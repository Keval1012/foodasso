import { FiRefreshCcw } from 'react-icons/fi'

const InfoBill = () => {
  return (
    <div className="mb-16 right-[50%] left-[50%]">
        <div className="flex flex-col items-center justify-center space-y-4 p-6">
          <p className="text-center text-gray-700">All Orders Are Not Synced</p>

          {/* Sync Icon */}
          <FiRefreshCcw className="text-2xl text-gray-700 " />

          {/* Status Legends */}
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <span className="block w-4 h-4 bg-gray-300 rounded-full"></span>
              <span className="text-gray-700">Save</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="block w-4 h-4 bg-teal-400 rounded-full"></span>
              <span className="text-gray-700">Printed</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="block w-4 h-4 bg-green-400 rounded-full"></span>
              <span className="text-gray-700">Paid</span>
            </div>
          </div>
        </div>
        </div>
  )
}

export default InfoBill
