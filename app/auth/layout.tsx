
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex flex-col md:w-full">
        
            <nav className="md:pl-12 justify-center md:py-5">
                <a href='/' className="text-2xl font-bold">
                    Mtush</a>
            </nav>
       
       <div className="flex-grow p-6 md:overflow-y-auto md:p-12 shadow-sm ">{children}</div>
      </div>
      
    </div>
  );
}