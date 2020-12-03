exports.httpSuccess = ({ statusCode, data }) => {
	return {
		headers: {
			'Content-Type': 'application/json',
		},
		statusCode,
		data: JSON.stringify(data),
	};
};

exports.httpError = ({ statusCode, errorMessage }) => {
	return {
		headers: {
			'Content-Type': 'application/json',
		},
		statusCode,
		data: JSON.stringify({
			success: false,
			error: errorMessage,
		}),
	};
};
