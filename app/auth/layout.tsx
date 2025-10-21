
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex flex-col md:w-full">
        <div>
            <nav>
                <h1 className="p-4 text-2xl font-bold">Mtush</h1>
            </nav>
        </div>
       <div className="flex-grow p-6 md:overflow-y-auto md:p-12 shadow-sm ">{children}</div>
      </div>
      
    </div>
  );
}