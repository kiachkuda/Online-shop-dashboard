import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Products from '@/app/ui/components/Products';



export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-0 sm:p-6 md:p-6">
      <Products />
    </main>
  );
}
