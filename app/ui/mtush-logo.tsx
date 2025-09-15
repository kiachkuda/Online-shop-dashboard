import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana, roboto } from '@/app/ui/fonts';

export default function MtushLogo() {
  return (
    <div
      className={`${roboto.className} flex flex-row items-center leading-none`}
    >
      <GlobeAltIcon className="mr-3 h-10 w-10 text-black" />
      <p className="text-4xl text-black font-bold">Mtush</p>
    </div>
  );
}
