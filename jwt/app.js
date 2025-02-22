import express from 'express';
import jwt from 'jsonwebtoken';
import user from './routes/user.js';
import student from './routes/student.js';
import auth from './middleware/auth.js';

const app = express();
app.use(express.json());

app.use('/api/user',user);
app.use('/api/student',auth,student);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));