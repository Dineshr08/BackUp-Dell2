CREATE TABLE  IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE  IF NOT EXISTS service_accounts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    token TEXT,
    last_updated TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_service_mapping (
    user_id INT REFERENCES users(id),
    service_account_id INT REFERENCES service_accounts(id),
    PRIMARY KEY(user_id, service_account_id)
);
