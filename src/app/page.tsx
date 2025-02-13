import { Suspense } from "react";
import { Content } from "./content";
import Link from "next/link";
import { auth } from "./auth";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const session = await auth()

  return (
    <>
      {session?.user && <Link href="/prices">
        <button className="py-2 px-4 border border-white" type="submit">
          Prices
        </button>
      </Link>
      }
      <p className="text-5xl">
        This is Procat SaaS template
      </p>
      <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
        <Suspense fallback={<span>loading...</span>}>
          <Content />
        </Suspense>
      </div>
    </>
  );
}
