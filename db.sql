CREATE TABLE IF NOT EXISTS issues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  issue TEXT NOT NULL,
  custid INTEGER NOT NULL,
  severity TEXT NOT NULL,
  amount real NOT NULL,
  issuestatus TEXT NOT NULL,
  confirmationno TEXT  
);

CREATE TABLE IF NOT EXISTS customer(
    custid INTEGER NOT NULL,
    custname TEXT NOT NULL,
    custphone TEXT NOT NULL,
    addressline1 TEXT NOT NULL,
    addressline2 TEXT,
    city TEXT,
    state TEXT,
    zipcode TEXT,
    country TEXT,
    accountnumber TEXT,
    routingnumber TEXT
);