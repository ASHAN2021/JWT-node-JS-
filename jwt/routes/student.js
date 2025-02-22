import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/',(req,res)=>{
    req.json(
        [
            {
                id:1,
                name:'John Doe',
                age:25
            },
            {
                id:2,
                name:'Jane Doe',
                age:24
            }
        ]
    )
})

export default router;