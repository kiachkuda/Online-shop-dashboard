import Products from '@/app/ui/components/Products';
import HeroCarousel from '@/app/ui/components/HeroCarousel';


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-0 sm:p-6 md:p-6 w-full bg-white">
      <HeroCarousel />
      <Products />
    </main>
  );
}
