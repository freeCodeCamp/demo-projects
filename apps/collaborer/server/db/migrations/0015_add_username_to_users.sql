-- Adds @mention support: a short, unique handle distinct from display name/email.
-- Nullable at the DB level (existing rows have none); required going forward at
-- the application layer (registration validator).
ALTER TABLE users ADD COLUMN username TEXT;

CREATE UNIQUE INDEX idx_users_username ON users(username) WHERE username IS NOT NULL;
