import { useState } from 'react';
import { useLibrary } from '../LibraryContext';

import { format, addDays } from 'date-fns';
import { toast } from 'react-toastify';

import "./rentals.css"

function Rentals() {
    const { students, books, rentals, issueBook, returnBook } = useLibrary();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        studentId: '',
        bookId: '',
        issueDate: format(new Date(), 'yyyy-MM-dd'),
        dueDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
    });

    const availableBooks = books.filter(book => !book.isIssued);
    const activeRentals = rentals.filter(rental => !rental.returned);

    const handleSubmit = (e) => {
        e.preventDefault();
        issueBook(formData);
        setFormData({
            studentId: '',
            bookId: '',
            issueDate: format(new Date(), 'yyyy-MM-dd'),
            dueDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
        });
        setShowForm(false);
        toast.success('Book issued successfully');
    };

    const handleReturn = (rentalId) => {
        if (window.confirm('Confirm book return?')) {
            returnBook(rentalId);
            toast.success('Book returned successfully');
        }
    };

    return (
        <div className="rentals">
            <div className="header">
                <h1>Rentals Management</h1>
                <button onClick={() => setShowForm(!showForm)} disabled={availableBooks.length === 0}>
                    {showForm ? 'Cancel' : 'Issue New Book'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="rental-form">
                    <select
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        required
                    >
                        <option value="">Select Student</option>
                        {students.map(student => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                        ))}
                    </select>

                    <select
                        value={formData.bookId}
                        onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                        required
                    >
                        <option value="">Select Book</option>
                        {availableBooks.map(book => (
                            <option key={book.id} value={book.id}>{book.title}</option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                        required
                    />

                    <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        required
                    />

                    <button type="submit">Issue Book</button>
                </form>
            )}

            <div className="active-rentals">
                <h2>Active Rentals</h2>
                {activeRentals.map(rental => {
                    const student = students.find(s => s.id === rental.studentId);
                    const book = books.find(b => b.id === rental.bookId);
                    return (
                        <div key={rental.id} className="rental-card">
                            <h3>{book?.title}</h3>
                            <p>Student: {student?.name}</p>
                            <p>Issued: {format(new Date(rental.issueDate), 'PP')}</p>
                            <p>Due: {format(new Date(rental.dueDate), 'PP')}</p>
                            <button onClick={() => handleReturn(rental.id)}>Return Book</button>
                        </div>
                    );
                })}
            </div>

            <div className="rental-history">
                <h2>Rental History</h2>
                {rentals.filter(rental => rental.returned).map(rental => {
                    const student = students.find(s => s.id === rental.studentId);
                    const book = books.find(b => b.id === rental.bookId);
                    return (
                        <div key={rental.id} className="rental-card history">
                            <h3>{book?.title}</h3>
                            <p>Student: {student?.name}</p>
                            <p>Issued: {format(new Date(rental.issueDate), 'PP')}</p>
                            <p>Returned: ✓</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Rentals;