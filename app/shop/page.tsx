import type { Metadata } from 'next';
import Shop from './Shop';

export const metadata: Metadata = {
  title: 'Shop · From The Garden',
  description:
    'Hand-wrapped, seasonally sourced bouquets — classic roses, sweetheart roses, spray roses, and garden roses. Build yours by hand.',
};

export default function ShopPage() {
  return <Shop />;
}
