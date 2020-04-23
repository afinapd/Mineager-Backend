# final-smm-express

## How to run:
1. clone the repo.
2. open a terminal.
3. type 'npm install' and let the installation finish.
4. create a file named '.env' in the root

### fill it with the following:

- APP_NAME = SMM DATA
- APP_PORT = 3000
- DATE_FORMAT = YYYY-MM-DD HH:mm:ss
- NODE_ENV = development
- LOG_PATH = ./apps/SMM-log.log
- LOG_LEVEL = info
- SECRET_KEY = Bisitaharidamdam
- DB_NAME = smmdata
- DB_USER = root
- DB_PASS = 1234
- DB_PORT = 3306
- DB_HOST = 127.0.0.1
- DB_TYPE = mysql
- REDIS = http://ec2-18-136-210-143.ap-southeast-1.compute.amazonaws.com:3333

NOTE: if you are planning to use SQLite, leave the NODE_ENV as it is.
However if you wanted to use MySQL change NODE_ENV to 'production' and change everything starting with
'DB_' to fit your database.

# IF YOU USED NODE_ENV = development the program automatically migrate the database for you.

# if you didnt use NODE_ENV = development, make sure to do 'npm run migrate' before running the program


# TO RUN THE PROGRAM USE
## 'npm run dev'
