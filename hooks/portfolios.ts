import {pb} from '@/lib/db/pocketbase';

enum Field {
	WORLDS,
	REGIONALS,
	QUALIFIER,
}

enum Award {
	CONTROL,
	INSPIRE,
	MOTIVATE,
	INNOVATE,
	DESIGN,
	CONNECT,
	THINK,
}

export function getPortfolioTypes(type: Field) {
	let div;

	switch (type) {
		case Field.WORLDS: {
			div = 'worlds';
			break;
		}
		case Field.QUALIFIER: {
			div = 'qualifier';
			break;
		}
		case Field.REGIONALS: {
			div = 'regionals';
			break;
		}
	}
}
