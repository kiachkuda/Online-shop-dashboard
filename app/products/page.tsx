import Products from '@/app/ui/components/Products'
import { Suspense }from 'react'

function page() {
  return (
    <Suspense>
      <Products />
    </Suspense>
    
  )
}

export default page