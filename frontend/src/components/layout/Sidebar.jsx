import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/nearby', label: 'Nearby' },
  { to: '/moments', label: 'Moments' },
  { to: '/cart', label: 'Cart' },
  { to: '/orders', label: 'Orders' },
  { to: '/profile', label: 'Profile' }
];

const Sidebar = () => {
  return (
    <aside style={{ width: '220px', padding: '24px 16px', borderRight: '1px solid #e2e8f0', background: '#ffffff', display: { xs: 'none', md: 'block' } }}>
      <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Sections</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              textDecoration: 'none',
              padding: '8px 10px',
              borderRadius: '8px',
              color: isActive ? '#2563eb' : '#334155',
              fontWeight: 600
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
