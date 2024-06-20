import { prisma } from "@/lib/util/db";
import { api } from "@/server/api";

// export default api({
//     async GET({req, res}) {
//         const portfolios = await prisma.portfolio.findMany({
//             where: {
//                 division: "FRC"
//             }
//         })

//         return portfolios
//     }
// })