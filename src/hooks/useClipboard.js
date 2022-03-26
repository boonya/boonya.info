import {useCallback} from 'react';

export default function useClipboard(newClip) {
	return useCallback(async () => {
		try {
			const result = await navigator.permissions.query({name: 'clipboard-write'});
			if (result.state === 'granted' || result.state === 'prompt') {
				await navigator.clipboard.writeText(newClip);
			}
		}
		catch (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		}
	}, [newClip]);
}
