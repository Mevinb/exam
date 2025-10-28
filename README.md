# Book Inventory Management System

A full-stack web application for managing book inventory with CRUD operations, search functionality, and a modern Material UI interface.

## 🚀 Features

### Core Features
- **Add Books**: Create new book entries with title, author, genre, price, stock, and published year
- **View Books**: Display all books in a clean table format with sorting and filtering
- **Edit Books**: Update book details through a modal interface
- **Delete Books**: Remove books with confirmation dialog
- **Real-time Updates**: UI updates automatically after each operation

### Bonus Features
- **Search & Filter**: Search by title, author, or genre; filter by genre and author
- **Statistics Dashboard**: Display total books, out-of-stock count, and inventory value
- **Dark Mode Toggle**: Switch between light and dark themes
- **Toast Notifications**: Success/error messages for all operations
- **Stock Status Indicators**: Visual indicators for stock levels (in stock, low stock, out of stock)
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React.js** - UI library
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

## 📁 Project Structure

```
book-inventory-system/
├── backend/
│   ├── models/
│   │   └── Book.js
│   ├── routes/
│   │   └── books.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddBookForm.js
│   │   │   ├── BookList.js
│   │   │   ├── EditBookModal.js
│   │   │   ├── DeleteConfirmation.js
│   │   │   └── SearchFilter.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd book-inventory-system
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb+srv://mevin224789_db_user:Eyl3nhzz4WsNuxnO@cluster0.vmtklfs.mongodb.net/book-inventory
   PORT=5000
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **MongoDB Atlas Setup**
   - ✅ Already configured with your MongoDB Atlas cluster
   - Database: `book-inventory` 
   - No need to start local MongoDB

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   # or
   npm start
   ```
   Server will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## 📋 API Endpoints

### Books API (`/api/books`)

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/api/books` | Get all books | `search`, `genre`, `author`, `sortBy`, `sortOrder` |
| GET | `/api/books/:id` | Get book by ID | - |
| POST | `/api/books` | Create new book | Book object in request body |
| PUT | `/api/books/:id` | Update book | Book object in request body |
| DELETE | `/api/books/:id` | Delete book | - |

### Book Schema
```javascript
{
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  publishedYear: { type: Number },
  createdAt: { type: Date, default: Date.now }
}
```

## 💡 Usage Examples

### Adding a Book
1. Fill in the "Add New Book" form on the left side
2. All fields except stock and published year are required
3. Click "Add Book" to save

### Searching and Filtering
1. Use the search bar to find books by title, author, or genre
2. Filter by specific genre using the dropdown
3. Filter by author using the author field
4. Sort results by various criteria (title, author, price, etc.)

### Editing a Book
1. Click the edit icon (pencil) in the actions column
2. Modify the details in the modal dialog
3. Click "Save Changes" to update

### Deleting a Book
1. Click the delete icon (trash) in the actions column
2. Confirm deletion in the popup dialog
3. The book will be permanently removed

## 🎨 UI Features

- **Responsive Design**: Adapts to different screen sizes
- **Dark Mode**: Toggle between light and dark themes
- **Material Design**: Clean, modern interface
- **Visual Indicators**: Stock status chips and warning icons
- **Statistics Cards**: Overview of inventory metrics
- **Toast Notifications**: Immediate feedback for all actions

## 🔧 Customization

### Adding New Genres
Edit the `genres` array in:
- `frontend/src/components/AddBookForm.js`
- `frontend/src/components/EditBookModal.js`

### Modifying API Base URL
Update `API_BASE_URL` in `frontend/src/services/api.js`

### Styling
The app uses Material-UI theming. Modify the theme in `frontend/src/App.js` or `frontend/src/index.js`

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/etc.)
1. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: Will be set automatically by the platform

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder
3. Update API base URL to your deployed backend URL

## 🐛 Troubleshooting

### Common Issues

1. **Connection to MongoDB failed**
   - Ensure MongoDB is running locally or connection string is correct
   - Check firewall settings for MongoDB Atlas

2. **CORS errors**
   - Verify backend CORS configuration
   - Check if frontend URL is correct

3. **Frontend not connecting to backend**
   - Ensure backend is running on correct port
   - Verify API_BASE_URL in frontend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Student** - Initial work

---

Made with ❤️ for efficient book inventory management!