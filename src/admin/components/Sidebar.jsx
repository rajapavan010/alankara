import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      path: "/admin/products",
    },
    {
      name: "Orders",
      path: "/admin/orders",
    },
    {
      name: "Newsletter",
      path: "/admin/newsletter",
    },
    {
      name: "Settings",
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <h2>ALANKARA</h2>
        <p>Admin Panel</p>
      </div>

      <nav>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "admin-nav active"
                : "admin-nav"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;