var serverUrl = 'http://139.59.111.216:8081/'
//var serverUrl = 'http://192.168.100.21:8080/'

module.exports = {
	COURSE: serverUrl + 'courses/',
    login: serverUrl + 'users/login/',
    SIGNUP: serverUrl + 'users/create/',
    course_detail: serverUrl + 'courses/:id'
}

