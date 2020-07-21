import {Router} from 'express';
import User from '../../models/User.js'
const router = Router();


router.get('/', (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({err});
        return res.send(users)
    })
})

router.post('/password', (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send({err: `Required Fields are not found: ${(!username) ? 'username' : ''} ${(!password) ? 'password' : ''}`});
    }
    User.findOne({username: username }, function(err, userModel) {
        if (err) return res.status(400).send(err);
        if (!User) return res.status(400).send({err: 'Cannot find user'});
        return userModel.comparePassword(password, function(err, isMatch) {
            if (err) return res.status(400).send(err);
            return res.send({correct: isMatch});
        })
    });
})

router.post('/', (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send({err: `Required Fields are not found: ${(!username) ? 'username' : ''} ${(!password) ? 'password' : ''}`});
    }
    const newUser = new User({
        username: username,
        password: password
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