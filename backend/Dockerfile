FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libzip-dev \
    zip \
    libssl-dev \
    pkg-config \
    && docker-php-ext-install zip

# Install MongoDB extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Ensure .env exists so artisan commands don't fail, Render env vars will override
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Generate key (fallback if APP_KEY not set in Render)
RUN php artisan key:generate

# Expose port
EXPOSE 10000

# Start Laravel server
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-10000}