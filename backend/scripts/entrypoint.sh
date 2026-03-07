#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "Waiting for database..."
# Simple check for database readiness (optional for SQLite, but good for Postgres)

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

# Optional: Create superuser from environment variables
if [ "$ADMIN_USER" ] && [ "$ADMIN_PASSWORD" ]; then
    echo "Creating superuser..."
    python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username="$ADMIN_USER").exists():
    User.objects.create_superuser("$ADMIN_USER", "$ADMIN_EMAIL", "$ADMIN_PASSWORD")
EOF
fi

echo "Starting server on port ${PORT:-8000}..."
exec gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8000}
