import { useState } from 'react';
import { useLibrary } from '../LibraryContext';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import "./home.css"

function Home() {
    const { updates } = useLibrary();
    const [contactInfo] = useState({
        email: 'adityamehto19@gmail.com',
        phone: '+91 0123456789',
        address: '123 Library India'
    });

    return (
        <div className="home">
            <section className="hero">
                <h1>Welcome to Our Library</h1>
                <p>Your gateway to knowledge and discovery</p>
            </section>

            <section className="highlights">
                <h2>Important Updates</h2>
                <div className="updates-list">
                    {updates.map(update => (
                        <div key={update.id} className="update-card">
                            <h3>{update.title}</h3>
                            <p>{update.content}</p>
                            <small>{new Date(update.date).toLocaleDateString()}</small>
                        </div>
                    ))}
                </div>
            </section>

            <section className="contact">
                <h2>Contact Information</h2>
                <div className="contact-info">
                    <p><FaEnvelope /> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                    <p><FaPhone /> {contactInfo.phone}</p>
                    <p><FaMapMarkerAlt /> {contactInfo.address}</p>
                </div>
            </section>
        </div>
    );
}

export default Home;