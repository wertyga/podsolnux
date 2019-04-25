import React from 'react';
import { withRouter } from 'react-router-dom';

const SubMenuComponent = ({ menu, onClick, history }) => {
  const handleClick = (href = '/') => {
    onClick();
    history.push(href)
  }
  return (
    <div className="menu-item__submenu">
      {menu.map(({ title, children, href }) => (
        <ul key={title}>
          <li className="menu-item__submenu_title">{title}</li>
          {children.map((child, i) => (
            <li
              key={i}
              className="menu-item__submenu__child"
              onClick={() => handleClick(href)}
            >
              {child.title}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export const SubMenu = withRouter(SubMenuComponent);