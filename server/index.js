require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const router = require('./router/index');
const errorHandler = require('./middlewares/error-middleware');
const path = require('path');

const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 5000;



app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}))
app.use('/api', router);

app.ws('/api/message',(ws,req)=>{
    ws.on('message', function(msg) {
        msg = JSON.parse(msg);
        switch(msg.method){
            case 'connection':
                connectionHandler(ws, msg);
                break;
            case 'data':
                broadcastConnection(ws,msg);
                break
        }
        
    });
});

const connectionHandler =(ws, msg)=>{
    ws.id = msg.id;
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        console.log(msg.chatId)
        if(client.id===msg.chatId){
            client.send(JSON.stringify(msg))
        }
    })
}

app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start();