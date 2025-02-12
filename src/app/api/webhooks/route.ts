import { withWebhook } from "@/app/sdk/middleware"

export const POST = withWebhook(async (req) => {
  return Response.json({})
})

