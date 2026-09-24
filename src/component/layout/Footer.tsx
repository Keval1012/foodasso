import { CiMail } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="bg-gray-100 mt-5">
      <div className="">
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t py-4 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <span className="text-sm text-[#3D3D3DB2]">Need Help?</span>
            <a
              href="tel:01245151586"
              className="flex items-center space-x-1 text-sm text-[#3D3D3DB2]"
            >
              <FiPhoneCall className="h-5 w-5 text-[#3D3D3DB2]" />
              <span className="text-[#3D3D3DB2] pl-2">01245 151586</span>
            </a>
            <span className="text-sm text-[#3D3D3DB2] ">
              contact for support
            </span>
            <a
              href="mailto:support@foodasso.com"
              className="flex items-center space-x-1 text-sm text-[#3D3D3DB2]"
            >
              <CiMail className="h-5 w-5 text-[#3D3D3DB2]" />
              <span className="text-[#3D3D3DB2] pl-2">
                Support@Foodasso.Com
              </span>
            </a>
          </div>
          <div className="flex items-center justify-center md:justify-end">
            <span className="text-sm text-[#3D3D3DB2]">Version: 109.0.5</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
