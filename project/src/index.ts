import express from 'express';
import 'dotenv/config';
import userRoutes from './routers/userRoutes';
import roleRoutes from './routers/roleRoutes';
import permissionRoutes from './routers/permissionRoutes';
import path from 'path';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/permissions', permissionRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});