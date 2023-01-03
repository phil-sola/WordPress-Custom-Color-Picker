import { dispatch } from '@wordpress/data';
import { store as noticesStore  } from '@wordpress/notices';

// Flexible snackbar notice
export function MySnackbarNotice(type, message) {
	const { createNotice } = dispatch(noticesStore);

	createNotice(
		type, // Can be one of: success, info, warning, error.
		message, // Text string to display.
		{
			type: "snackbar",
		}
	);
}
