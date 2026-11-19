-- Organization invitations table
CREATE TABLE invitations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'member')),
  token TEXT NOT NULL UNIQUE,
  invited_by INTEGER NOT NULL REFERENCES users(id),
  accepted_at TEXT,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX idx_invitations_organization_id ON invitations(organization_id);

-- Only one pending (unaccepted) invitation per email per organization at a time.
CREATE UNIQUE INDEX idx_invitations_org_email_pending ON invitations(organization_id, email) WHERE accepted_at IS NULL;
