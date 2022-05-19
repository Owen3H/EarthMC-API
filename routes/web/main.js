const express = require("express"),
      router = express.Router()

//#region Routes to redirect to docs
router.get('/', function(req, res) {
    res.redirect('https://emc-toolkit.vercel.app/docs')
})

router.get('/api/v1', function(req, res) {
    res.redirect('https://emc-toolkit.vercel.app/docs')
})

router.get('/api', function(req, res) {
    res.redirect('https://emc-toolkit.vercel.app/docs')
})

router.get('/invite', function(req, res) {
    res.redirect('https://emc-toolkit.vercel.app/invite')
})
//#endregion

module.exports = router