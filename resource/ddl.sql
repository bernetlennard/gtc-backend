-- Tabelle User
CREATE TABLE "user" (
                        id SERIAL PRIMARY KEY,
                        firstName VARCHAR(100),
                        lastName VARCHAR(100),
                        userLogin VARCHAR(50) UNIQUE NOT NULL,
                        password VARCHAR(255)
);

-- Tabelle Transaction (FK auf user.id)
CREATE TABLE transaction (
                             id SERIAL PRIMARY KEY,
                             transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             userId INT REFERENCES "user"(id) ON DELETE CASCADE, -- Standard FK auf ID
                             sourceAmount DECIMAL(15,2),
                             sourceCurrency CHAR(3),
                             targetCurrency CHAR(3),
                             exchangeRate DECIMAL(15,6)
);

-- Hilfstabellen
CREATE TABLE currency (
                          iso4217 CHAR(3) PRIMARY KEY,
                          name VARCHAR(100)
);

CREATE TABLE country (
                         iso3166 CHAR(2) PRIMARY KEY,
                         name VARCHAR(100),
                         capitalCity VARCHAR(100),
                         currencyIso4217 CHAR(3) REFERENCES currency(iso4217)
);

-- Test-Daten
INSERT INTO "user" (firstName, lastName, userLogin, password)
VALUES ('Lennard', 'Bernet', 'lennard_b', 'pass123');