import winston from 'winston';
import path from 'path';

export const logger = winston.createLogger({
    level: 'info',
    format : winston.format.json({
        space: 4,
        
    }),
    
    defaultMeta: {service:'API-MYFOOD ', date:new Date()},
    transports: [
        new winston.transports.File({filename: path.resolve('.','logs','error.log'), level:'error'}),
        new winston.transports.File({filename:path.resolve('.','logs','info.log'), level:'info'}),
        new winston.transports.File({filename: path.resolve('.','logs','warning.log'), level:'warning'}),
    ],

});
