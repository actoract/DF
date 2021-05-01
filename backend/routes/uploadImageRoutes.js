import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()
const storage = multer.diskStorage({
    destination(req, file, callb){
        callb(null, 'upload/')
    },
    filename(req, file, callb){
        callb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }

})
function checkFileType(file, callb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(extname && mimetype){
        return callb(null, true)
    }
    else{
        callb('Only images')
    }
}
const upload = multer({
    storage,
    fileFilter: function(req, file, callb){
        checkFileType(file, callb)
    }
})
router.post('/',upload.single('image'), (req, res) =>{
    res.send(`/${req.file.path}`)
})
export default router