import React from 'react';

import type { INavItem } from './NavItem';
import { NavItem } from './NavItem';

const items: INavItem[] = [
  { label: 'About', href: '/about', index: 1 },
  { label: 'Preview', href: '/preview', index: 2 },
  { label: 'Lookbook', href: '/lookbook', index: 3 },
  { label: 'Archive', href: '/archive', index: 4 },
  { label: 'Contact', href: '/contact', index: 5 },
  { label: 'Shop', href: '/shop', index: 6 },
];

const NavBar = () => {
  return (
    <>
      {items.map((item) => {
        return <NavItem {...item} key={item.label} />;
      })}
    </>
  );
};

export default NavBar;
