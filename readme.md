<a href="https://www.vmware.com/">
    <img src="https://companieslogo.com/img/orig/VMW_BIG.D-de339fb7.png?t=1649106385" alt="ACS Data Systems S.p.A. logo" title="ACS Data Systems S.p.A." align="right" height="60" />
</a>

# EVgagement

[![stable](https://github.com/SysWhiteDev/VMwareCarAnalysis/actions/workflows/StableTestingWorkflow.yml/badge.svg?branch=main)](https://github.com/SysWhiteDev/VMwareCarAnalysis/actions/workflows/StableTestingWorkflow.yml)

⭐ Star us on GitHub — it motivates us a lot!

This project aims to make EV charging more fun and engaging for the end users.
To accomplish this we make use of computer vision to analyze photos uploaded by the charging station, enabling personalized recommendations and reducing friction for the users while their car is charging.
<br>

<img src="https://www.vdr.one/wp-content/uploads/2015/10/vmware-banner.png">

## Table of content

- [Directory structure](#directory-structure)
- [Running the app](#how-to-run-the-application)
- [Team](#team)

## Directory structure

<details>
<summary>~/client</summary>
All the needed files to run the client.
</details>

<summary>~/dashboard</summary>
All the needed files to run the admin dashboard.
</details>

<details>
<summary>~/backend</summary>
The "brain" of the frontend, it manages authentication and viewer syncronization.
</details>

<details>
<summary>~/ML</summary>
The part of the software that takes care of analyzing the footage sent by the various clients.
</details>

## How to run the application
<details>
  <summary>The docker way, recommended for production 🐳</summary>
  <br>
  <b>Step 1</b>: Install docker engine<br/>
  First of all you need docker engine installed on your machine, you can install it by following the instructions on the official <a href="https://docs.docker.com/engine/install/" target="_blank">Docker website</a><br><br>
    
  <b>Step 2</b>: Clone the repository to your machine<br/>
  ```bash
  git clone https://github.com/SysWhiteDev/VMwareCarAnalysis.git
  ```
  <b>Step 3</b>: Navigate to the repository directory<br/>
  ```bash
  cd VMwareCarAnalysis
  ```
  <b>Step 4</b>: Spin docker compose up<br/>
  ```bash
  docker compose up
  ```
  <b>DONE!</b> the app frontend will be running on port 3000.<br/>
</details>

<details>
  <summary>The bare bone way, recommended for development 🧑‍💻</summary><br>
  <b>NOTE: This is the process for a debian based system</b><br><br>

  <b>Step 1</b>: Clone the repository to your machine<br/>
  ```bash
  git clone https://github.com/SysWhiteDev/VMwareCarAnalysis.git
  ```
  <b>Step 2</b>: Navigate to the repository directory<br/>
  ```bash
  cd VMwareCarAnalysis
  ```
  <b>Step 3</b>: Install MySQL server
  ```bash
  sudo apt-get update
  sudo apt-get install mysql-server
  ```
  <b>Step 3</b>: Configure MySQL Instances
  1. Create configuration File for First instance (port 3306)
  ```bash
  sudo nano /etc/mysql/mysql.conf.d/mysqld1.cnf
  ```
  2. Add the following configuration inside the file
  ```
  [mysqld1]
  port = 3306
  datadir = /var/lib/mysql3306
  socket = /var/run/mysqld/mysqld3306.sock
  ```
  3. Create configuration File for Second instance (port 3307)
  ```bash
  sudo nano /etc/mysql/mysql.conf.d/mysqld2.cnf
  ```
  4. Add the following configuration inside the file
  ```
  [mysqld2]
  port = 3307
  datadir = /var/lib/mysql3307
  socket = /var/run/mysqld/mysqld3307.sock
  ```
  5. Create Data Directories
  ```
  sudo mkdir /var/lib/mysql3306
  sudo mkdir /var/lib/mysql3307
  ```
  6. Initialize MySQL Data Directories
  ```
  sudo mysqld --initialize --datadir=/var/lib/mysql3306 --user=mysql
  sudo mysqld --initialize --datadir=/var/lib/mysql3307 --user=mysql
  ```
  7. Start MySQL Instances
  ```
  sudo service mysql start --socket=/var/run/mysqld/mysqld3306.sock --port=3306 --pid-file=/var/run/mysqld/mysqld3306.pid
  sudo service mysql start --socket=/var/run/mysqld/mysqld3307.sock --port=3307 --pid-file=/var/run/mysqld/mysqld3307.pid
  ```
  8. Configure the first instance (port 3306)
  ```bash
  sudo mysql -S /var/run/mysqld/mysqld3306.sock -P 3306 -u root -p
  ```
  ```
  CREATE USER 'vmware'@'localhost' IDENTIFIED BY 'vmware';
  CREATE DATABASE IF NOT EXISTS `backend-db`;
  GRANT ALL PRIVILEGES ON `backend-db`.* TO 'vmware'@'localhost';
  FLUSH PRIVILEGES;
  USE `backend-db`;
  SOURCE ./backend/migrations/base.sql;
  exit
  ```
  9. Configure the second instance (port 3307)
  ```bash
  sudo mysql -S /var/run/mysqld/mysqld3307.sock -P 3307 -u root -p
  ```
  ```
  CREATE USER 'vmware'@'localhost' IDENTIFIED BY 'vmware';
  CREATE DATABASE IF NOT EXISTS `ml-db`;
  GRANT ALL PRIVILEGES ON `ml-db`.* TO 'vmware'@'localhost';
  FLUSH PRIVILEGES;
  USE `ml-db`;
  SOURCE ./ML/migrations/base.sql;
  exit
  ```
  <b>Step 4</b>: Install ffmpeg<br/>
  1. Install ffmpeg package
  ```bash
  sudo apt-get install ffmpeg
  ```
  2. Verify the installation
  ```bash
  ffmpeg -version
  ```
  <b>Step 5</b>: Start the services in dev mode<br/>
  - Open 3 different terminals

  <b>Terminal 1</b> (backend)<br>
  1. Move into the backend directory
  ```bash
  cd ./backend
  ```
  2. Install the node modules
  ```bash
  npm ci
  ```
  3. Run the server in dev mode
  ```bash
  npm run dev
  ```
  <b>Terminal 2</b> (ML)<br>
  1. Move into the backend directory
  ```bash
  cd ./ML
  ```
  2. Install the node modules
  ```bash
  npm ci
  ```
  3. Run the server in dev mode
  ```bash
  npm run dev
  ```
  <b>Terminal 3</b> (frontend)<br>
  1. Move into the backend directory
  ```bash
  cd ./frontend
  ```
  2. Install the node modules
  ```bash
  npm ci
  ```
  3. Run the server in dev mode
  ```bash
  npm run dev
  ```
<b>DONE!</b> with this setup, the application will automatically refresh when the code changes, the app frontend will be running on port 3000.<br/>
</details>

## Team
- [SysWhiteDev](https://github.com/syswhitedev) | Frontend/Backend/Machine Learning
- [resonanceee](https://github.com/resonanceee) | Machine Learning
- [Hamza](https://github.com/Hamza5955) | Machine Learning
