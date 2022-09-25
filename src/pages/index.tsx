import Image from 'next/image';
import React from 'react';

import NavBar from '@/components/NavBar';

import HeroBgImg from '../../public/assets/images/slums.jpeg';

const index = () => {
  return (
    <section className="grid h-screen place-items-center bg-amber-50">
      <NavBar />
      <Image
        className="opacity-10 grayscale"
        src={HeroBgImg}
        alt="hero"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        draggable={false}
        priority
      />
    </section>
  );
};

export default index;
