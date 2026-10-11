#!/bin/sh
set -e

echo "[*] Starting Nugget application container..."

# Run database table initialization and initial data seeding if configured
if [ -n "$DATABASE_URL" ]; then
    echo "[*] Connecting to PostgreSQL to verify schema..."
    python -c "import server; server.init_db()" || echo "[!] Warning: DB initialization deferred or encountered issue. Continuing startup..."
else
    echo "[!] Notice: DATABASE_URL is not set. Running in offline/demo mode."
fi

PORT="${PORT:-5000}"
echo "[+] Starting Gunicorn WSGI server on port ${PORT}..."
exec gunicorn --bind "0.0.0.0:${PORT}" --workers 2 --timeout 120 server:app
