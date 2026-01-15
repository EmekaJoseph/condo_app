import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark text-center text-light text-lg-start">
            <div className="container text-light p-lg-5 pt-5">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">condonote.</h5>

                        <div>
                            Share cherished memories and create a heartfelt tribute to honor the life of your loved ones who have passed.
                            <div className="fst-italic">
                                Build a beautiful, lasting memorial page—completely free of charge.
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Built with love ❤️</h5>

                        <div>
                            Crafted with compassion and love for humanity, this online condolence register is a labor of
                            love aimed at offering comfort and connection in times of loss. Your support, in any form, is
                            deeply appreciated. Your feedback and input mean the world to us and can help make this platform
                            even more meaningful for those who use it.
                            <br />

                            <a className="text-success text-decoration-none mt-5" href="https://wa.me/08139590011">
                                <i className="bi bi-whatsapp"></i> Send a message
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.119)' }}>
                <i className="bi bi-c-circle"></i> {new Date().getFullYear()} Copyright:
                <Link className="text-warning text-decoration-none fs-5" to="/">condonote</Link>
            </div>
        </footer>
    );
};

export default Footer;
