import {envsafe, str, url} from 'envsafe';

export const env = envsafe({
	POSTHOG_KEY: str({
		desc: 'PostHog API Key',
	}),
	POSTHOG_ID: str({
		desc: 'PostHog API ID',
	}),
	POSTHOG_HOST: url({
		desc: 'PostHog Host',
	}),
});
