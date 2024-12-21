import { useState } from 'react';
import { useLibrary } from '../LibraryContext';

import { format, addMonths } from 'date-fns';
import { toast } from 'react-toastify';

import "./students.css"

function Students() {
    const { students, addStudent, updateStudent, deleteStudent, rentals } = useLibrary();
    const [showForm, setShowForm] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        enrollmentDate: format(new Date(), 'yyyy-MM-dd'),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const renewalDate = addMonths(new Date(formData.enrollmentDate), 1);

        if (editingStudent) {
            updateStudent(editingStudent.id, { ...formData, renewalDate });
            toast.success('Student updated successfully');
        } else {
            addStudent({ ...formData, renewalDate });
            toast.success('Student added successfully');
        }

        setFormData({
            name: '',
            email: '',
            phone: '',
            enrollmentDate: format(new Date(), 'yyyy-MM-dd'),
        });
        setShowForm(false);
        setEditingStudent(null);
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setFormData({
            name: student.name,
            email: student.email,
            phone: student.phone,
            enrollmentDate: format(new Date(student.enrollmentDate), 'yyyy-MM-dd'),
        });
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            deleteStudent(id);
            toast.success('Student deleted successfully');
        }
    };

    const getStudentRentals = (studentId) => {
        return rentals.filter(rental => rental.studentId === studentId);
    };

    return (
        <div className="students">
            <div className="header">
                <h1>Students Management</h1>
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Student'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="student-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        value={formData.enrollmentDate}
                        onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                        required
                    />
                    <button type="submit">{editingStudent ? 'Update' : 'Add'} Student</button>
                </form>
            )}

            <div className="students-list">
                {students.map(student => (
                    <div key={student.id} className="student-card">
                        <h3>{student.name}</h3>
                        <p>Email: {student.email}</p>
                        <p>Phone: {student.phone}</p>
                        <p>Enrolled: {format(new Date(student.enrollmentDate), 'PP')}</p>
                        <p>Renewal: {format(new Date(student.renewalDate), 'PP')}</p>

                        <div className="rentals-history">
                            <h4>Rental History</h4>
                            {getStudentRentals(student.id).map(rental => (
                                <p key={rental.id}>
                                    {rental.returned ? '✓' : '•'} {format(new Date(rental.issueDate), 'PP')}
                                </p>
                            ))}
                        </div>

                        <div className="actions">
                            <button onClick={() => handleEdit(student)}>Edit</button>
                            <button onClick={() => handleDelete(student.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Students;