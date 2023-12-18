# Use the official PHP image with Apache as the base image
FROM php:8.2-fpm-alpine3.18

# Install necessary extensions and packages
RUN apk update && apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    oniguruma-dev \
    && docker-php-ext-install pdo_mysql mbstring zip 


# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the Laravel files into the container
COPY . /usr/share/nginx/html

# Set permissions for Laravel
RUN chown -R www-data:www-data /usr/share/nginx/html/storage /usr/share/nginx/html/bootstrap/cache

# Expose port 80 (default for HTTP)
EXPOSE 80

CMD php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && mv composer.phar /usr/local/bin/composer \
    && composer -v \
    && php-fpm
