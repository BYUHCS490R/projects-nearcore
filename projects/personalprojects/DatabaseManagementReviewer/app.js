// -- CURRICULUM: 60 Missions based on Chapter 6 --
const curriculum = [
    { name: "Tier 1: Basic Retrieval & WHERE Clauses", missions: [
        { q: "Retrieve all data from the Customer table.", clue: "Use SELECT * and FROM.", sql: "SELECT * FROM Customer;" },
        { q: "List only the FirstName and LastName of all Customers.", clue: "Specify the columns instead of *.", sql: "SELECT FirstName, LastName FROM Customer;" },
        { q: "Find customers who live in New Mexico ('NM').", clue: "Use a WHERE clause with State = 'NM'.", sql: "SELECT * FROM Customer WHERE State = 'NM';" },
        { q: "List unique states where customers live.", clue: "Use the DISTINCT keyword on the State column.", sql: "SELECT DISTINCT State FROM Customer;" },
        { q: "Find products with a ListPrice of 50 or more.", clue: "Use the >= operator in your WHERE clause.", sql: "SELECT * FROM Product WHERE ListPrice >= 50;" },
        { q: "Find sneakers that cost less than 60.", clue: "Combine conditions with AND: Category = 'sneakers' AND ListPrice < 60.", sql: "SELECT * FROM Product WHERE Category = 'sneakers' AND ListPrice < 60;" },
        { q: "List sales where Tax plus Shipping is over 20.", clue: "You can do math in the WHERE clause: (Tax + Shipping) > 20.", sql: "SELECT * FROM Sale WHERE (Tax + Shipping) > 20;" },
        { q: "List products costing between 20 and 50 inclusive.", clue: "Use the BETWEEN operator.", sql: "SELECT * FROM Product WHERE ListPrice BETWEEN 20 AND 50;" },
        { q: "Find products in categories 'flats', 'sandals', or 'boots'.", clue: "Use the IN operator with a list of values.", sql: "SELECT * FROM Product WHERE Category IN ('flats', 'sandals', 'boots');" },
        { q: "Find customers whose last name starts with 'Smi'.", clue: "Use the LIKE operator with the % wildcard.", sql: "SELECT * FROM Customer WHERE LastName LIKE 'Smi%';" }
    ]},
    { name: "Tier 2: Functions, Aggregates & Grouping", missions: [
        { q: "List Manufacturers where the Fax number has not been entered.", clue: "You must use IS NULL, not = NULL.", sql: "SELECT * FROM Manufacturer WHERE Fax IS NULL;" },
        { q: "Show the SaleDate and the calculated Total Cost (Tax + Shipping) named as 'TotalExtra'.", clue: "Do the math in SELECT and use AS for the alias.", sql: "SELECT SaleDate, (Tax + Shipping) AS TotalExtra FROM Sale;" },
        { q: "Find sales that occurred in the 12th month (December).", clue: "Use the scalar MONTH() function in the WHERE clause.", sql: "SELECT * FROM Sale WHERE MONTH(SaleDate) = 12;" },
        { q: "Concatenate Employee FirstName and LastName with a space in between, labeled 'FullName'.", clue: "Use the + operator or CONCAT() function.", sql: "SELECT FirstName + ' ' + LastName AS FullName FROM Employee;" },
        { q: "What is the highest and lowest ListPrice of any product?", clue: "Use the MAX() and MIN() aggregate functions.", sql: "SELECT MAX(ListPrice), MIN(ListPrice) FROM Product;" },
        { q: "What is the average shipping cost for all sales?", clue: "Use the AVG() function on the Shipping column.", sql: "SELECT AVG(Shipping) FROM Sale;" },
        { q: "How many total products exist in the database?", clue: "Use the COUNT() function.", sql: "SELECT COUNT(ProductID) FROM Product;" },
        { q: "Show the average ListPrice for EACH Category.", clue: "Select Category and AVG(ListPrice), then you MUST use GROUP BY Category.", sql: "SELECT Category, AVG(ListPrice) FROM Product GROUP BY Category;" },
        { q: "Show the number of products in each Category.", clue: "Select Category and COUNT(ProductID), then GROUP BY Category.", sql: "SELECT Category, COUNT(ProductID) FROM Product GROUP BY Category;" },
        { q: "Show categories that have an average ListPrice strictly greater than 80.", clue: "Filter groups using HAVING after your GROUP BY.", sql: "SELECT Category, AVG(ListPrice) FROM Product GROUP BY Category HAVING AVG(ListPrice) > 80;" }
    ]},
    { name: "Tier 3: Joins (Inner, Outer, Self)", missions: [
        { q: "List Products and their ManufacturerName.", clue: "Use an INNER JOIN between Product and Manufacturer ON ManufacturerID.", sql: "SELECT p.ProductName, m.ManufacturerName FROM Product p JOIN Manufacturer m ON p.ManufacturerID = m.ManufacturerID;" },
        { q: "List all Sales information along with the Customer's LastName.", clue: "Join Sale and Customer ON CustomerID.", sql: "SELECT s.*, c.LastName FROM Sale s JOIN Customer c ON s.CustomerID = c.CustomerID;" },
        { q: "Join Product and SaleItem to find the SalePrice of 'Black' sneakers.", clue: "Join tables ON ProductID, then add a WHERE clause.", sql: "SELECT p.ProductName, si.SalePrice FROM Product p JOIN SaleItem si ON p.ProductID = si.ProductID WHERE p.Color = 'Black' AND p.Category = 'sneakers';" },
        { q: "Find customers and employees who live in the same City.", clue: "Join on a non-key field! JOIN Employee ON Customer.City = Employee.City.", sql: "SELECT c.LastName AS CustName, e.LastName AS EmpName, c.City FROM Customer c JOIN Employee e ON c.City = e.City;" },
        { q: "List Employees and the names of their Managers.", clue: "Self-Join! Join Employee E to Employee M ON E.ManagerID = M.EmployeeID.", sql: "SELECT E.LastName AS Employee, M.LastName AS Manager FROM Employee E JOIN Employee M ON E.ManagerID = M.EmployeeID;" },
        { q: "List all Manufacturers, and any products they make. Include manufacturers with NO products.", clue: "Use a LEFT OUTER JOIN starting with Manufacturer.", sql: "SELECT m.ManufacturerName, p.ProductName FROM Manufacturer m LEFT OUTER JOIN Product p ON m.ManufacturerID = p.ManufacturerID;" },
        { q: "List ALL Employees and any Salaries they have. Include wage employees who have NULL salary.", clue: "LEFT OUTER JOIN Employee with SalaryEmployee.", sql: "SELECT e.LastName, s.Salary FROM Employee e LEFT OUTER JOIN SalaryEmployee s ON e.EmployeeID = s.EmployeeID;" },
        { q: "Show a cross product (all possible combinations) of Categories and Colors.", clue: "A join with no ON condition creates a Cartesian product. (Use caution!)", sql: "SELECT DISTINCT Category, Color FROM Product;" }, // Safe workaround in AlaSQL
        { q: "List products sold on '2015-12-15'. Note: Requires joining Product, SaleItem, and Sale.", clue: "Chain joins: Sale JOIN SaleItem ON... JOIN Product ON...", sql: "SELECT p.ProductName FROM Sale s JOIN SaleItem si ON s.SaleID = si.SaleID JOIN Product p ON si.ProductID = p.ProductID WHERE s.SaleDate = '2015-12-15';" },
        { q: "Find Manufacturers that have absolutely no products in the database.", clue: "LEFT JOIN Manufacturer to Product, then add WHERE ProductID IS NULL.", sql: "SELECT m.ManufacturerName FROM Manufacturer m LEFT OUTER JOIN Product p ON m.ManufacturerID = p.ManufacturerID WHERE p.ProductID IS NULL;" }
    ]},
    { name: "Tier 4: Subqueries in WHERE, SELECT, FROM", missions: [
        { q: "List Products whose ListPrice is greater than the overall average ListPrice.", clue: "WHERE ListPrice > (SELECT AVG(ListPrice) FROM Product)", sql: "SELECT ProductName, ListPrice FROM Product WHERE ListPrice > (SELECT AVG(ListPrice) FROM Product);" },
        { q: "Find the names of Customers who have made a purchase.", clue: "WHERE CustomerID IN (SELECT CustomerID FROM Sale)", sql: "SELECT FirstName, LastName FROM Customer WHERE CustomerID IN (SELECT CustomerID FROM Sale);" },
        { q: "Find products made by manufacturers located in 'CA'.", clue: "WHERE ManufacturerID IN (SELECT ManufacturerID FROM Manufacturer WHERE State='CA')", sql: "SELECT ProductName FROM Product WHERE ManufacturerID IN (SELECT ManufacturerID FROM Manufacturer WHERE State = 'CA');" },
        { q: "List WageEmployees whose wage is less than the maximum wage.", clue: "WHERE Wage < (SELECT MAX(Wage) FROM WageEmployee)", sql: "SELECT EmployeeID, Wage FROM WageEmployee WHERE Wage < (SELECT MAX(Wage) FROM WageEmployee);" },
        { q: "Show the ProductName, ListPrice, and the difference between its price and the average price.", clue: "Put a subquery directly inside the SELECT clause.", sql: "SELECT ProductName, ListPrice, (ListPrice - (SELECT AVG(ListPrice) FROM Product)) AS PriceDiff FROM Product;" },
        { q: "Find Customers who have NEVER made a purchase using a subquery.", clue: "Use NOT IN (SELECT CustomerID FROM Sale)", sql: "SELECT LastName FROM Customer WHERE CustomerID NOT IN (SELECT CustomerID FROM Sale);" },
        { q: "List products that cost exactly the same as the most expensive 'sneaker'.", clue: "WHERE ListPrice = (SELECT MAX(ListPrice) FROM Product WHERE Category='sneakers')", sql: "SELECT ProductName, ListPrice FROM Product WHERE ListPrice = (SELECT MAX(ListPrice) FROM Product WHERE Category = 'sneakers');" },
        { q: "Use a subquery in the FROM clause to find the average of total sales per customer.", clue: "SELECT AVG(Total) FROM (SELECT SUM(Tax+Shipping) as Total FROM Sale GROUP BY CustomerID) AS Sub;", sql: "SELECT AVG(Total) FROM (SELECT SUM(Tax+Shipping) as Total FROM Sale GROUP BY CustomerID) AS Sub;" },
        { q: "Find the manufacturer that produces the most expensive product.", clue: "WHERE ManufacturerID = (SELECT ManufacturerID FROM Product WHERE ListPrice = (SELECT MAX(ListPrice) FROM Product))", sql: "SELECT ManufacturerName FROM Manufacturer WHERE ManufacturerID IN (SELECT ManufacturerID FROM Product WHERE ListPrice = (SELECT MAX(ListPrice) FROM Product));" },
        { q: "List Employees who are also Managers.", clue: "WHERE EmployeeID IN (SELECT ManagerID FROM Employee WHERE ManagerID IS NOT NULL)", sql: "SELECT LastName FROM Employee WHERE EmployeeID IN (SELECT ManagerID FROM Employee WHERE ManagerID IS NOT NULL);" }
    ]},
    { name: "Tier 5: Correlated Subqueries & Set Operations", missions: [
        { q: "CORRELATED: List Products that are priced higher than the average price FOR THEIR SPECIFIC CATEGORY.", clue: "Outer query aliases Product P1. Inner query SELECT AVG(ListPrice) FROM Product P2 WHERE P1.Category = P2.Category.", sql: "SELECT ProductName, Category, ListPrice FROM Product P1 WHERE ListPrice > (SELECT AVG(ListPrice) FROM Product P2 WHERE P1.Category = P2.Category);" },
        { q: "CORRELATED: Find Customers who made a purchase where Shipping was greater than their own average shipping cost.", clue: "Correlate inside the subquery: WHERE S1.Shipping > (SELECT AVG(Shipping) FROM Sale S2 WHERE S1.CustomerID = S2.CustomerID)", sql: "SELECT DISTINCT CustomerID FROM Sale S1 WHERE Shipping > (SELECT AVG(Shipping) FROM Sale S2 WHERE S1.CustomerID = S2.CustomerID);" },
        { q: "Use EXISTS: Find Manufacturers that produce 'boots'.", clue: "WHERE EXISTS (SELECT * FROM Product P WHERE P.ManufacturerID = M.ManufacturerID AND Category = 'boots')", sql: "SELECT ManufacturerName FROM Manufacturer M WHERE EXISTS (SELECT * FROM Product P WHERE P.ManufacturerID = M.ManufacturerID AND Category = 'boots');" },
        { q: "Use NOT EXISTS: Find Customers with NO sales.", clue: "WHERE NOT EXISTS (SELECT * FROM Sale S WHERE S.CustomerID = C.CustomerID)", sql: "SELECT LastName FROM Customer C WHERE NOT EXISTS (SELECT * FROM Sale S WHERE S.CustomerID = C.CustomerID);" },
        { q: "UNION: Get a single column list of all Cities where Customers OR Manufacturers live.", clue: "SELECT City FROM Customer UNION SELECT City FROM Manufacturer", sql: "SELECT City FROM Customer UNION SELECT City FROM Manufacturer;" },
        { q: "INTERSECT: Find Cities that have BOTH a Customer and a Manufacturer.", clue: "SELECT City FROM Customer INTERSECT SELECT City FROM Manufacturer", sql: "SELECT City FROM Customer INTERSECT SELECT City FROM Manufacturer;" },
        { q: "UNION ALL: Get a list of all Cities, keeping duplicates.", clue: "UNION ALL keeps duplicates.", sql: "SELECT City FROM Customer UNION ALL SELECT City FROM Manufacturer;" },
        { q: "CORRELATED: Find the most recent SaleDate for each customer.", clue: "WHERE SaleDate = (SELECT MAX(SaleDate) FROM Sale S2 WHERE S1.CustomerID = S2.CustomerID)", sql: "SELECT CustomerID, SaleDate FROM Sale S1 WHERE SaleDate = (SELECT MAX(SaleDate) FROM Sale S2 WHERE S1.CustomerID = S2.CustomerID);" },
        { q: "Find employees who earn more than their manager.", clue: "Join Employee and SalaryEmployee twice (once for emp, once for mgr).", sql: "SELECT E.LastName FROM Employee E JOIN SalaryEmployee SE ON E.EmployeeID = SE.EmployeeID JOIN Employee M ON E.ManagerID = M.EmployeeID JOIN SalaryEmployee SM ON M.EmployeeID = SM.EmployeeID WHERE SE.Salary > SM.Salary;" },
        { q: "Find the Category with the highest average ListPrice.", clue: "Order by the aggregate and LIMIT 1.", sql: "SELECT Category, AVG(ListPrice) FROM Product GROUP BY Category ORDER BY AVG(ListPrice) DESC LIMIT 1;" }
    ]},
    { name: "Tier 6: Change Operations & Views (Read Only in Sandbox)", missions: [
        { q: "How do you add a new Customer?", clue: "Use INSERT INTO Customer (cols) VALUES (vals);", sql: "INSERT INTO Customer (CustomerID, FirstName, LastName) VALUES (999, 'Test', 'User'); SELECT * FROM Customer WHERE CustomerID = 999;" },
        { q: "How do you increase all ListPrices by 10%?", clue: "Use UPDATE Product SET ListPrice = ListPrice * 1.1;", sql: "UPDATE Product SET ListPrice = ListPrice * 1.1; SELECT * FROM Product LIMIT 5;" },
        { q: "How do you delete Sales with 0 shipping?", clue: "Use DELETE FROM Sale WHERE Shipping = 0;", sql: "DELETE FROM Sale WHERE Shipping = 0;" },
        { q: "How do you create a VIEW of expensive products?", clue: "CREATE VIEW Expensive AS SELECT * FROM Product WHERE ListPrice > 100;", sql: "CREATE VIEW Expensive AS SELECT * FROM Product WHERE ListPrice > 100; SELECT * FROM Expensive;" },
        { q: "How do you drop a view?", clue: "DROP VIEW view_name;", sql: "DROP VIEW Expensive;" },
        { q: "Copy all 'sneakers' into a new table called SneakerArchive.", clue: "CREATE TABLE SneakerArchive AS SELECT * FROM Product WHERE Category = 'sneakers';", sql: "CREATE TABLE SneakerArchive AS SELECT * FROM Product WHERE Category = 'sneakers'; SELECT * FROM SneakerArchive LIMIT 3;" },
        { q: "UPDATE a customer's city based on a subquery match.", clue: "UPDATE Customer SET City = 'Moved' WHERE CustomerID IN (SELECT CustomerID FROM Sale WHERE Tax > 5);", sql: "UPDATE Customer SET City = 'Moved' WHERE CustomerID IN (SELECT CustomerID FROM Sale WHERE Tax > 5);" },
        { q: "Delete a parent record (Fails if foreign keys are strictly enforced!).", clue: "DELETE FROM Customer WHERE CustomerID = 1;", sql: "DELETE FROM Customer WHERE CustomerID = 1;" },
        { q: "Create a View showing total sales per customer.", clue: "CREATE VIEW CustSales AS SELECT CustomerID, SUM(Tax+Shipping) FROM Sale GROUP BY CustomerID;", sql: "CREATE VIEW CustSales AS SELECT CustomerID, SUM(Tax+Shipping) AS Total FROM Sale GROUP BY CustomerID; SELECT * FROM CustSales LIMIT 5;" },
        { q: "Retrieve from your newly created View.", clue: "Treat it like a normal table.", sql: "SELECT * FROM CustSales WHERE Total > 10;" }
    ]}
];

// -- STATE MANAGEMENT --
let currentTier = 0;
let currentMission = 0;

// -- INITIALIZATION --
window.onload = async function() {
    const statusMsg = document.getElementById('statusMsg');
    
    // 1. Build Database
    const dbReady = initializeDatabase();
    if(dbReady) {
        statusMsg.innerText = "Database Online: 1,000+ Records Loaded.";
        statusMsg.className = "status-msg success";
    }

    // 2. Populate Dropdowns
    const tierSelect = document.getElementById('tierSelect');
    curriculum.forEach((tier, i) => {
        let opt = document.createElement('option');
        opt.value = i; opt.text = tier.name;
        tierSelect.appendChild(opt);
    });

    tierSelect.addEventListener('change', (e) => {
        currentTier = e.target.value;
        populateMissions();
    });

    document.getElementById('missionSelect').addEventListener('change', (e) => {
        currentMission = e.target.value;
        loadMissionUI();
    });

    // 3. UI Listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('runBtn').addEventListener('click', executeSQL);
    document.getElementById('clueBtn').addEventListener('click', () => toggleBox('clueBox'));
    document.getElementById('answerBtn').addEventListener('click', showAnswer);
    
    // Modal Logic
    document.getElementById('schemaBtn').addEventListener('click', () => document.getElementById('schemaModal').style.display = 'flex');
    document.getElementById('closeSchema').addEventListener('click', () => document.getElementById('schemaModal').style.display = 'none');

    // Start
    populateMissions();
};

function populateMissions() {
    const missionSelect = document.getElementById('missionSelect');
    missionSelect.innerHTML = '';
    
    curriculum[currentTier].missions.forEach((m, i) => {
        let opt = document.createElement('option');
        opt.value = i; opt.text = `Mission ${i+1}: ${m.q.substring(0, 30)}...`;
        missionSelect.appendChild(opt);
    });
    
    currentMission = 0;
    loadMissionUI();
}

function loadMissionUI() {
    const mission = curriculum[currentTier].missions[currentMission];
    document.getElementById('mTitle').innerText = `Mission ${parseInt(currentMission)+1}`;
    document.getElementById('mTask').innerText = mission.q;
    document.getElementById('clueBox').innerText = mission.clue;
    document.getElementById('answerBox').innerText = mission.sql;
    
    document.getElementById('clueBox').style.display = 'none';
    document.getElementById('answerBox').style.display = 'none';
    document.getElementById('sqlInput').value = '';
    
    // Clear Table
    document.getElementById('tHead').innerHTML = '';
    document.getElementById('tBody').innerHTML = '';
}

function toggleBox(id) {
    const box = document.getElementById(id);
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function showAnswer() {
    toggleBox('answerBox');
    document.getElementById('sqlInput').value = curriculum[currentTier].missions[currentMission].sql;
}

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('themeToggle');
    if(body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        btn.innerText = '🌙';
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        btn.innerText = '☀️';
    }
}

// -- SQL EXECUTION ENGINE --
function executeSQL() {
    let query = document.getElementById('sqlInput').value.trim();
    if(!query) return;

    const tHead = document.getElementById('tHead');
    const tBody = document.getElementById('tBody');
    tHead.innerHTML = ''; tBody.innerHTML = '';

    try {
        // Safe Guard: Inject LIMIT if missing to prevent browser crash on bad cross joins
        if(query.toUpperCase().includes('SELECT') && !query.toUpperCase().includes('LIMIT')) {
            query = query.replace(/;$/, '') + ' LIMIT 500;';
        }

        const res = alasql(query);
        
        // Handle queries that don't return datasets (like CREATE VIEW, UPDATE)
        if(typeof res === 'number' || res === undefined || (Array.isArray(res) && res.length === 0)) {
            tBody.innerHTML = `<tr><td style="color:var(--success)">Query executed successfully. (0 rows returned or operation complete).</td></tr>`;
            return;
        }
        
        // If multiple statements were run, grab the last result set
        let data = Array.isArray(res[0]) ? res[res.length-1] : res;
        
        if(data.length === 0) {
            tBody.innerHTML = '<tr><td>No records found.</td></tr>';
            return;
        }

        // Generate Headers
        let headerRow = '<tr>';
        for(let key in data[0]) { headerRow += `<th>${key}</th>`; }
        headerRow += '</tr>';
        tHead.innerHTML = headerRow;

        // Generate Rows
        data.forEach(row => {
            let tr = '<tr>';
            for(let key in row) { tr += `<td>${row[key]}</td>`; }
            tr += '</tr>';
            tBody.innerHTML += tr;
        });

    } catch (err) {
        tBody.innerHTML = `<tr><td style="color:var(--danger)"><strong>SQL Error:</strong> ${err.message}</td></tr>`;
    }
}