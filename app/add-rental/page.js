import dynamic from 'next/dynamic';
import React from 'react';

const AddRentalFormNoSSR = dynamic(
  () => import('@/components/add-rental-form'), 
  { ssr: false } 
);

export default function Home() {
  return (
    <>
      <AddRentalFormNoSSR />
    </>
  );
}
