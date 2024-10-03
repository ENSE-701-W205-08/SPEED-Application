import React from 'react';

export default function Footer() {
  return (
    <div>
        <hr/>
        <footer className="footer py-4">
        <div className="container">
            <div className="row">
            <div className="col-md-6">
                <p>&copy; {new Date().getFullYear()} SPEED App. All rights reserved.</p>
            </div>
            </div>
        </div>
        </footer>
    </div>
  );
}