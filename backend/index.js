const express = require('express');
const connectDB = require('./config/db');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const cors = require('cors');
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api',loginRoutes);
app.use('/api', signupRoutes);
app.use('/api', cartRoutes);
app.use('/api', productRoutes);

app.use((req, res)=>{
    res.status(404).json({error: 'Not Found'});
});

app.listen(8000, () => {
    console.log('Server running on https://localhost:8000');
})