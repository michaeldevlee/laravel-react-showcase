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
