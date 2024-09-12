import app  from '../app';
import { development } from '../config/development';
import { MongooseDB } from '../config/mongoose';
import { logger } from '../config/winston';

MongooseDB().then(res => {
    console.log("Connection database successfuly");
    logger.info("Connection database successfuly",'info')
    app.listen(development.PORT, ()=>{
        console.log('Server on port ' + development.PORT);
        if(development.NODE_ENV !== 'production'){
            logger.info('Server on port ' + development.PORT);
        }
    })
})
.catch(err => {
    logger.error(err.message,'error');
})


