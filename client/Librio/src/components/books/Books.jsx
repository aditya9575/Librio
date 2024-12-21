import { useState } from 'react';
import { useLibrary } from '../LibraryContext';

import { toast } from 'react-toastify';
import "./books.css"

function Books() {
    const { books, addBook, updateBook, deleteBook } = useLibrary();
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingBook) {
            updateBook(editingBook.id, formData);
            toast.success('Book updated successfully');
        } else {
            addBook(formData);
            toast.success('Book added successfully');
        }
        setFormData({ title: '', author: '', isbn: '', category: '' });
        setShowForm(false);
        setEditingBook(null);
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            category: book.category,
        });
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            deleteBook(id);
            toast.success('Book deleted successfully');
        }
    };

    return (
        <div className="books">
            <div className="header">
                <h1>Books Management</h1>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Book'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="book-form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="ISBN"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                    />
                    <button type="submit">{editingBook ? 'Update' : 'Add'} Book</button>
                </form>
            )}

            <div className="books-list">
                {books.map(book => (
                    <div key={book.id} className="book-card">
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Category: {book.category}</p>
                        <p>Status: {book.isIssued ? 'Issued' : 'Available'}</p>
                        <div className="actions">
                            <button onClick={() => handleEdit(book)} disabled={book.isIssued}>Edit</button>
                            <button onClick={() => handleDelete(book.id)} disabled={book.isIssued}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;