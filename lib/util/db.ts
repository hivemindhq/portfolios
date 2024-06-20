import {PrismaClient} from '@prisma/client';

const getClient = () => new PrismaClient();

const g = global as unknown as {__prisma__: ReturnType<typeof getClient>};

export const prisma = g.__prisma__ || (g.__prisma__ = getClient());
