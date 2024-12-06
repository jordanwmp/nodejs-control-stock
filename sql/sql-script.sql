/*
	SCRIPT FOR SYSTEM THAT CREATE A STOCK WITH
    NODE.JS AND MYSQL
*/
CREATE DATABASE nodestock;
USE nodestock;

CREATE TABLE categories(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL
);

CREATE TABLE supplies(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name_supply VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL
);

CREATE TABLE users(
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 firstname VARCHAR(255) NOT NULL,
 lastname VARCHAR(255) NOT NULL,
 passwrod VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL,
 createdAt TIMESTAMP NOT NULL
);

CREATE TABLE contacts (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    idSupply INT NOT NULL,
    FOREIGN KEY (idSupply) REFERENCES supplies(id)
);

CREATE TABLE addresses(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    neighbor VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state CHAR(2) NOT NULL,
    code VARCHAR(8) NOT NULL,
    idSupply INT NOT NULL,
    FOREIGN KEY (idSupply) REFERENCES supplies(id)
);

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(255) NOT NULL,
    description LONGTEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    supplier_id INT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (supplier_id) REFERENCES supplies(id)
);

CREATE TABLE images(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    createAt TIMESTAMP NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

ALTER TABLE images CHANGE image_url image VARCHAR(255) NOT NULL;

ALTER TABLE users CHANGE passwrod password VARCHAR(255) NOT NULL;
INSERT INTO users (firstname, lastname, password, email, createdAt) VALUES ('Jordan', 'Willian', '1234', 'jordan@node.com', '2024-11-26 16:37:00');

SELECT * FROM users;
DELETE FROM users WHERE id = 1;

INSERT INTO categories (category, description, createdAt) VALUE ('Móveis', 'Cadeiras, mesas, sofás, estantes e outros itens de mobília para diversos ambientes da casa.', '2024-01-15 10:30:00');
INSERT INTO categories (category, description, createdAt) VALUES ('Iluminação', 'Luminárias, abajures, pendentes, lustres e outros itens de iluminação para interiores e exteriores.', '2024-02-10 14:45:00');
INSERT INTO categories (category, description, createdAt) VALUES ('Decoração', 'Quadros, vasos, esculturas, espelhos e outros itens decorativos para embelezar ambientes.', '2024-03-05 09:20:00');  

ALTER TABLE supplies CHANGE name_supply supplier VARCHAR(255) NOT NULL;

INSERT INTO supplies (supplier, createdAt) VALUES ('DecoraMóveis Ltda', '2024-11-26 16:51:00');
INSERT INTO supplies (supplier, createdAt) VALUES ('Luz&Arte Iluminação', '2024-11-26 16:51:00');
INSERT INTO supplies (supplier, createdAt) VALUES ('Estilo e Conforto Têxteis', '2024-11-26 16:51:00');

SELECT * FROM supplies;

INSERT INTO contacts (phone, email, idSupply) VALUES ('(11) 9876-5432', 'contato@decoramoveis.com.br', 1);
INSERT INTO contacts (phone, email, idSupply) VALUE ('(21) 2345-6789', 'vendas@luzearte.com.br', 2);
INSERT INTO contacts (phone, email, idSupply) VALUE ('(31) 3456-7890', 'atendimento@estiloetextil.com.br', 3);

SELECT * FROM contacts;

ALTER TABLE addresses CHANGE code code VARCHAR(9) NOT NULL;

INSERT INTO addresses (street, neighbor, number, city, state, code, idSupply) VALUES ('Avenida Brasil', 'Jardim América', '1234', 'São Paulo', 'SP', '01448-000', 1);
INSERT INTO addresses (street, neighbor, number, city, state, code, idSupply) VALUES ('Rua das Luminárias', 'Centro', '456', 'Rio de Janeiro', 'RJ', '20040-010', 2);
INSERT INTO addresses (street, neighbor, number, city, state, code, idSupply) VALUES ('Rua das Fábricas', 'Industrial', '789', 'Belo Horizonte', 'MG', '31270-080', 3);

SELECT * FROM addresses;

INSERT INTO products (product, description, price, category_id, supplier_id, createdAt) VALUES
('Tapete Luxo', 'Tapete de alta qualidade com textura suave e design elegante, adicionando conforto e estilo ao ambiente.', 800.00, 3, 3, '2024-11-25 12:00:00'),
('Estante Moderna', 'Estante de madeira com design contemporâneo, ideal para organizar livros e itens decorativos na sala ou escritório.', 1200.00, 1, 1, '2024-11-25 13:00:00'),
('Abajur de Mesa', 'Abajur de mesa com base metálica e cúpula de tecido, proporcionando iluminação suave para o ambiente.', 150.00, 2, 2, '2024-11-25 14:00:00'),
('Almofada Decorativa', 'Almofada decorativa com estampas modernas e enchimento confortável, ideal para sofás e camas.', 60.00, 3, 3, '2024-11-25 15:00:00');

SELECT * FROM products;

ALTER TABLE products
ADD COLUMN user_id INT NOT NULL DEFAULT 4,
ADD CONSTRAINT fk_users
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE products
ADD COLUMN updatedAt TIMESTAMP NOT NULL;

ALTER TABLE supplies
ADD COLUMN updatedAt TIMESTAMP NOT NULL;

ALTER TABLE images
ADD COLUMN updatedAt TIMESTAMP NOT NULL;

ALTER TABLE contacts
ADD COLUMN updatedAt TIMESTAMP NOT NULL;

ALTER TABLE categories
ADD COLUMN updatedAt TIMESTAMP NOT NULL;

ALTER TABLE addresses
ADD COLUMN updatedAt TIMESTAMP NOT NULL;

ALTER TABLE images
CHANGE COLUMN createAt createdAt TIMESTAMP NOT NULL;
