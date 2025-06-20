INSERT INTO Users (username, email, password_hash, role)
VALUES
('alice123', 'alice@example', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('luke123', 'luke@example.com', 'hashed444', 'owner'),
('jim198', 'jim@example.com', 'hashed198', 'walker');

INSERT INTO Dogs (owner_id, name, size)
VALUES
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username = 'bobwalker'), 'Bonno', 'large'),
((SELECT user_id FROM Users WHERE username = 'luke123'), 'Charlie', 'medium'),
((SELECT user_id FROM Users WHERE username = 'jim198'), 'Bazza', 'large');

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Max' AND owner_id = (SELECT user_id FROM Users WHERE username = 'alice123')), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bella' AND owner_id = (SELECT user_id FROM Users WHERE username = 'carol123')), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'Bonno' AND owner_id = (SELECT user_id FROM Users WHERE username = 'bobwalker')), '2025-06-11 08:30:00', 45, 'Riverbank Trail', 'cancelled'),
((SELECT dog_id FROM Dogs WHERE name = 'Charlie' AND owner_id = (SELECT user_id FROM Users WHERE username = 'luke123')), '2025-06-11 10:00:00', 30, 'Hillside Park', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bazza' AND owner_id = (SELECT user_id FROM Users WHERE username = 'jim198')), '2025-06-11 11:30:00', 60, 'City Gardens', 'open');