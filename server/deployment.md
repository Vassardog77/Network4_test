
# Full Stack Application deployment on AWS EC2
- ubuntu 22.04
- t2.micro (free tier)
- us-west-1
- security group - inbound allowed ports (80, 443, 22)

### Update the system
```bash 
sudo apt-get update
sudo apt-get upgrade
```

### Install nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

### Install latest version of NodeJS
```bash 
nvm install --lts
nvm use --lts
```

### Verify node version
```bash
node -v
npm -v
```

### Install nginx
```bash
sudo apt-get install nginx
```
- Visit public IP of your instance to verify if nginx is installed properly
- In my case, the public IP is 54.193.251.92

### Clone repository
```bash 
git clone https://github.com/Vassardog77/Network4_test.git
cd Network4_test/server
npm ci
```

#### The build folder located in the repository didn't worked, did these steps to make it work
- Cloned the repository on my local machine, run the frontend application.
- There was a missing package (chart.js), installed it with `npm i chart.js` and then the application worked
- updated the `base url` in the api file and created a new build for it using `npm run build`
- Uploaded the latest build manually using `scp` i.e. `scp -r build ubuntu@54.193.251.92:~/Network4_test/client`

#### Affter the new build folder is on the server:

Move build folder to `/var/www`
```bash
cd /var/www
sudo mv ~/Network4_test/client/build build
sudo chmod -R 755 build/
sudo chown -R root:root build/
```

I also updated the nginx config file located at `/etc/nginx/sites=available/default`. You may see the configuration using this command `cat /etc/nginx/sites=available/default`

Now at this point, the frontend can be accessed on port 80
`http://54.193.251.92`

### Deploying the Backend

Installed pm2 for running the nodejs backend.

```bash
npm i -g pm2
```
Create .env file, install dependencies and start the application

```bash
cd ~/Network4_test/server
npm ci
touch .env
pm2 start npm --name Network4_test -- start
```
Now the application is running and can be accessed at `http://54.193.251.92:5000` 

#### Check the logs of your application

```bash
pm2 log Network4_test
```
#### Stop the Backend application

```bash
pm2 stop Network4_test
```

#### Start application
```bash
pm2 start Network4_test
```

#### Restart application

```bash
pm2 restart Network4_test
```

#### List all applications
```bash
pm2 ls
```

#### NOTE:
You can also use the id of your application to manage it

e.g.

```bash
pm2 ls
pm2 log 0
```
Here `0` is the application id that was shown in the process manager `pm2 log` [the `id` column]

### SSL
Used `certbot` with auto certificate renewal enabled.

## Handle Future Updates

As we are using the free tier instance which has low resources like CPU and RAM, we cannot build the ReactJS application there. We need to build the application on local machine and push the build to the server either by including the build in the Github repo or doing it manually using `scp`.

To push new changes, SSH into the EC2 instance and pull the latest code
```bash
ssh -i "network4test.pem" ubuntu@54.193.251.92
cd ~/Network4_test
git pull
pm2 restart 0
```

In case of new packages, make sure to install using `npm ci` to make sure installing the same minor version of the packages that were installed on your local machine.

In case of update to the frontend application, replace the previous build located at `/var/www/build` with the latest one and run in case you can't see the latest changes:

```bash
sudo systemctl restart nginx.service
```