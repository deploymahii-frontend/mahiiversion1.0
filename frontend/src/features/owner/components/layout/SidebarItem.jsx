import React from 'react';

const SidebarItem = ({ icon, label, path, isActive }) => {
  return (
    <li className={`sidebar-item ${isActive ? 'active' : ''}`}>
      {/* Sidebar item content */}
    </li>
  );
};

export default SidebarItem;
