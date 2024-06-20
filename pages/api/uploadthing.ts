import { profileFileRouter } from "@/server/pic/uploadthing";
import { createRouteHandler } from "uploadthing/next-legacy";

export default createRouteHandler({
    router: profileFileRouter
})