const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3002;
app.use(express.json());

// Connect to the database
let db = new sqlite3.Database("payments.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the payments database.");
});

// Create a new issue
app.post("/issues", (req, res) => {
    console.log(req.body);
    let custid = req.body.custid;
    let issue = req.body.issue;
    let severity = req.body.severity;
    let amount = req.body.amount;
    let issuestatus = req.body.issuestatus;
    let confirmationno = req.body.confirmationno;

    db.run("INSERT INTO issues(issue, custid,severity,amount,issuestatus,confirmationno) VALUES (?,?,?,?,?,?)"
    , [issue, custid, severity, amount, issuestatus, confirmationno], (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": {
                "name": custid,
                "age": issue
            }
        });
    });
});

// Get all issues
app.get("/issues", (req, res) => {
    db.all("SELECT * FROM issues", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Get a single issue
app.get("/issues/:id", (req, res) => {
    let id = req.params.id;
    db.get("SELECT * FROM issues WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// Get issues for customer
app.get("/issues/customer/:custid", (req, res) => {
    let custid = req.params.custid;
    db.all("SELECT * FROM issues WHERE custid = ?", [custid], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// Update a user
app.patch("/issues/:issueid", (req, res) => {
    let issueid = req.params.issueid;
    let issuestatus = req.body.issuestatus;
    let confirmationno = req.body.confirmationo;

    db.run("UPDATE issues SET issuestatus = ?, confirmationno = ? WHERE id = ?", [issuestatus, confirmationno, issueid], (err) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": {
                "issueid": issueid,
                "issuestatus": issuestatus
            }
        });
    });
});


app.listen(port, () => {
    console.log(`Payments Node JS app listening at http://localhost:${port}`);
});
