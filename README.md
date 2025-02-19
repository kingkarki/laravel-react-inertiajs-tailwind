## Tech Stack

**Backend:** Php Laravel Framework with Mysql Database

**Frontend:** ReactJS, Tailwind CSS and InertiaJS

## Demo

[DEMO](http://64.227.161.41:8080/)

```
http://64.227.161.41:8080/
```

## About

A simple project that distributes players in different team based on their skills. This will create equally balanced teams with players with average skills.

## Installation

You will need Composer https://getcomposer.org and node js to install this project.

`git clone repo`

`cd cloned directory `

`cp .env.example  .env`

Create mysql database and change the following config according to your database in `.env` file

```bash
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

You can also use database dump file from the root of this repo laravel_react.sql

`composer install `

`php artisan migrate` This command will generate tables in your database

`php artisan db:seed` This command will generate 20 random players with random skills (1-5) in the database using Faker

`npm install && npm run build`

`composer run dev`
Now visit your browser with this url http://127.0.0.1:8000

This should open the project dashboard.

First signup a user and login with it.

Now you should be able to manage Players, Teams and Generate from the dashboard.

## Feel free to contact me if you have any issue setting up

- [@kingkarki](https://www.github.com/kingkarki)
- developersnepal@gmail.com
- 9849624226
