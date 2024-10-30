const publicExpress = require('express');
import CondolenceController from '../controllers/CondolenceController';
import DeceasedController from '../controllers/DeceasedController';


const publicRouter = publicExpress.Router();

// routes
publicRouter.get('/condolences/:id', CondolenceController.getCondolences)
publicRouter.post('/condolences', CondolenceController.postCondolence)
publicRouter.get('/recents', DeceasedController.recents)
publicRouter.get('/deceased/:id', DeceasedController.details)
publicRouter.get('/search/:string', DeceasedController.search)

module.exports = publicRouter