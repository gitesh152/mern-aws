import { Router } from 'express';

import files from './files.js';

const router = Router();

router.use('/files', files);

export default router;
