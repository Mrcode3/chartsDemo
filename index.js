/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3001;
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
  res.json({ info: "Demo - Chart.js, React.js, Node.js, PostgreSQL" });
});

// Create a single connection pool instance
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  schema: process.env.PGSCHEMA,
});

// Function to fetch and count data
const fetchAndCount = async (columnName) => {
  try {
    const queryResult = await pool.query(
      `SELECT ${columnName} FROM sfdc.exploreaudience`
    );

    console.log(queryResult.rows);
    const counts = {};
    queryResult.rows.forEach((item) => {
      const value = item[columnName];
      if (counts[value]) {
        counts[value]++;
      } else {
        counts[value] = 1;
      }
    });
    console.log(counts);

    // Convert the counts object to an array of objects
    const resultArray = Object.entries(counts).map(([key, count]) => ({
      [key]: count,
    }));

    // Sort the resultArray in descending order based on the counts
    resultArray.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);

    return resultArray.slice(0, 5);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Route handler - fetching account_industry
app.get("/industry", async (req, res) => {
  try {
    const resultArray = await fetchAndCount("account_industry");
    res.json(resultArray);
    // await pool.end(); // Close the connection
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Route handler - fetching account_revenue
app.get("/revenue", async (req, res) => {
  try {
    const resultArray = await fetchAndCount("account_revenue");
    res.json(resultArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Route handler - fetching account_country_name
app.get("/country", async (req, res) => {
  try {
    const resultArray = await fetchAndCount("account_country_name");
    res.json(resultArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Route handler - fetching icp_name
app.get("/icp", async (req, res) => {
  try {
    const queryResult = await pool.query("SELECT icp_name FROM sfdc.icp");

    const counts = {};
    queryResult.rows.forEach((item) => {
      const value = item["icp_name"];
      if (counts[value]) {
        counts[value]++;
      } else {
        counts[value] = 1;
      }
    });

    // Convert the counts object to an array of objects
    const resultArray = Object.entries(counts).map(([key, count]) => ({
      [key]: count,
    }));

    // Sort the resultArray in descending order based on the counts
    resultArray.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
    res.json(resultArray.slice(0, 5));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Route handler - fetching listname
app.get("/list", async (req, res) => {
  try {
    const queryResult = await pool.query("SELECT listname FROM sfdc.list");

    const counts = {};
    queryResult.rows.forEach((item) => {
      const value = item["listname"];
      if (counts[value]) {
        counts[value]++;
      } else {
        counts[value] = 1;
      }
    });

    // Convert the counts object to an array of objects
    const resultArray = Object.entries(counts).map(([key, count]) => ({
      [key]: count,
    }));

    // Sort the resultArray in descending order based on the counts
    resultArray.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
    res.json(resultArray.slice(0, 5));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Route handler - fetching account_continent_name
app.get("/continent", async (req, res) => {
  try {
    const resultArray = await fetchAndCount("account_continent_name");
    res.json(resultArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Route handler - fetching account_employees
app.get("/employees", async (req, res) => {
  try {
    const resultArray = await fetchAndCount("account_employees");
    res.json(resultArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Close the pool when the application shuts down
process.on("exit", () => {
  pool.end();
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
