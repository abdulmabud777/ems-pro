CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role_id INTEGER NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_role
        FOREIGN KEY(role_id)
        REFERENCES roles(id)
);

CREATE TABLE departments (

    id SERIAL PRIMARY KEY,

    name VARCHAR(100) UNIQUE NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (

    id SERIAL PRIMARY KEY,

    employee_code VARCHAR(20) UNIQUE NOT NULL,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    phone VARCHAR(20),

    salary NUMERIC(10,2),

    joining_date DATE,

    department_id INTEGER,

    manager_id INTEGER,

    status VARCHAR(20) DEFAULT 'ACTIVE',

    photo VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_department
        FOREIGN KEY(department_id)
        REFERENCES departments(id),

    CONSTRAINT fk_manager
        FOREIGN KEY(manager_id)
        REFERENCES employees(id)
);