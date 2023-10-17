require('../../db');

exports.listVacations = async (req,res) => {
    const vacations = await db.getVacations({ available: true })
    const context = {
        vacations: vacations.map(vacation => ({
            name: vacation.name,
            desctiption: vacation.desctiption,
            price: vacation.price,
            isSeason: vacation.isSeason,
        }))
    }
    res.render('vacations' , context);
}

exports.newLetter = (req, res) => {
    res.render('newletter')
}

exports.api = {
    newsLetterSingUp: (req, res) => {
        console.log('body' + req.body)
        res.send({ result: 'seccess' })
    }
}

exports.newsLetterSingUpProcess = (req, res) => {
    console.log('From is string req : ' + req.query.form);
    console.log('Token csrf : ' + req.body._csrf);
    console.log('Name : ' + req.body.name);
    console.log('email : ' + req.body.email);
    console.log(req.body, 'body')
    res.redirect(303, '/newsletter-singup/thank-you')
}

exports.newLetterSingUpThanksYou = (req, res) => {
    res.render('newsletter-singup-thank-you')
}   