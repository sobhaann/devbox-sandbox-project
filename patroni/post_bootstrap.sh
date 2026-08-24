#!/bin/bash
# Patroni calls this once, right after the cluster is initialized,
# passing a connection string to the new primary as $1.
set -euo pipefail

# Ensure container env vars (APP_DB_*) are available even if Patroni
# runs this script in a stripped-down environment.
source /proc/1/environ 2>/dev/null || true

psql "$1" <<-SQL
    CREATE USER ${APP_DB_USER} WITH PASSWORD '${APP_DB_PASSWORD}';
    CREATE DATABASE ${APP_DB_NAME} OWNER ${APP_DB_USER};
    GRANT ALL PRIVILEGES ON DATABASE ${APP_DB_NAME} TO ${APP_DB_USER};
SQL
