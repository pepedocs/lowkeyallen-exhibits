# SQL Database Language (1974)

## What
The Structured Query Language (SQL), originally developed by Donald Chamberlin and Raymond Boyce at IBM as part of the System R relational database project. SQL provided the first practical way to query relational databases using English-like statements.

## When
1974

## Where
IBM Research, San Jose, California

## Language
SQL

## Category
Integration

## Code
```sql
-- Original IBM System R SQL examples
-- These demonstrate the revolutionary concepts SQL introduced

-- Create a relational table structure
CREATE TABLE EMPLOYEES (
    EMP_ID INTEGER PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL,
    DEPARTMENT VARCHAR(30),
    SALARY DECIMAL(10,2),
    HIRE_DATE DATE,
    MANAGER_ID INTEGER REFERENCES EMPLOYEES(EMP_ID)
);

CREATE TABLE DEPARTMENTS (
    DEPT_ID INTEGER PRIMARY KEY,
    DEPT_NAME VARCHAR(30) NOT NULL,
    BUDGET DECIMAL(12,2),
    LOCATION VARCHAR(50)
);

-- Insert sample data
INSERT INTO DEPARTMENTS VALUES (10, 'ACCOUNTING', 500000.00, 'NEW YORK');
INSERT INTO DEPARTMENTS VALUES (20, 'RESEARCH', 750000.00, 'DALLAS');
INSERT INTO DEPARTMENTS VALUES (30, 'SALES', 1000000.00, 'CHICAGO');

INSERT INTO EMPLOYEES VALUES (7839, 'KING', 'ACCOUNTING', 5000.00, '1981-11-17', NULL);
INSERT INTO EMPLOYEES VALUES (7698, 'BLAKE', 'SALES', 2850.00, '1981-05-01', 7839);
INSERT INTO EMPLOYEES VALUES (7782, 'CLARK', 'ACCOUNTING', 2450.00, '1981-06-09', 7839);
INSERT INTO EMPLOYEES VALUES (7566, 'JONES', 'RESEARCH', 2975.00, '1981-04-02', 7839);

-- Revolutionary SQL queries that changed database interaction

-- 1. Simple selection with conditions
SELECT NAME, SALARY 
FROM EMPLOYEES 
WHERE DEPARTMENT = 'RESEARCH' 
AND SALARY > 2000;

-- 2. Joins - connecting data across tables
SELECT E.NAME, E.SALARY, D.DEPT_NAME, D.LOCATION
FROM EMPLOYEES E, DEPARTMENTS D
WHERE E.DEPARTMENT = D.DEPT_NAME
AND E.SALARY > (SELECT AVG(SALARY) FROM EMPLOYEES);

-- 3. Subqueries - queries within queries
SELECT NAME, SALARY
FROM EMPLOYEES
WHERE SALARY > (
    SELECT AVG(SALARY) 
    FROM EMPLOYEES 
    WHERE DEPARTMENT = 'SALES'
);

-- 4. Aggregation functions
SELECT DEPARTMENT, 
       COUNT(*) AS NUM_EMPLOYEES,
       AVG(SALARY) AS AVG_SALARY,
       MAX(SALARY) AS MAX_SALARY,
       MIN(SALARY) AS MIN_SALARY
FROM EMPLOYEES
GROUP BY DEPARTMENT
HAVING COUNT(*) > 1;

-- 5. Self-joins for hierarchical data
SELECT M.NAME AS MANAGER, E.NAME AS EMPLOYEE
FROM EMPLOYEES E, EMPLOYEES M
WHERE E.MANAGER_ID = M.EMP_ID
ORDER BY M.NAME;

-- 6. Complex analytical query
WITH DEPT_STATS AS (
    SELECT DEPARTMENT,
           AVG(SALARY) AS DEPT_AVG_SALARY,
           COUNT(*) AS DEPT_SIZE
    FROM EMPLOYEES
    GROUP BY DEPARTMENT
)
SELECT E.NAME,
       E.SALARY,
       E.DEPARTMENT,
       DS.DEPT_AVG_SALARY,
       (E.SALARY - DS.DEPT_AVG_SALARY) AS SALARY_DIFF,
       CASE 
           WHEN E.SALARY > DS.DEPT_AVG_SALARY THEN 'ABOVE AVERAGE'
           WHEN E.SALARY < DS.DEPT_AVG_SALARY THEN 'BELOW AVERAGE'
           ELSE 'AVERAGE'
       END AS SALARY_CATEGORY
FROM EMPLOYEES E
JOIN DEPT_STATS DS ON E.DEPARTMENT = DS.DEPARTMENT
ORDER BY E.DEPARTMENT, E.SALARY DESC;

-- 7. Data modification operations
UPDATE EMPLOYEES 
SET SALARY = SALARY * 1.10 
WHERE DEPARTMENT = 'RESEARCH' 
AND HIRE_DATE < '1982-01-01';

-- 8. Transaction control
BEGIN TRANSACTION;

    UPDATE EMPLOYEES 
    SET SALARY = SALARY * 1.05 
    WHERE DEPARTMENT = 'ACCOUNTING';
    
    INSERT INTO EMPLOYEES VALUES 
    (9999, 'NEW HIRE', 'ACCOUNTING', 3000.00, CURRENT_DATE, 7782);
    
    -- Check if update was successful
    IF (SELECT COUNT(*) FROM EMPLOYEES WHERE DEPARTMENT = 'ACCOUNTING') > 5
        ROLLBACK TRANSACTION;
    ELSE
        COMMIT TRANSACTION;

-- 9. Views for data abstraction
CREATE VIEW HIGH_EARNERS AS
SELECT E.NAME, E.SALARY, E.DEPARTMENT, D.LOCATION
FROM EMPLOYEES E
JOIN DEPARTMENTS D ON E.DEPARTMENT = D.DEPT_NAME
WHERE E.SALARY > (SELECT AVG(SALARY) FROM EMPLOYEES);

-- 10. Advanced features that made SQL powerful
SELECT DEPARTMENT,
       NAME,
       SALARY,
       ROW_NUMBER() OVER (PARTITION BY DEPARTMENT ORDER BY SALARY DESC) AS DEPT_RANK,
       NTILE(4) OVER (ORDER BY SALARY) AS SALARY_QUARTILE,
       LAG(SALARY, 1, 0) OVER (PARTITION BY DEPARTMENT ORDER BY HIRE_DATE) AS PREV_HIRE_SALARY
FROM EMPLOYEES
ORDER BY DEPARTMENT, SALARY DESC;
```

## Source
Based on "System R: Relational Approach to Database Management" by Astrahan et al.

## Why This Matters
SQL transformed databases from complex, programmer-only tools into accessible systems that business users could query directly. By providing a declarative language that described what you wanted rather than how to get it, SQL made database access democratic and spawned the multi-billion dollar database industry.

## Expert Explanation
SQL's revolutionary insight was treating data queries as mathematical set operations rather than procedural instructions. Instead of writing complex loops and navigation code, users could simply describe their desired result set using English-like syntax. The database engine would figure out the optimal way to retrieve the data, using techniques like query optimization and indexing. This abstraction layer made databases far more accessible while enabling sophisticated optimizations that individual programmers couldn't achieve.

## The Impact
- Created the modern database industry worth hundreds of billions of dollars
- Made data analysis accessible to non-programmers through declarative syntax
- Established relational databases as the dominant data storage paradigm
- Enabled the development of business intelligence and analytics tools
- Influenced the design of modern query languages like SPARQL and GraphQL
- Remains the primary interface for most enterprise data systems 40+ years later
