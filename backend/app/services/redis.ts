import {createClient} from 'redis';
import {log} from '../utils/utils';

const connectRedis = async () => {
    return await createClient()
        .on('error', err => log("Redis error: " + err, "error"))
        .connect();
}

const redis = connectRedis().then(() => log("Redis connected", "info"));

export default redis;