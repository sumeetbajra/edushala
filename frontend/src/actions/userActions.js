//Example of synchronous action

/**
function loginSuccess(payload) {
	return {
		type: 'LOGIN_SUCCESS',
		payload
	}
}
**/


//Example of asynchronous action

/**
export function login(payload) {
	return (dispatch) => {
		setTimeout(function() {
			if(payload.username === 'admin' && payload.password === 'password') {
				dispatch(loginSuccess(payload));
			}else {
				dispatch(loginFailure());
			}	
		}, 2000);
	}
}

**/

