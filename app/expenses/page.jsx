import { Suspense } from 'react'
import ExpensesClient from './ExpensesClient'

export default  async function ExpensesPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <ExpensesClient />
    </Suspense>
  )
}