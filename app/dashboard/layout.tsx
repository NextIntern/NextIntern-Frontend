import { FC } from "react";
import { CiLogout, CiHome, CiViewBoard, CiSettings, CiCalendar, CiViewList, CiEdit, CiStickyNote    } from "react-icons/ci";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ href, children, icon }) => {  
  return (
    <a
      href={href}
      className="flex items-center py-2 px-4 text-sm hover:bg-gray-200 transition-colors duration-300"
    >
      {icon}
      <span className="ml-2">{children}</span>
    </a>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white text-gray-600 w-64 flex flex-col rounded-lg overflow-hidden shadow-xl">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center bg-gray-800 text-white">
          <h1 className="text-2xl font-bold">NextIntern</h1>
        </div>
        {/* Navigation Links */}
        <div className="flex-1 flex flex-col justify-between mt-6 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
          <div>
            <NavLink href="/" icon={<CiHome size={20} />}>Home</NavLink>
            <div className="mt-6 ">
              <NavLink href="/" icon={<CiViewBoard size={20} />}>Dashboard</NavLink>
            </div>
            <div className="mt-6 ">
              <NavLink href="/" icon={<CiViewList  size={20} />}>Intern Management</NavLink>
            </div>
            <div className="mt-6 ">
              <NavLink href="/" icon={<CiEdit size={20} />}>Training Campaign</NavLink>
            </div>
            <div className="mt-6 ">
              <NavLink href="/" icon={<CiStickyNote  size={20} />}>Learning Material</NavLink>
            </div>
            <div className="mt-6 ">
              <NavLink href="/" icon={<CiCalendar  size={20} />}>Training Calendar</NavLink>
            </div>
            <div className="mt-6 ">
              <NavLink href="/" icon={<CiSettings  size={20} />}>Setting</NavLink>
            </div>
            {/* Add more navigation links */}
          </div>
          <div className="mb-8">
            <form>
              <button className="flex items-center gap-2 py-2 px-4
               bg-white hover:bg-gray-100 transition-colors duration-300 rounded-lg">
                <CiLogout className="text-xl" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
