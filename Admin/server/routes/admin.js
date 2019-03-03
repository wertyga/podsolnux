import express from 'express';
import path from 'path';

// import adminAuth from '../middlewares/adminAuth';

const route = express.Router();

route.get('/*', (req, res) => res.sendFile(path.join(process.cwd(), './Admin/server/adminPage.html')));


export default route;