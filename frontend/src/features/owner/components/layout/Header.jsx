import React from 'react';
import SearchBar from './SearchBar';
import NotificationMenu from './NotificationMenu';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <header className="header">
      <SearchBar />
      <div className="header-actions">
        <NotificationMenu />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
