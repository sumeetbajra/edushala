var serverUrl = 'http://139.59.111.216:8081/'
var lmsClient = 'http://139.59.111.216:9000/'
var ezzoClient = 'http://localhost:4232/'
//var serverUrl = 'http://192.168.100.21:8080/'

module.exports = {
	LMS_CLIENT: lmsClient,
	COURSE: serverUrl + 'courses/',
  LOGIN: ezzoClient + 'rs/user/1/auth',
  SIGNUP: serverUrl + 'users/signup'
}
