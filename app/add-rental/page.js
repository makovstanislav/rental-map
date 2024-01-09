import dynamic from 'next/dynamic';
import React from 'react';

const AddRentalFormNoSSR = dynamic(
  () => import('@/components/add-rental-form'), 
  { ssr: false } // Disable server-side rendering for this component
);

export default function Home() {
  return (
    <>
      <AddRentalFormNoSSR />
    </>
  );
}
