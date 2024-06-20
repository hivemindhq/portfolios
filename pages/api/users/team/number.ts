import { prisma } from "@/lib/util/db";
import { api } from "@/server/api";
import { NextkitException } from "nextkit";
import { z } from "zod";

const schema = z.object({
	team: z.string().min(1)
});

export default api({
    async POST({ req, res, context }) {
        const body = schema.parse(req.body);

        if (!context.userId) {
            throw new NextkitException(
                401,
                "You must be logged in to access this endpoint"
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                id: context.userId
            }
        })

        if (!user) {
            throw new NextkitException(
              401,
              "You must be logged in to access this endpoint"
            );
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                team: body.team
            }
        })

        return {
            success: true,
            user: user
        }
    }
})