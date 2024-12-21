import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LibraryContext = createContext();

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [];
  });

  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('books');
    return saved ? JSON.parse(saved) : [];
  });

  const [rentals, setRentals] = useState(() => {
    const saved = localStorage.getItem('rentals');
    return saved ? JSON.parse(saved) : [];
  });

  const [updates, setUpdates] = useState(() => {
    const saved = localStorage.getItem('updates');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('rentals', JSON.stringify(rentals));
    localStorage.setItem('updates', JSON.stringify(updates));
  }, [students, books, rentals, updates]);

  const addStudent = (student) => {
    const newStudent = {
      id: uuidv4(),
      ...student,
      enrollmentDate: new Date(student.enrollmentDate).toISOString(),
      renewalDate: new Date(student.renewalDate).toISOString(),
    };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, ...updatedStudent } : student
    ));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const addBook = (book) => {
    const newBook = {
      id: uuidv4(),
      ...book,
      isIssued: false,
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, ...updatedBook } : book
    ));
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const issueBook = (rental) => {
    const newRental = {
      id: uuidv4(),
      ...rental,
      issueDate: new Date(rental.issueDate).toISOString(),
      dueDate: new Date(rental.dueDate).toISOString(),
      returned: false,
    };
    setRentals([...rentals, newRental]);
    updateBook(rental.bookId, { isIssued: true });
  };

  const returnBook = (rentalId) => {
    const rental = rentals.find(r => r.id === rentalId);
    if (rental) {
      setRentals(rentals.map(r =>
        r.id === rentalId ? { ...r, returned: true } : r
      ));
      updateBook(rental.bookId, { isIssued: false });
    }
  };

  const addUpdate = (update) => {
    const newUpdate = {
      id: uuidv4(),
      ...update,
      date: new Date().toISOString(),
    };
    setUpdates([...updates, newUpdate]);
  };


  return (
    <LibraryContext.Provider value={{
      students,
      books,
      rentals,
      updates,
      addStudent,
      updateStudent,
      deleteStudent,
      addBook,
      updateBook,
      deleteBook,
      issueBook,
      returnBook,
      addUpdate,
    }}>
      {children}
    </LibraryContext.Provider>
  );
};