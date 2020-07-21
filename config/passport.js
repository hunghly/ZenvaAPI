import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/User.js';

const { Strategy, ExtractJwt } = passportJWT;
// const secret = process.env.SECRET_OR