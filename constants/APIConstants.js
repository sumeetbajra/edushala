var serverUrl = 'http://139.59.111.216:8081/'
var lmsClient = 'http://139.59.111.216:9000/'
//var serverUrl = 'http://192.168.100.21:8080/'

module.exports = {
	LMS_CLIENT: lmsClient,
	COURSE: serverUrl + 'courses/',
  LOGIN: serverUrl + 'users/login/',
  SIGNUP: serverUrl + 'users/create/'
}
