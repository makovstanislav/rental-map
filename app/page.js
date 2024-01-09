import dynamic from 'next/dynamic';
import React from 'react';

const RentalsNoSSR = dynamic(
  () => import('@/components/rentals'), 
  { ssr: false } 
);

export default function Home() {
  return (
    <>
      <RentalsNoSSR />
    </>
  );
}
