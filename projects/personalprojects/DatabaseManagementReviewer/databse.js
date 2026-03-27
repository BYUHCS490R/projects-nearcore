// Hierarchical Database Generator for Red Cat Schema
function initializeDatabase() {
    try {
        // 1. Create Tables
        alasql("CREATE TABLE Customer (CustomerID INT, FirstName STRING, LastName STRING, StreetAddress STRING, City STRING, State STRING, PostalCode STRING, Country STRING, Phone STRING)");
        alasql("CREATE TABLE Manufacturer (ManufacturerID INT, ManufacturerName STRING, Address1 STRING, Address2 STRING, City STRING, State STRING, PostalCode STRING, Phone STRING, Fax STRING, Contact STRING, URL STRING)");
        alasql("CREATE TABLE Product (ProductID INT, ProductName STRING, ManufacturerID INT, Composition STRING, ListPrice NUMBER, Gender STRING, Category STRING, Color STRING, Description STRING)");
        alasql("CREATE TABLE Employee (EmployeeID INT, FirstName STRING, LastName STRING, Address STRING, ManagerID INT)");
        alasql("CREATE TABLE SalaryEmployee (EmployeeID INT, Salary NUMBER)");
        alasql("CREATE TABLE WageEmployee (EmployeeID INT, Wage NUMBER, MaxHours INT)");
        alasql("CREATE TABLE Sale (SaleID INT, SaleDate STRING, CustomerID INT, Tax NUMBER, Shipping NUMBER)");
        alasql("CREATE TABLE SaleItem (SaleID INT, ProductID INT, ItemSize INT, Quantity INT, SalePrice NUMBER)");

        // Reference Arrays
        const states = ['CA', 'NY', 'TX', 'HI', 'NM', 'NJ', 'WA', 'FL'];
        const categories = ['sneakers', 'boots', 'sandals', 'heels', 'flats', 'loafers'];
        const colors = ['Black', 'Brown', 'White', 'Red', 'Blue', 'Grey'];
        const materials = ['Leather', 'Canvas', 'Synthetic', 'Suede'];
        const genders = ['M', 'F', 'U'];

        // 2. Generate Data (Hierarchical to preserve integrity)
        
        // 20 Manufacturers
        for(let i=1; i<=20; i++) {
            let state = states[Math.floor(Math.random() * states.length)];
            let fax = Math.random() > 0.5 ? `'555-01${i}'` : "NULL";
            alasql(`INSERT INTO Manufacturer VALUES (${i}, 'Mfg ${i}', '123 Main St', '', 'City${i}', '${state}', '12345', '555-00${i}', ${fax}, 'Contact ${i}', 'www.mfg${i}.com')`);
        }

        // 150 Products
        for(let i=1; i<=150; i++) {
            let mId = Math.floor(Math.random() * 20) + 1;
            let comp = materials[Math.floor(Math.random() * materials.length)];
            let price = (Math.random() * 150 + 20).toFixed(2);
            let gen = genders[Math.floor(Math.random() * genders.length)];
            let cat = categories[Math.floor(Math.random() * categories.length)];
            let col = colors[Math.floor(Math.random() * colors.length)];
            alasql(`INSERT INTO Product VALUES (${i}, 'Shoe Pro ${i}', ${mId}, '${comp}', ${price}, '${gen}', '${cat}', '${col}', 'A great ${col} shoe.')`);
        }

        // 300 Customers
        for(let i=1; i<=300; i++) {
            let state = states[Math.floor(Math.random() * states.length)];
            let lname = (i % 20 === 0) ? 'Johnson' : `Smith${i}`; // Ensure some Johnsons exist for the textbook queries
            alasql(`INSERT INTO Customer VALUES (${i}, 'First${i}', '${lname}', '456 Elm', 'City${i}', '${state}', '98765', 'USA', '(555) 123-${i.toString().padStart(4,'0')}')`);
        }

        // 100 Employees (Mix of Salary and Wage)
        for(let i=1; i<=100; i++) {
            let mgr = (i > 10) ? Math.floor(Math.random() * 10) + 1 : "NULL"; // Top 10 are managers
            alasql(`INSERT INTO Employee VALUES (${i}, 'EmpFirst${i}', 'EmpLast${i}', '789 Oak', ${mgr})`);
            
            if (i % 2 === 0) {
                alasql(`INSERT INTO SalaryEmployee VALUES (${i}, ${Math.floor(Math.random() * 60000 + 40000)})`);
            } else {
                alasql(`INSERT INTO WageEmployee VALUES (${i}, ${(Math.random() * 15 + 10).toFixed(2)}, 40)`);
            }
        }

        // 300 Sales
        for(let i=1; i<=300; i++) {
            let cId = Math.floor(Math.random() * 300) + 1;
            let m = Math.floor(Math.random() * 12) + 1;
            let y = Math.random() > 0.5 ? 2014 : 2015;
            let dateStr = `${y}-${m.toString().padStart(2, '0')}-15`;
            let ship = (Math.random() * 20).toFixed(2);
            let tax = (Math.random() * 10).toFixed(2);
            alasql(`INSERT INTO Sale VALUES (${i}, '${dateStr}', ${cId}, ${tax}, ${ship})`);
        }

        // 600 Sale Items (2 per sale)
        let itemIdCounter = 1;
        for(let i=1; i<=300; i++) {
            let items = Math.floor(Math.random() * 3) + 1;
            for(let j=0; j<items; j++) {
                let pId = Math.floor(Math.random() * 150) + 1;
                let size = Math.floor(Math.random() * 6) + 6;
                alasql(`INSERT INTO SaleItem VALUES (${i}, ${pId}, ${size}, ${Math.floor(Math.random()*3)+1}, 50.00)`);
            }
        }

        return true;
    } catch (err) {
        console.error("DB Initialization Error: ", err);
        return false;
    }
}