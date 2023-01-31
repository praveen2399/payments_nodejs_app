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
    const data = req.body;
    let responseList = [];
    for (let i = 0; i < data.length; i++) {

        let custid = data[i].custid;
        let issue = data[i].issue;
        let severity = data[i].severity;
        let amount = data[i].amount;
        let issuestatus = data[i].issuestatus;
        let confirmationno = data[i].confirmationno;

        db.run("INSERT INTO issues(issue, custid,severity,amount,issuestatus,confirmationno) VALUES (?,?,?,?,?,?)"
            , [issue, custid, severity, amount, issuestatus, confirmationno], (err) => {
                if (err) {
                    console.log("Failed insertion :", issue);
                    res.status(400).json({ "error": err.message });
                    return;
                }
                else {
                    responseList.push({ "name": custid, "issue": issue });
                }
            });
    }
    res.json({
        "message": "success",
        "data": responseList
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
app.patch("/issues", (req, res) => {

    console.log(req.body);
    const data = req.body;

    for (let i = 0; i < data.length; i++) {
        let issueid = data[i].id;
        let issuestatus = data[i].issuestatus;
        let confirmationno = data[i].confirmationno;
        db.run("UPDATE issues SET issuestatus = ?,confirmationno = ? WHERE id = ?", [issuestatus, confirmationno, issueid], (err) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
        });
    }
    res.json({
        "message": "success",
        "data": []
    });
});


app.listen(port, () => {
    console.log(`Payments Node JS app listening at http://localhost:${port}`);
});
