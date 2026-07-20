/*
# Create lead_inquiries table (single-tenant, no auth)

## Purpose
Stores sales/B2B lead inquiries submitted through the public "Contact Sales"
form on the Healthcare Pharmaceuticals Pakistan marketing site. The site has
no sign-in screen, so this is a single-tenant, public-write table: the anon-key
frontend inserts rows directly.

## New Tables
- `lead_inquiries`
  - `id` (uuid, PK, default gen_random_uuid())
  - `full_name` (text, not null) — submitter's full name
  - `corporate_email` (text, not null) — submitter's corporate email
  - `country` (text, not null) — submitter's country
  - `inquiry_message` (text, not null) — free-text inquiry body
  - `created_at` (timestamptz, default now()) — submission timestamp

## Security
- RLS enabled on `lead_inquiries`.
- Public INSERT only (TO anon, authenticated) — anyone can submit a lead.
- No SELECT/UPDATE/DELETE policies: submissions cannot be read or modified
  through the anon key. Reads are intended only via the Supabase dashboard
  (service role). This is intentional for a public lead-capture form.

## Notes
1. No user_id / auth integration — the site has no accounts.
2. Idempotent: uses IF NOT EXISTS and drops policies before recreating.
*/

CREATE TABLE IF NOT EXISTS lead_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  corporate_email text NOT NULL,
  country text NOT NULL,
  inquiry_message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE lead_inquiries ENABLE ROW LEVEL SECURITY;

-- Public insert: anyone can submit a lead inquiry.
DROP POLICY IF EXISTS "anon_insert_lead_inquiries" ON lead_inquiries;
CREATE POLICY "anon_insert_lead_inquiries"
ON lead_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies: rows are only readable via the
-- dashboard / service role, never through the anon key.
