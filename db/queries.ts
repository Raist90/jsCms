export { createDBquery };

const createDBquery = `
CREATE TABLE IF NOT EXISTS schema (
    id varchar NOT NULL PRIMARY KEY,
    value varchar NOT NULL
);
`;
