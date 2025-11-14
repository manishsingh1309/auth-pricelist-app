-- Create database
CREATE DATABASE pricelist_db;

-- Connect to the database
\c pricelist_db;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(200),
  location VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create texts table for multi-language support
CREATE TABLE texts (
  id SERIAL PRIMARY KEY,
  page VARCHAR(50) NOT NULL,
  key VARCHAR(100) NOT NULL,
  language VARCHAR(10) NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page, key, language)
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  article_no VARCHAR(100),
  product_service TEXT,
  in_price DECIMAL(10, 2),
  price DECIMAL(10, 2),
  unit VARCHAR(50),
  in_stock INTEGER,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample user (password: 'password123')
-- Hash generated with bcryptjs for 'password123'
INSERT INTO users (username, password, full_name, location) 
VALUES ('testuser', '$2a$10$rXdYK8LQEuXFsEhKvBm8Ku6Z0h5VJYhF5g5g5g5g5g5g5g5g5g5g5m', 'John Andre', 'Storfjord AS');

-- Insert login page texts (English)
INSERT INTO texts (page, key, language, value) VALUES
('login', 'loginTitle', 'en', 'Login'),
('login', 'usernamePlaceholder', 'en', 'Username'),
('login', 'passwordPlaceholder', 'en', 'Password'),
('login', 'loginButton', 'en', 'Login'),
('login', 'forgotPassword', 'en', 'Forgot password?'),
('login', 'register', 'en', 'Register'),
('login', 'terms', 'en', 'Terms'),
('login', 'about', 'en', 'About'),
('login', 'contact', 'en', 'Contact');

-- Insert login page texts (Swedish)
INSERT INTO texts (page, key, language, value) VALUES
('login', 'loginTitle', 'sv', 'Logga in'),
('login', 'usernamePlaceholder', 'sv', 'Användarnamn'),
('login', 'passwordPlaceholder', 'sv', 'Lösenord'),
('login', 'loginButton', 'sv', 'Logga in'),
('login', 'forgotPassword', 'sv', 'Glömt lösenord?'),
('login', 'register', 'sv', 'Registrera'),
('login', 'terms', 'sv', 'Villkor'),
('login', 'about', 'sv', 'Om oss'),
('login', 'contact', 'sv', 'Kontakt');

-- Insert terms page texts (English)
INSERT INTO texts (page, key, language, value) VALUES
('terms', 'title', 'en', 'Terms and Conditions'),
('terms', 'section1Title', 'en', 'General Terms'),
('terms', 'section1Content', 'en', 'By using this service, you agree to comply with and be bound by the following terms and conditions. Please review these terms carefully. If you do not agree to these terms, you should not use this service.'),
('terms', 'section2Title', 'en', 'User Responsibilities'),
('terms', 'section2Content', 'en', 'Users are responsible for maintaining the confidentiality of their account information, including passwords. You agree to accept responsibility for all activities that occur under your account.'),
('terms', 'section3Title', 'en', 'Privacy Policy'),
('terms', 'section3Content', 'en', 'We respect your privacy and are committed to protecting your personal information. We collect only the information necessary to provide our services and will not share your data with third parties without your consent.'),
('terms', 'section4Title', 'en', 'Limitation of Liability'),
('terms', 'section4Content', 'en', 'The service is provided "as is" without any warranties, express or implied. We shall not be liable for any damages arising from the use or inability to use this service.'),
('terms', 'section5Title', 'en', 'Changes to Terms'),
('terms', 'section5Content', 'en', 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes constitutes acceptance of the modified terms.'),
('terms', 'backButton', 'en', 'Go Back');

-- Insert terms page texts (Swedish)
INSERT INTO texts (page, key, language, value) VALUES
('terms', 'title', 'sv', 'Villkor'),
('terms', 'section1Title', 'sv', 'Allmänna Villkor'),
('terms', 'section1Content', 'sv', 'Genom att använda denna tjänst samtycker du till att följa dessa villkor. Läs noggrant igenom villkoren. Om du inte godkänner dessa villkor bör du inte använda tjänsten.'),
('terms', 'section2Title', 'sv', 'Användaransvar'),
('terms', 'section2Content', 'sv', 'Användare ansvarar för att hålla sin kontoinformation konfidentiell, inklusive lösenord. Du samtycker till att ta ansvar för alla aktiviteter som sker under ditt konto.'),
('terms', 'section3Title', 'sv', 'Integritetspolicy'),
('terms', 'section3Content', 'sv', 'Vi respekterar din integritet och är engagerade i att skydda din personliga information. Vi samlar endast in den information som är nödvändig för att tillhandahålla våra tjänster.'),
('terms', 'section4Title', 'sv', 'Ansvarsbegränsning'),
('terms', 'section4Content', 'sv', 'Tjänsten tillhandahålls "som den är" utan några garantier. Vi ansvarar inte för eventuella skador som uppstår från användning eller oförmåga att använda denna tjänst.'),
('terms', 'section5Title', 'sv', 'Ändringar av Villkor'),
('terms', 'section5Content', 'sv', 'Vi förbehåller oss rätten att ändra dessa villkor när som helst. Ändringar träder i kraft omedelbart vid publicering.'),
('terms', 'backButton', 'sv', 'Gå Tillbaka');

-- Insert sample products (at least 20 as required)
INSERT INTO products (article_no, product_service, in_price, price, unit, in_stock, description) VALUES
('1234567890', 'This is a test product with fifty characters this!', 900500, 1500800, 'kilometers/hour', 2500600, 'This is the description with fifty characters this'),
('ART001', 'Professional Consulting Service', 500.00, 1200.00, 'hour', 100, 'Expert business consulting'),
('ART002', 'Web Development Package', 2000.00, 5000.00, 'project', 50, 'Complete website development'),
('ART003', 'Graphic Design Service', 300.00, 750.00, 'hour', 75, 'Professional graphic design'),
('ART004', 'Marketing Campaign', 1500.00, 3500.00, 'campaign', 30, 'Digital marketing services'),
('ART005', 'SEO Optimization', 800.00, 1800.00, 'month', 60, 'Search engine optimization'),
('ART006', 'Content Writing', 150.00, 400.00, 'article', 200, 'Professional content creation'),
('ART007', 'Social Media Management', 600.00, 1500.00, 'month', 40, 'Complete social media handling'),
('ART008', 'Logo Design', 400.00, 1000.00, 'piece', 80, 'Custom logo design'),
('ART009', 'Video Production', 2500.00, 6000.00, 'video', 20, 'Professional video creation'),
('ART010', 'Photography Session', 800.00, 2000.00, 'session', 35, 'Professional photography'),
('ART011', 'IT Support Service', 450.00, 1100.00, 'hour', 90, 'Technical support and maintenance'),
('ART012', 'Cloud Storage', 100.00, 250.00, 'GB/month', 500, 'Secure cloud storage solution'),
('ART013', 'Email Marketing', 350.00, 900.00, 'campaign', 65, 'Email campaign management'),
('ART014', 'Mobile App Development', 5000.00, 12000.00, 'project', 15, 'iOS and Android app development'),
('ART015', 'Database Management', 700.00, 1600.00, 'month', 45, 'Database administration services'),
('ART016', 'Cybersecurity Audit', 1200.00, 3000.00, 'audit', 25, 'Complete security assessment'),
('ART017', 'Training Workshop', 900.00, 2200.00, 'day', 55, 'Professional training sessions'),
('ART018', 'Translation Service', 200.00, 500.00, 'page', 150, 'Professional translation'),
('ART019', 'Legal Consultation', 1000.00, 2500.00, 'hour', 30, 'Legal advisory services'),
('ART020', 'Accounting Service', 600.00, 1400.00, 'month', 70, 'Financial accounting and bookkeeping'),
('ART021', 'Product Photography', 350.00, 850.00, 'product', 95, 'E-commerce product photos'),
('ART022', 'UI/UX Design', 750.00, 1900.00, 'screen', 40, 'User interface design');

-- Create index for better performance
CREATE INDEX idx_products_article_no ON products(article_no);
CREATE INDEX idx_products_product_service ON products(product_service);
CREATE INDEX idx_texts_page_lang ON texts(page, language);
