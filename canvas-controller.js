let ids = []
import fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path'
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class CanvasController{
    constructor() {
       this.ids = ids
    }
   async createNewRoom(req, res, next){
       try {
           ids.push(`/f${(+new Date()).toString(16)}`)
           res.status(204).send();
       } catch (e){
            res.status(500).send();
       }
   }
   async showRooms(req, res, next){
       return res.json(ids)
   }
   async saveState(req, res){
    try {
        const data = req.body.img.replace(`data:image/png;base64,`,'')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        return res.status(200).json('loaded')
    }catch (e){
        console.log(e)
        return res.status(500).json('error')
    }
   }
    async shareState(req, res){
        let file;
        if (!(fs.existsSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`)))) {
            const fileData = req.body.img.replace(`data:image/png;base64,`,'')
            fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), fileData, 'base64')
        }
        file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
            const data = `data:image/png;base64,` + file.toString('base64')
        res.json(data)
    }
}
export default new CanvasController();