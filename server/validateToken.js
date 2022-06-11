import greenworks from './greenworks.js';

import { DEC_KEY, APP_ID } from './constants.js';

export default function validateToken(steamid, token, f) {
	const decrypted_app_ticket = greenworks.decryptAppTicket(token, DEC_KEY);

	if (decrypted_app_ticket) {
		const appId = greenworks.getTicketAppId(decrypted_app_ticket);

		if(appId !== APP_ID) {
			return f('ERR_WRONG_APP');
		}

		const steamAcc = greenworks.getTicketSteamId(decrypted_app_ticket);

		if(steamAcc === undefined) {
			return f('ERR_ACC_PROBLEM');
		}

		const id = steamAcc.getRawSteamID();
		if(id === undefined || id !== steamid) {
			return f('ERR_INCORRECT_ACC');
		}

		return f(null, {
			id: steamid,
		});
	}

	return  f('ERR_UNKNOWN');
}
