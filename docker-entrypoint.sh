#!/bin/sh
set -e

if [ -z "${APP_KEY:-}" ]; then
    echo "ERROR: APP_KEY is not configured."
    exit 1
fi

export APP_ENV="${APP_ENV:-production}"
export APP_DEBUG="${APP_DEBUG:-false}"
export DB_CONNECTION=sqlite
export DB_DATABASE="${DB_DATABASE:-/var/data/database.sqlite}"

mkdir -p "$(dirname "$DB_DATABASE")"
touch "$DB_DATABASE"

chown -R www-data:www-data "$(dirname "$DB_DATABASE")"
chown www-data:www-data "$DB_DATABASE"
chmod 664 "$DB_DATABASE"

chown -R www-data:www-data storage bootstrap/cache

echo "Running Laravel migrations..."
su -s /bin/sh www-data -c "php artisan migrate --force --no-interaction"

echo "Caching Laravel configuration..."
su -s /bin/sh www-data -c "php artisan config:cache"

echo "Starting Apache..."
exec apache2-foreground
