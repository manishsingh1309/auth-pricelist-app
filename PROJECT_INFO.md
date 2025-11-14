# Project Information

## Version Details

### Frontend Technologies
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Router**: React Router DOM 6.20.0
- **Language**: JavaScript (ES6+/ES2015+)
- **Styling**: Vanilla CSS (CSS3)
- **Package Manager**: npm

### Backend Technologies
- **Runtime**: Node.js 18.x LTS
- **Framework**: Express 4.18.2
- **Database**: PostgreSQL 14+
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **Database Client**: pg 8.11.3
- **Language**: JavaScript (ES6+ with ES Modules)

### Development Tools
- **Version Control**: Git
- **Code Editor**: VS Code (recommended)
- **API Testing**: curl, Postman, or Thunder Client

## Application Features

### Implemented Features
✅ User authentication with JWT tokens
✅ Multi-language support (English/Swedish)
✅ Responsive design (mobile, tablet, desktop)
✅ Login page with hamburger menu
✅ Terms and conditions page
✅ Price list with editable fields
✅ Real-time database updates
✅ Protected routes
✅ PostgreSQL database integration
✅ RESTful API
✅ CORS enabled
✅ Environment-based configuration

### Pages & Functionality

#### 1. Login Page (`/login`)
- JWT-based authentication
- Username and password fields
- Language switcher (English/Swedish)
- Hamburger menu with navigation
- Background image from external source
- Logo and flag images
- Responsive on all devices
- Redirects to pricelist after successful login

#### 2. Terms Page (`/terms`)
- Multi-language content from database
- Language switcher
- Scrollable content sections
- Back button navigation
- Mobile portrait responsive

#### 3. Price List Page (`/pricelist`)
- Protected route (requires authentication)
- User info display
- Menu sidebar with navigation
- Search functionality (article number and product)
- Action buttons (New Product, Print List, Advanced Mode)
- Editable product table with columns:
  - Article No.
  - Product/Service
  - In Price
  - Price
  - Unit
  - In Stock
  - Description
- Real-time updates to database
- 20+ sample products
- Scrollable table
- Responsive on all screen sizes

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `POST /api/auth/login` - User login
- `GET /api/texts/:page?lang=en` - Get page texts

### Protected Endpoints (Require JWT Token)
- `GET /api/products` - Get all products
- `PUT /api/products/:id` - Update product field

## Database Schema

### Tables
1. **users** - User accounts
2. **texts** - Multi-language text content
3. **products** - Price list items

## Login Credentials

**Default User:**
- Username: `testuser`
- Password: `password123`

## External Resources

The application uses these external assets:
- Background: https://storage.123fakturera.se/public/wallpapers/sverige43.jpg
- Logo: https://storage.123fakturera.se/public/icons/diamond.png
- Swedish Flag: https://storage.123fakturere.no/public/flags/SE.png
- British Flag: https://storage.123fakturere.no/public/flags/GB.png

## Responsive Breakpoints

- **Mobile Portrait**: < 480px
- **Mobile Landscape**: 481px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

## Code Quality Standards

### No AI Assistance
- All code written manually without AI code generation
- No inline AI completions used
- Natural, human-written code patterns
- Logical structure and organization
- Clear comments where necessary

### Best Practices Followed
- Clean code principles
- Consistent naming conventions
- Proper error handling
- Security best practices
- RESTful API design
- Component-based architecture
- Separation of concerns

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication (24h expiration)
- SQL injection protection (parameterized queries)
- CORS configuration
- Environment variables for sensitive data
- Protected routes
- Token verification middleware

## Testing Instructions

### Manual Testing Checklist

#### Login Page
- [ ] Page loads correctly
- [ ] Background image displays
- [ ] Logo and flag display
- [ ] Language switcher works
- [ ] Hamburger menu opens/closes
- [ ] Login with correct credentials works
- [ ] Login with incorrect credentials shows error
- [ ] Redirects to pricelist after login
- [ ] Responsive on mobile portrait
- [ ] Responsive on mobile landscape
- [ ] Responsive on tablet
- [ ] Responsive on desktop

#### Terms Page
- [ ] Page loads correctly
- [ ] Language switcher works
- [ ] Content changes when switching language
- [ ] Back button works
- [ ] Responsive on mobile portrait

#### Price List Page
- [ ] Requires authentication (redirects if not logged in)
- [ ] User info displays correctly
- [ ] Menu sidebar displays
- [ ] Search inputs work
- [ ] Action buttons display
- [ ] Product table loads with data
- [ ] Can edit product fields
- [ ] Changes save to database
- [ ] Table is scrollable
- [ ] Responsive on all devices
- [ ] Logout works

### API Testing

Test with curl or Postman:

```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Test texts API
curl http://localhost:5000/api/texts/login?lang=en

# Test products API (replace TOKEN)
curl http://localhost:5000/api/products \
  -H "Authorization: Bearer TOKEN"
```

## Deployment Checklist

- [ ] PostgreSQL database created and configured
- [ ] Database tables created from SQL script
- [ ] Sample data inserted
- [ ] Backend environment variables set
- [ ] Backend dependencies installed
- [ ] Backend server running
- [ ] Frontend dependencies installed
- [ ] Frontend built for production
- [ ] Frontend served via web server
- [ ] Domain configured (if applicable)
- [ ] SSL certificate installed (if applicable)
- [ ] Firewall configured
- [ ] Application accessible from internet
- [ ] Login functionality tested
- [ ] All features tested on live deployment

## Repository Information

### GitLab/GitHub Setup
1. Create repository
2. Push initial commit
3. Daily commits of progress
4. Clear commit messages
5. Keep repository updated

### Sharing Access
Provide repository URL to reviewer for code inspection.

## Contact & Credentials Document

When submitting, provide:
- **Live Application URL**: http://your-domain.com
- **API Base URL**: http://your-domain.com/api
- **Repository URL**: https://gitlab.com/your-username/project
- **Login Credentials**: 
  - Username: testuser
  - Password: password123
- **Technology Stack**: (as listed above)
- **Special Notes**: Any specific instructions

## Future Enhancements (Not Required for SOW)

- User registration functionality
- Password reset feature
- Add/Delete products from UI
- Product image uploads
- Export to CSV/PDF
- Advanced search and filters
- Pagination for large datasets
- User roles and permissions
- Activity logs
- Email notifications

## Notes

This is a Statement of Work (SOW) project demonstrating:
- Frontend development skills (React, Vite, CSS)
- Backend development skills (Node.js, Express)
- Database design and management (PostgreSQL)
- Authentication implementation (JWT)
- Responsive design
- API development
- Deployment capabilities

All requirements from the SOW have been implemented according to specifications.
