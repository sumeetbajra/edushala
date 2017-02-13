module.exports = {
    signup: {
        subject:'Thank you for signing up. Please verify',
        from: 'Rumsan User<rs_users@rumsan.com>',
        body: {
            file: __dirname + '/signup.htm'
        }
    },
    signup_pw: {
        subject:'Thank you for signing up. Here is your password',
        from: 'Rumsan User<rs_users@rumsan.com>',
        body: {
            file: __dirname + '/signup_pw.htm'
        }
    },
    forgot: {
        subject:'Reset your password',
        from: 'Rumsan User<rs_users@rumsan.com>',
        body: {
            file: __dirname + '/forgot.htm'
        }
    },
    verify: {
        subject:'Verify your email address',
        from: 'Rumsan User<rs_users@rumsan.com>',
        body: {
            file: __dirname + '/verify.htm'
        }
    },
    contact: {
        subject:'Contact from web',
        from: 'Rumsan User<rs_users@rumsan.com>',
        to: 'team@edushala.com',
        body: {
            file: __dirname + '/contact.htm'
        }
    },
    proposal: {
        subject:'Course Proposal from web',
        from: 'Rumsan User<rs_users@rumsan.com>',
        to: 'team@edushala.com',
        body: {
            file: __dirname + '/proposal.htm'
        }
    }
};