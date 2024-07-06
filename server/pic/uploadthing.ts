import {createUploadthing, type FileRouter} from 'uploadthing/next-legacy';
import {UploadThingError} from 'uploadthing/server';
import {getSessionFromRequest} from '../sessions';
import {prisma} from '@/lib/util/db';

let f = createUploadthing();

export const profileFileRouter = {
	imageUploader: f({image: {maxFileSize: '2MB', maxFileCount: 1}})
		.middleware(async ({req, res}) => {
			const user = await getSessionFromRequest(req);
			if (!user) throw new UploadThingError('Unauthorized');

			const pUser = await prisma.user.findFirst({
				where: {
					id: user,
				},
			});

			if (!pUser) throw new UploadThingError('Unauthorized');

			if (!pUser?.verified) {
				throw new UploadThingError('Not verified');
			}

			return {userId: user};
		})
		.onUploadComplete(async ({metadata, file}) => {
			const user = await prisma.user.findFirst({
				where: {
					id: metadata.userId,
				},
			});

			if (!user) throw new UploadThingError('Unauthorized');

			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					profile_picture: file.url,
				},
			});
		}),
} satisfies FileRouter;

export type ProfilePictureFileRouter = typeof profileFileRouter;
