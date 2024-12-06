CREATE DATABASE MyTechDB;
USE MyTechdb;

CREATE TABLE shipment (
    id_shipment INT PRIMARY KEY AUTO_INCREMENT,
    address VARCHAR(250),
    tracking_number VARCHAR(100),
    status VARCHAR(45),
    shipping_date DATE,
    estimated_delivery_date DATE
);
SELECT * FROM shipment;

CREATE TABLE user (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address VARCHAR(250),
    email VARCHAR(100),
    phone_number VARCHAR(45),
    rol VARCHAR(45)
);
SELECT * FROM user;

CREATE TABLE message (
    id_message INT PRIMARY KEY AUTO_INCREMENT,
    comment VARCHAR(100),
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES user(id_user)
);
SELECT * FROM message;

CREATE TABLE card (
    id_card INT PRIMARY KEY AUTO_INCREMENT,
    name_card VARCHAR(100),
    number_card BIGINT,
    cvv INT,
    expiration_date DATE,
    user_id_user INT,
    FOREIGN KEY (user_id_user) REFERENCES user(id_user)
);
SELECT * FROM card;

CREATE TABLE products (
    id_products INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(45),
    url_image VARCHAR(250),
    price INT,
    `condition` VARCHAR(45),
    color VARCHAR(45),
    description VARCHAR(250),
    user_id_user INT,
    FOREIGN KEY (user_id_user) REFERENCES user(id_user)
);
SELECT * FROM products;

CREATE TABLE `order` (
    id_order INT PRIMARY KEY AUTO_INCREMENT,
    amount INT,
    subtotal INT,
    total INT,
    date_creation DATE,
    user_card_id_card INT,
    user_id_user INT,
    products_id_products INT,
    shipment_id_shipment INT,
    FOREIGN KEY (user_card_id_card) REFERENCES card(id_card),
    FOREIGN KEY (user_id_user) REFERENCES user(id_user),
    FOREIGN KEY (products_id_products) REFERENCES products(id_products),
    FOREIGN KEY (shipment_id_shipment) REFERENCES shipment(id_shipment)
);
SELECT * FROM `order`;

INSERT INTO user (id_user, first_name, last_name, address, email, phone_number, rol)
VALUES 
(1, 'Juan', 'Pérez', 'Av. Paseo de la Reforma 123, Ciudad de México, CDMX', 'juan.perez@example.com', '5551234567', 'comprador'),
(2, 'María', 'López', 'Calle Juárez 456, Guadalajara, Jalisco', 'maria.lopez@example.com', '3339876543', 'comprador'),
(3, 'Carlos', 'Sánchez', 'Av. Hidalgo 789, Monterrey, Nuevo León', 'carlos.sanchez@example.com', '8187654321', 'comprador'),
(4, 'Ana', 'Gómez', 'Calle Independencia 101, Puebla, Puebla', 'ana.gomez@example.com', '2221230987', 'comprador'),
(5, 'Luis', 'Fernández', 'Blvd. Miguel Alemán 202, Toluca, Estado de México', 'luis.fernandez@example.com', '7226543210', 'comprador');

SELECT * FROM user;

INSERT INTO shipment (id_shipment, address, tracking_number, status, shipping_date, estimated_delivery_date)
VALUES 
(1, 'Av. Paseo de la Reforma 123, Ciudad de México, CDMX', 'TRACK123', 'En tránsito', '2024-12-01', '2024-12-10'),
(2, 'Calle Juárez 456, Guadalajara, Jalisco', 'TRACK456', 'Entregado', '2024-11-20', '2024-11-25'),
(3, 'Av. Hidalgo 789, Monterrey, Nuevo León', 'TRACK789', 'Pendiente', '2024-12-05', '2024-12-15'),
(4, 'Calle Independencia 101, Puebla, Puebla', 'TRACK101', 'En tránsito', '2024-12-03', '2024-12-08'),
(5, 'Blvd. Miguel Alemán 202, Toluca, Estado de México', 'TRACK202', 'Entregado', '2024-11-15', '2024-11-20');

SELECT * FROM shipment;

INSERT INTO message (id_message, comment, id_user)
VALUES 
(1, '¡Excelente servicio!', 1),
(2, '¿Pueden darme más detalles sobre el envío?', 2),
(3, '¿Es posible cambiar mi pedido?', 3),
(4, '¡Gracias por la entrega rápida!', 4),
(5, 'Tengo un problema con mi pedido.', 5);

SELECT * FROM message;

INSERT INTO card (id_card, name_card, number_card, cvv, expiration_date, user_id_user)
VALUES 
(1, 'Juan Pérez', 1234567812345678, 123, '2025-12-01', 1),
(2, 'María López', 2345678923456789, 234, '2026-01-15', 2),
(3, 'Carlos Sánchez', 3456789034567890, 345, '2025-06-10', 3),
(4, 'Ana Gómez', 4567890145678901, 456, '2026-03-20', 4),
(5, 'Luis Fernández', 5678901256789012, 567, '2025-09-05', 5);

SELECT * FROM card;

INSERT INTO products (id_products, category, url_image, price, `condition`, color, description, user_id_user)
VALUES 
(1, 'Electrónica', 'https://m.media-amazon.com/images/I/710CgnRkXWL.__AC_SY300_SX300_QL70_ML2_.jpg', 500, 'Nuevo', 'Negro', 'Teléfono inteligente Samsung Galaxy S22', 1),
(2, 'Electrónica', 'https://m.media-amazon.com/images/I/61DeOpVV0qL.jpg', 1200, 'Nuevo', 'Gris', 'Laptop Dell Inspiron 15', 2),
(3, 'Electrónica', 'https://m.media-amazon.com/images/I/51nJoadBAEL._AC_UF894,1000_QL80_.jpg', 300, 'Nuevo', 'Blanco', 'Tableta iPad Mini', 3),
(4, 'Electrónica', 'https://i5.walmartimages.com/asr/53076a32-c830-4650-82c8-910f033bd5d5.bcda404f1f7c532d270a6ef28feaddb7.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF', 100, 'Usado', 'Negro', 'Audífonos Sony WH-1000XM4', 4),
(5, 'Electrónica', 'https://www.att.com/scmsassets/global/devices/phones/apple/apple-watch-series-8-41mm/carousel/silalumwhitesportbandml/sil-alum-white-sport-band-m-l-1.png', 250, 'Nuevo', 'Blanco', 'Smartwatch Apple Watch Series 8', 5);

SELECT * FROM products;

INSERT INTO `order` (id_order, amount, subtotal, total, date_creation, user_card_id_card, user_id_user, products_id_products, shipment_id_shipment)
VALUES 
(1, 1, 500, 520, '2024-12-01', 1, 1, 1, 1),
(2, 1, 1200, 1240, '2024-12-02', 2, 2, 2, 2),
(3, 1, 300, 320, '2024-12-03', 3, 3, 3, 3),
(4, 1, 100, 110, '2024-12-04', 4, 4, 4, 4),
(5, 1, 250, 270, '2024-12-05', 5, 5, 5, 5);

SELECT * FROM `order`;
