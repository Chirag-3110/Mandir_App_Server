export const userTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  gotra TEXT,
  password TEXT,
  occupation TEXT,
  age INT,
  gender ENUM('Male', 'Female', 'Other'),
  postal_address TEXT,
  is_active BOOLEAN DEFAULT true,
  is_delete BOOLEAN DEFAULT false,
  created_at TEXT
)
`;

export const admins = `
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT,
  is_active BOOLEAN DEFAULT true,
  is_delete BOOLEAN DEFAULT false,
  created_at TEXT
)
`;

export const events = `
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  description TEXT,
  type BOOLEAN DEFAULT true,
  address TEXT,
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  is_delete BOOLEAN DEFAULT false,
  created_at TEXT
)
`;
export const news = `
CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image TEXT,
  created_at TEXT
)
`;

export const featured = `
CREATE TABLE IF NOT EXISTS featured (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  is_delete BOOLEAN DEFAULT false,
  created_at TEXT
)
`;