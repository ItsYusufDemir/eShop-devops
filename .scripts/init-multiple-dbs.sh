#!/bin/bash
set -e

# Define your 4 microservice databases here (space separated)
# You can also create specific users for each if needed
POSTGRES_MULTIPLE_DATABASES="catalogdb identitydb orderingdb webhooksdb"

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
	echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
	for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
		echo "Creating database: $db"
		psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
		    CREATE DATABASE $db;
		    GRANT ALL PRIVILEGES ON DATABASE $db TO $POSTGRES_USER;
EOSQL
	done
	echo "Multiple databases created"
fi