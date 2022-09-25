import Link from 'next/link';
import React from 'react';

export interface INavItem {
  href: string;
  label: string;
  index: number;
}

export const NavItem = ({ href, label, index }: INavItem) => {
  return (
    <Link className="!text-black" href={href}>
      <div className="mb-1 flex w-full cursor-pointer justify-between hover:underline">
        <p className="lowercase">{label}</p>
        <p>{index}</p>
      </div>
    </Link>
  );
};
