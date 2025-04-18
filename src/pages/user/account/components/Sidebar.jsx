import React from 'react';
import { AiOutlineEdit, AiOutlineFileProtect, AiOutlineFileText, AiOutlineQuestionCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import avatars from '../../../../Images/avatars.png';

const Sidebar = ({ activePage, setIsSidebarOpen }) => {
    const profile = useSelector((state) => state.auth.userInfo);

    const handleLinkClick = () => {
        if (setIsSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* User Profile Section */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        src={profile?.avatarUrl ? `${process.env.REACT_APP_CDN_URL}${profile?.avatarUrl}` : avatars}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="min-w-0">
                    <div className="font-bold text-base truncate">{profile?.fullName || ""}</div>
                    <div className="text-sm text-gray-500 truncate">{profile?.email || "Chưa cập nhật email"}</div>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="space-y-6">
                {/* Account Section */}
                <div className="space-y-2">
                    <div className="text-gray-500 text-xs font-semibold tracking-wider">
                        TÀI KHOẢN
                    </div>
                    <div className="space-y-1">
                        <NavLink
                            to="/account/profile"
                            className={({ isActive }) => `flex items-center gap-3 w-full p-2 rounded-lg transition-colors
                                ${isActive || activePage === 'profile'
                                    ? 'bg-orange-50 text-orange-500'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            onClick={handleLinkClick}
                        >
                            <AiOutlineEdit className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">Chỉnh sửa hồ sơ</span>
                        </NavLink>

                        <NavLink
                            to="/account/orders"
                            className={({ isActive }) => `flex items-center gap-3 w-full p-2 rounded-lg transition-colors
                                ${isActive || activePage === 'orders'
                                    ? 'bg-orange-50 text-orange-500'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            onClick={handleLinkClick}
                        >
                            <AiOutlineFileText className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">Đơn hàng của tôi</span>
                        </NavLink>
                    </div>
                </div>

                {/* Support Section */}
                <div className="space-y-2">
                    <div className="text-gray-500 text-xs font-semibold tracking-wider">
                        HỖ TRỢ
                    </div>
                    <div className="space-y-1">
                        <NavLink
                            to="/account/help"
                            className={({ isActive }) => `flex items-center gap-3 w-full p-2 rounded-lg transition-colors
                                ${isActive || activePage === 'help'
                                    ? 'bg-orange-50 text-orange-500'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            onClick={handleLinkClick}
                        >
                            <AiOutlineQuestionCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">Trợ giúp</span>
                        </NavLink>

                        <NavLink
                            to="/account/terms"
                            className={({ isActive }) => `flex items-center gap-3 w-full p-2 rounded-lg transition-colors
                                ${isActive || activePage === 'terms'
                                    ? 'bg-orange-50 text-orange-500'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            onClick={handleLinkClick}
                        >
                            <AiOutlineFileProtect className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">Điều khoản dịch vụ</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;