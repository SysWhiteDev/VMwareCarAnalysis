import { Router } from 'express';
import path from 'path'; 
import fs from 'fs';

const imageRoute = Router();

imageRoute.get('/:id', (req, res) => {
   const currentModuleUrl = new URL(import.meta.url);
   const currentModuleDir = path.dirname(currentModuleUrl.pathname);
   const imagePath = path.join(currentModuleDir, `./images/${req.params.id}.png`);
   
   if (fs.existsSync(imagePath)) {
       res.sendFile(imagePath);
   } else {
       res.sendFile(path.join(currentModuleDir, './images/error.png'));
   }
});

export default imageRoute;
