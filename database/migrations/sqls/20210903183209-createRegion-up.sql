CREATE TABLE region
(
    id uuid NOT NULL PRIMARY KEY,
    name varchar NOT NULL,
    description varchar NOT NULL,
    shape polygon,
    created_at timestamptz NOT NULL,
    creator_user_id int,
    creator_organization_id int,
    active boolean NOT NULL
);