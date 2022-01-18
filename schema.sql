-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again
DROP DATABASE IF EXISTS funds;

-- Create the db
CREATE DATABASE funds;

-- Move into the db
\c funds

-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS Funds
(
    id SERIAL PRIMARY KEY ,
    name VARCHAR (100) UNIQUE NOT NULL
);

-- Changes the owner of the table to postgres which is the default when installing postgres
ALTER TABLE Funds
    OWNER to postgres;

-- Create our table if it doesn't already exist
CREATE TABLE IF NOT EXISTS Companies
(
    id SERIAL PRIMARY KEY,
    fund_id INTEGER,
    name VARCHAR (100) UNIQUE NOT NULL,
    logo VARCHAR (100),
    cost INTEGER,
    ownership_percentage FLOAT,
    implied_value INTEGER,
    founded DATE
);

-- Changes the owner of the table to postgres which is the default when installing postgres
ALTER TABLE Companies
    OWNER to postgres;
