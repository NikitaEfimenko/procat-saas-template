import { Suspense } from "react";
import { Content } from "./content";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 justify-center items-center">
        <p className="text-5xl">
          This is Procat SaaS template
        </p>
        <div className="flex gap-4 items-center justify-center flex-col sm:flex-row">
          <Suspense fallback={<span>loading...</span>}>
            <Content/>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
