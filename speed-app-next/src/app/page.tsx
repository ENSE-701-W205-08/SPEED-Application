import React from 'react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to SPEED App</h1>
          <p className="lead">A web application for evidence-based software practices</p>
          <a href="/articles/submit" className="btn btn-primary btn-lg mt-4">Get Started</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Feature 1</h5>
                  <p className="card-text">Learn about the latest advancements in software practices.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Feature 2</h5>
                  <p className="card-text">Submit your own practices for peer review and feedback.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Feature 3</h5>
                  <p className="card-text">Access a database of verified software engineering methods.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">What our users say</h2>
          <div className="row">
            <div className="col-md-4">
              <blockquote className="blockquote text-center">
                <p className="mb-0">"This app has streamlined our development processes like never before!"</p>
                <br></br>
                <footer className="blockquote-footer">John Doe, Software Engineer</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="blockquote text-center">
                <p className="mb-0">"A must-have tool for every software development team."</p>
                <br></br>
                <footer className="blockquote-footer">Jane Smith, Project Manager</footer>
              </blockquote>
            </div>
            <div className="col-md-4">
              <blockquote className="blockquote text-center">
                <p className="mb-0">"The features and peer review system are outstanding."</p>
                <br></br>
                <footer className="blockquote-footer">Mark Johnson, DevOps Engineer</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
