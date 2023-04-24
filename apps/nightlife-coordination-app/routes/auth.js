
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    } else {
        res.status(401).json({message: "User not authenticated"})
    }
}

module.exports = function(app, passport) {
    app.get("/auth/user", isLoggedIn, (req, res) => {
        res.json(req.user)
    })

    app.get("/auth/github", (req, res, next) => {
        const { search } = req.query
        const state = search
        ? Buffer.from(JSON.stringify({ search })).toString('base64')
        : undefined

        const authenticator = passport.authenticate('github', { scope: [], state })

        authenticator(req, res, next)
    })

    app.get("/auth/github/callback", passport.authenticate('github', {failureRedirect: "/"}), (req, res) => {
            const { state } = req.query
            
            const { search } = state ? JSON.parse(Buffer.from(state, 'base64').toString()) : {}
            
            if(search) {
                const params = new URLSearchParams({search: search})
                res.redirect("/?" + params)
            } else {
                res.redirect("/")
            }
        } );

    app.get("/auth/logout", (req, res, next) => {
            req.session.destroy(err => {
                if(err){
                    return next(err)
                } else {
                    res.status(200).json({message: "logged out successful"});
                }
            })
		});
}