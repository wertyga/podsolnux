import path from 'path';

const dev = process.env.NODE_ENV === 'development';
const testEnv = process.env.NODE_ENV === 'test';
const dbName = 'podsolnux';

export const config = {
  admin: {
    PORT: 3001,
  },
  hostAddress: dev ? 'http://localhost:3000' : 'https://www.fotopodsolnux.by',
    appHost: 'http://localhost:3005',
    PORT: 3000,
    mongoose: {
        uri: testEnv ? `mongodb://localhost/${dbName}-test` : `mongodb://localhost/${dbName}`,
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },
    fieldToSaveSession: 'authUserId',
    session: {
        secret: "nodeJSForever",
        key: "sid",
        cookie: {
            secure: false,
            sameSite: true,
            httpOnly: true,
            maxAge: 3600000 * 3
        }
    },
    hash: {
        secret: 'boooom!',
        salt: 10
    },
    uploads: {
      directory: 'temp',
      destination: path.join(__dirname, '../', 'temp'),
      orderPath: path.resolve(process.cwd(), './ORDERS'),
    },
    logFile: path.join(__dirname, '..', 'node.log'),
}