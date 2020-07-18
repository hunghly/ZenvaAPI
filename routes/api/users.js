import {Router} from 'express';
import User from '../../models/User.js'
const router = Router();


router.get('/', (req, res, next) => {
    User.find({}, (err, users) => {
        return res.send(users)
    })
})

router.post('/', (req, res, next) => {
    const {username} = req.body;
    const newUser = new User({
        username: username
    })
    return newUser.save(function(err, model) {
        return res.send(model);
    })
})


export default router;