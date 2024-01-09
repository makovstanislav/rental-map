import dynamic from 'next/dynamic';
import React from 'react';

const RentalsNoSSR = dynamic(
  () => import('@/components/rentals'), 
  { ssr: false } // Disable server-side rendering for this component
);

export default function Home() {
  return (
    <>
      <RentalsNoSSR />
    </>
  );
}
