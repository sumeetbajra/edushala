var checkAuth = function(req, res, next) {
    if(localStorage.getItem('is_secure'))  {
        next ()
    } else {
        location.replace('/login')
    }
}

module.exports = checkAuth