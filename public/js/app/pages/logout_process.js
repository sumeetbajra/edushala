$(document).ready(function() {
    sessionMgr.set('isLoggedIn', false);
    sessionMgr.set('user', null);
    sessionMgr.set('is_secure', false);
    location.replace('/');
});

