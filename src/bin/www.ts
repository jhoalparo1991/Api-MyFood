import app  from '../app';
import { development } from '../config/development';
import { logger } from '../config/winston';

app.listen(development.PORT, async()=>{
    console.log('Server on port ' + development.PORT);
    if(development.NODE_ENV !== 'production'){
        logger.info('Server on port ' + development.PORT);
    }
})
