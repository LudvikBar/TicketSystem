# TicketSystem - School projekt "oppdrag 2"


### Note

> This setup guide will just cover the **Electronjs version** of the project because the other version is incomplete.

> Electron version used is **Electron forge**.

>This Guide is based in **Windows** and in **Ubuntu Linux**, setup will say when to use which.
Other Debian OS's may work but is not tested.

> Windows will be the primary location with Linux as a backend with a db.

> Setup requires **basic knowledge on the terminal** or a google search about it.

> It is very important to switch out all instances of "STRONG_PASSWORD" with your own password and all instances of the ip "10.2.3.26" with your ip to the Linux backend. The ip appears in most js files, including the backend. index.js is the only one in backend that may need editing.

> If **firewall** is active, allow port 3000.


## **Setup**
### Windows setup
**1. Install node.js:**

> To install node.js go to https://nodejs.org/en/download and scroll down to you see a button in green named "Windows Installer(.msi)"

**2. Run the installer:**

> Run the installer like any other installer. To be safe i have found it is good practice to restart the computer after that. Result may vary.


**3. Run the  Electron App:**

>Download the github projekt and go to the path below in file explorer and open in terminal:
```bash
./electronjsVersion\projekt\TicketSys\src
```
> Ones you are in, do the following commands:
```bash
npm install
npm start
```

**Now the app is running**



### Linux Backend setup
---

Note:
```bash
It is possible to just copy the backend folder from the repo to the pi and run it. However it will not be explained and the Database needs to be build.
```

**1. Install and Initiation**

Run one after one:
```bash
mkdir ticketsys-backend
cd ticketsys-backend
npm init -y
npm install express mariadb cors
```

**2. Prepare index.js**

Inside ticketsys-backend run:
```bash
touch index.js
nano index.js
```
The copy the code from index.js in the backend folder of the repo and paste it in the current nano save and exit  with:

Save and exit:
```bash
ctl + O
Enter
ctl + X
```





### Create database + user

1. Log in:
```bash
sudo mariadb
```

2. Run exactly this, but switch out "STRONG_PASSWORD"
```bash
CREATE DATABASE ticketsys;

CREATE USER 'ticketsys_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD';

GRANT ALL PRIVILEGES ON ticketsys.* TO 'ticketsys_user'@'localhost';

FLUSH PRIVILEGES;
```
3. Create tickets table
USE ticketsys;

```bash
CREATE TABLE tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  topic VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  status ENUM(
    'skal behandles',
    'behandles',
    'ferdig'
  ) DEFAULT 'skal behandles',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

✅ Database is now ready.


4️⃣ Allow remote access (VERY IMPORTANT)

Edit config:
```bash
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

Change:
```bash
bind-address = 0.0.0.0
```

To save and exit:
```bash
ctl + O
Enter
ctl + X
```

Restart:
```bash
sudo systemctl restart mariadb
```



# Runn everything
> In src folder do: 
```bash
npm start
```
>In the directory with index.js run: 
```bash
node index.js
```