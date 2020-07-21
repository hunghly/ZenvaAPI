import {Router} from 'express';
import User from '../../models/User.js'
const router = Router();


router.get('/', (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({err});
        return res.send(users)
    })
})

router.post('/', (req, res, next) => {
    const {username} = req.body;
    if (!username) {
        return res.status(400).send({err: 'Required Fields are not found: username'});
    }
    const newUser = new User({
        username: username
    })
    return newUser.save(function(err, model) {
        if (err) {
           return res.status(400).send({err})
        }
        return res.status(201).send(model);
    })
})

router.get('/err', (req, res, next) => {
    return res.error;
})


export default router;