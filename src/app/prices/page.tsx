import { Suspense } from "react"
import { SubscriptionsLevelList } from "@/app/sdk/components"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function Page() {
  return <>
    <Link href="/">
      <button className="py-2 px-4 border border-white">
        Home
      </button>
    </Link>
    <p className="text-5xl">
      Procat template prices
    </p>
    <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">

      <Suspense fallback={<p>loading...</p>}>
        <SubscriptionsLevelList />
      </Suspense>
    </div>
  </>
}