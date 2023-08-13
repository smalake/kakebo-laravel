#!/bin/bash

cd /var/www/kakebo.smamiya.site/html/kakebo-laravel
git pull
composer install
npm install
npm run build
