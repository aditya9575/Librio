import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import "./footer.css"

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Footer Section: Library Details */}
                <div className="footer-section">
                    <h3>Library Management System ~ By Fab Solutions</h3>
                    <p>Empowering knowledge through efficient library management</p>
                </div>

                {/* Footer Section: Social Links */}
                <div className="footer-section">
                    <h3>Connect With Us</h3>
                    <div className="social-links">
                        <a href="https://github.com/aditya9575" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/aditya-m-0bb92b110/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="https://x.com/AdityaMehto3" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Library Management System. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
