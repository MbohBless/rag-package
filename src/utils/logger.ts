import pino from 'pino';
import logger from 'pino';
import dayjs from 'dayjs';
// import config from 'config';

const isDevEnv = process.env.NODE_ENV === 'development' ? true : false || true;

const log = logger({
    ...isDevEnv && {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    },
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
});

export default log;