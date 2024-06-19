import { prisma } from "@/lib/util/db";
import { api } from "@/server/api";
import { NextkitException } from "nextkit";
import { z } from "zod";

const schema = z.object({
	teamName: z.string(),
	teamNumber: z.string(),
    type: z.string(),
    season: z.string(),
    downloadLink: z.string(),
    award: z.string(),
    awardRanking: z.string(),
    division: z.string(),
    state: z.string()
});

export default api({
    async POST({req, res, context}) {
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
                owned_portfolios: {
                    create: {
                        team_name: body.teamName,
                        team_number: body.teamNumber,
                        type: body.type,
                        season: body.season,
                        award: body.award,
                        award_ranking: Number(body.awardRanking),
                        download_url: body.downloadLink,
                        approved: false,
                        division: body.division
                    }
                }
            }
        })

        return {
            success: true
        }
    }
})