import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/nearby', label: 'Nearby' },
  { to: '/moments', label: 'Moments' },
  { to: '/profile', label: 'Profile' }
];

const BottomNavigation = () => {
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', padding: '10px 8px', zIndex: 20 }}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#2563eb' : '#64748b',
            fontWeight: 600,
            fontSize: '0.9rem'
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavigation;
