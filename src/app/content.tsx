import { getSubExpires, Guard } from "@/app/sdk"
import Image from "next/image"
import { ComponentProps, Suspense } from "react"
import { auth } from "./auth"
import { SignIn, SignOut } from "./signin"
import Link from "next/link"

export const revalidate = 0;

const config = {
  expiredFallback: <Link className="flex items-center gap-2" href={`${process.env.PROCAT_ID_HOST!}/clients/to/${process.env.PROCAT_CLIENT_ID!}`}>
    <span>
      Expired
    </span>
    <button className="py-2 px-4 border border-white" type="submit">
      Update sub with Procat
    </button>
  </Link>,
  noAccessFallback: <p>not access - you dont have subscriptions</p>
}

type ContentItemProps = {
  url: string
  type: 'video' | 'image'
}

const ContentItem = ({
  url,
  type = "image"
}: ContentItemProps) => {
  return <div className="w-full h-full relative">
    {type === "image" && <Image fill src={url} className="object-fill w-64" alt={url} />}
    {type === "video" && <video controls className="object-fill"><source src={url}></source></video>}
  </div>
}

export const Content = async () => {
  const session = await auth()

  if (!session?.user) {
    return <section className="flex flex-col items-center justify-center gap-3">
      <SignIn />
    </section>
  }

  return <div className="flex flex-col gap-4 items-center justify-center">
    <section className="flex flex-col items-center justify-center gap-3">
      <SignOut />
      <section className="border p-4 border-white">
        <Suspense fallback={<p>loading...</p>}>
          <Guard level="grand_simple" {...config}>
            <div className="p-4 border border-white">
              <ContentItem type="video" url="https://media.vlipsy.com/vlips/mUveS7b3/360p.mp4" />
              Secret content simple for {getSubExpires(session, "grand_simple").toLocaleString()}
            </div>
          </Guard>
        </Suspense>
        <Suspense fallback={<p>loading...</p>}>
          <Guard level="grand_middle" {...config}>
            <div className="p-4 border border-white">
              <ContentItem type="video" url="https://media.vlipsy.com/vlips/5A7qVpH3/360p.mp4" />
              Secret content middle for {getSubExpires(session, "grand_middle").toLocaleString()}
            </div>
          </Guard>
        </Suspense>
        <Suspense fallback={<p>loading...</p>}>
          <Guard level="grand_all" {...config}>
            <div className="p-4 border border-white">
              <ContentItem type="video" url="https://media.vlipsy.com/vlips/tVmiYVBz/360p.mp4" />
              Secret content full for {getSubExpires(session, "grand_all").toLocaleString()}
            </div>
          </Guard>
        </Suspense>
      </section>
    </section>
  </div>
}