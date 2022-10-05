DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    pets_id int GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(15),
    age int,
    kind VARCHAR(25),
    PRIMARY KEY(pets_id)
);

INSERT INTO pets (name, age, kind) VALUES
('Fido', 12, 'Dog'),
('Lily', 10, 'Cat');