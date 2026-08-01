const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require("./routes/employee.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'EMS API Running'
    });
});

app.use('/api/auth', authRoutes);



app.use("/api/employees", employeeRoutes);

app.use(errorMiddleware);

module.exports = app;