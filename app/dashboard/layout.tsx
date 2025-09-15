import SideNav from '@/app/ui/dashboard/sidenav';
import UserProfile from '../ui/dashboard/user-profile';
import TopNav from '../ui/dashboard/topnav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="w-full flex flex-col md:w-full">
        <TopNav />
       <div className="flex-grow p-6 md:overflow-y-auto md:p-12 shadow-sm ">{children}</div>
      </div>
      
    </div>
  );
}