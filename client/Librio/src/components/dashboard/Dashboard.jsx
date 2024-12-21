import { useState } from 'react';
import { useLibrary } from '../LibraryContext';


import { format } from 'date-fns';
import { toast } from 'react-toastify';

import "./dashboard.css"

function Dashboard() {
    const { students, books, rentals, addUpdate } = useLibrary();
    const [newUpdate, setNewUpdate] = useState({ title: '', content: '' });

    const activeStudents = students.length;
    const availableBooks = books.filter(book => !book.isIssued).length;
    const activeRentals = rentals.filter(rental => !rental.returned).length;

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!newUpdate.title || !newUpdate.content) {
            toast.error('Please fill in all fields');
            return;
        }
        addUpdate(newUpdate);
        setNewUpdate({ title: '', content: '' });
        toast.success('Update posted successfully');
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Active Students</h3>
                    <p>{activeStudents}</p>
                </div>
                <div className="stat-card">
                    <h3>Available Books</h3>
                    <p>{availableBooks}</p>
                </div>
                <div className="stat-card">
                    <h3>Active Rentals</h3>
                    <p>{activeRentals}</p>
                </div>
            </div>

            <section className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                    {rentals.slice(0, 5).map(rental => {
                        const student = students.find(s => s.id === rental.studentId);
                        const book = books.find(b => b.id === rental.bookId);
                        return (
                            <div key={rental.id} className="activity-item">
                                <p>
                                    {student?.name} {rental.returned ? 'returned' : 'borrowed'} "{book?.title}"
                                    <br />
                                    <small>{format(new Date(rental.issueDate), 'PPP')}</small>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="post-update">
                <h2>Post New Update</h2>
                <form onSubmit={handleUpdateSubmit}>
                    <input
                        type="text"
                        placeholder="Update Title"
                        value={newUpdate.title}
                        onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Update Content"
                        value={newUpdate.content}
                        onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                    />
                    <button type="submit">Post Update</button>
                </form>
            </section>
        </div>
    );
}

export default Dashboard;