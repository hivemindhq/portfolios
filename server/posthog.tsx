'use client';

import posthog from 'posthog-js';
import {PostHogProvider} from 'posthog-js/react';
import {ReactNode} from 'react';

if (typeof window !== 'undefined') {
	posthog.init(process.env.POSTHOG_KEY as string, {
		api_host: process.env.POSTHOG_HOST,
	});
}

export function PHProvider({children}: {children: ReactNode}) {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
