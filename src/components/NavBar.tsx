import React from 'react';

import calcTime from '@/utils/calc-time';

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
    <div className="z-10 mx-auto flex-col items-center">
      <div className="flex flex-col">
        <div className="mb-2 select-none border-b-4 border-stone-400 text-center">
          <h1 className="text-3xl font-bold uppercase italic">Gadha&#8482;</h1>
          <h3 className="-mt-2 mb-1 text-xs font-light lowercase tracking-tighter">
            not modern enough
          </h3>
        </div>
        {items.map((item) => {
          return <NavItem {...item} key={item.label} />;
        })}
      </div>
      <p className="mt-2 font-semibold lowercase text-stone-500 ">
        Chicago | {calcTime(-5)}
      </p>
    </div>
  );
};

export default NavBar;
