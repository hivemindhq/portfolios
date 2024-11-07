import {envsafe, str, url} from 'envsafe';

export const env = envsafe({
	REDIS_URL: str(),
});
