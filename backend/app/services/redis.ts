import {createClient} from 'redis';
import {log} from '../utils/utils';

const connectRedis = async () => {
    return await createClient()
        .on('error', err => log("Redis error: " + err, "error"))
        .on('ready', () => log("Redis ready", "info"))
        .connect();
};
export default connectRedis();