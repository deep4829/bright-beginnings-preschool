'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function HomePage() {
  useEffect(() => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
      const clickHandler = () => {
        navLinks.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        if (spans.length === 3) {
          const isActive = navLinks.classList.contains('active');
          (spans[0] as HTMLElement).style.transform = isActive ? 'rotate(45deg) translate(5px, 5px)' : 'none';
          (spans[1] as HTMLElement).style.opacity = isActive ? '0' : '1';
          (spans[2] as HTMLElement).style.transform = isActive ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
        }
      };
      menuToggle.addEventListener('click', clickHandler);

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          const spans = menuToggle.querySelectorAll('span');
          if (spans.length === 3) {
            (spans[0] as HTMLElement).style.transform = 'none';
            (spans[1] as HTMLElement).style.opacity = '1';
            (spans[2] as HTMLElement).style.transform = 'none';
          }
        });
      });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const onScrollNav = () => {
      if (!navbar) return;
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScrollNav);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (!href) return;
        const target = document.querySelector(href) as HTMLElement | null;
        if (target) {
          const offsetTop = target.offsetTop - 70;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      });
    });

    // Form validation
    const applicationForm = document.getElementById('applicationForm') as HTMLFormElement | null;
    const successMessage = document.getElementById('successMessage');

    const onSubmit = async (e: Event) => {
      e.preventDefault();
      if (!applicationForm || !successMessage) return;

      const formData = new FormData(applicationForm);
      let isValid = true;
      const requiredFields = ['childName', 'child Age', 'dateOfBirth', 'program', 'schedule', 'startDate', 'parentName', 'email', 'phone', 'address'];

      requiredFields.forEach(field => {
        const input = document.getElementById(field) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
        if (!input) return;
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#f5576c';
        } else {
          input.style.borderColor = '#e2e8f0';
        }
      });

      const email = document.getElementById('email') as HTMLInputElement | null;
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          isValid = false;
          email.style.borderColor = '#f5576c';
        }
      }

      const phone = document.getElementById('phone') as HTMLInputElement | null;
      if (phone) {
        const phoneRegex = /^[\d\s\-+()]{10,}$/;
        if (!phoneRegex.test(phone.value)) {
          isValid = false;
          phone.style.borderColor = '#f5576c';
        }
      }

      const childAge = document.getElementById('childAge') as HTMLInputElement | null;
      if (childAge) {
        const age = parseInt(childAge.value, 10);
        if (age < 2 || age > 5) {
          isValid = false;
          childAge.style.borderColor = '#f5576c';
          alert('Child age must be between 2 and 5 years for our programs.');
          return;
        }
      }

      if (!isValid) {
        alert('Please fill in all required fields correctly.');
        return;
      }

      // Prepare data for API
      const applicationData = {
        childName: (document.getElementById('childName') as HTMLInputElement).value,
        childAge: (document.getElementById('childAge') as HTMLInputElement).value,
        dateOfBirth: (document.getElementById('dateOfBirth') as HTMLInputElement).value,
        program: (document.getElementById('program') as HTMLSelectElement).value,
        schedule: (document.getElementById('schedule') as HTMLSelectElement).value,
        startDate: (document.getElementById('startDate') as HTMLInputElement).value,
        parentName: (document.getElementById('parentName') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        phone: (document.getElementById('phone') as HTMLInputElement).value,
        address: (document.getElementById('address') as HTMLInputElement).value,
        additionalInfo: (document.getElementById('additionalInfo') as HTMLTextAreaElement).value
      };

      try {
        // Show loading state (optional)
        const submitButton = applicationForm.querySelector('button[type="submit"]') as HTMLButtonElement;
        const originalText = submitButton?.textContent;
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Submitting...';
        }

        // Call API route
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(applicationData),
        });

        const result = await response.json();

        if (response.ok) {
          // Success
          successMessage.textContent = '✓ Application submitted successfully! We\'ll contact you within 24 hours.';
          successMessage.classList.add('show');
          applicationForm.reset();
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => successMessage.classList.remove('show'), 5000);
        } else {
          // Error from API
          alert(result.error || 'Failed to submit application. Please try again.');
        }

        // Restore button state
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText || 'Submit Application';
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('Network error. Please check your connection and try again.');

        // Restore button state
        const submitButton = applicationForm.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Submit Application';
        }
      }
    };

    if (applicationForm) {
      applicationForm.addEventListener('submit', onSubmit);
    }

    // Intersection observer
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => observer.observe(section));
    document.querySelectorAll('.feature-item, .program-card, .fee-card, .gallery-item, .contact-card').forEach(item => observer.observe(item));

    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScrollNav);
      if (applicationForm) applicationForm.removeEventListener('submit', onSubmit);
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="#" className="logo">🌟 Bright Beginnings</a>
          <ul className="nav-links" id="navLinks">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#fees">Fee Structure</a></li>
            <li><a href="#apply">Apply Now</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="menu-toggle" id="menuToggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Where Learning Begins with Joy</h1>
              <p className="hero-subtitle">
                Welcome to Bright Beginnings Preschool, where every child&apos;s potential
                blooms through nurturing care, engaging activities, and a love for learning
                that lasts a lifetime.
              </p>
              <div className="hero-buttons">
                <a href="#apply" className="btn btn-primary">Enroll Your Child</a>
                <a href="#programs" className="btn btn-outline">Explore Programs</a>
              </div>
            </div>
            <div className="hero-image">
              <Image src="/images/hero-classroom.png" alt="Bright and welcoming preschool classroom" width={600} height={500} priority />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">About Us</p>
            <h2>Nurturing Young Minds Since 2010</h2>
          </div>
          <div className="about-content">
            <div className="about-image">
              <Image src="/images/art-activities.png" alt="Children engaged in creative activities" width={550} height={400} />
            </div>
            <div className="about-text">
              <h3>Our Mission</h3>
              <p>
                At Bright Beginnings, we believe that every child deserves a strong foundation
                for lifelong learning. Our play-based curriculum combines academic readiness
                with social-emotional development, creating confident, curious, and compassionate
                learners.
              </p>
              <p>
                We provide a safe, stimulating environment where children explore, discover,
                and develop essential skills through hands-on experiences, creative expression,
                and meaningful interactions.
              </p>

              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">🎨</div>
                  <div className="feature-content">
                    <h4>Creative Learning</h4>
                    <p>Art, music, and imaginative play foster creativity and self-expression</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">👥</div>
                  <div className="feature-content">
                    <h4>Small Class Sizes</h4>
                    <p>Low student-teacher ratios ensure personalized attention</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🌱</div>
                  <div className="feature-content">
                    <h4>Holistic Development</h4>
                    <p>Focus on cognitive, physical, social, and emotional growth</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏆</div>
                  <div className="feature-content">
                    <h4>Experienced Teachers</h4>
                    <p>Certified educators passionate about early childhood development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs" id="programs">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Our Programs</p>
            <h2>Age-Appropriate Learning Pathways</h2>
          </div>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-header">
                <h3>Toddler Program</h3>
                <p className="program-age">Ages 2-3 Years</p>
              </div>
              <div className="program-content">
                <p>A gentle introduction to structured learning through exploration and play.</p>
                <ul>
                  <li>Sensory exploration activities</li>
                  <li>Early language development</li>
                  <li>Social interaction skills</li>
                  <li>Motor skills development</li>
                  <li>Music and movement</li>
                  <li>Story time and circle time</li>
                </ul>
              </div>
            </div>

            <div className="program-card">
              <div className="program-header">
                <h3>Preschool Program</h3>
                <p className="program-age">Ages 3-4 Years</p>
              </div>
              <div className="program-content">
                <p>Building confidence and independence through hands-on learning experiences.</p>
                <ul>
                  <li>Pre-reading and pre-writing skills</li>
                  <li>Number and shape recognition</li>
                  <li>Creative arts and crafts</li>
                  <li>Science experiments</li>
                  <li>Dramatic play</li>
                  <li>Outdoor exploration</li>
                </ul>
              </div>
            </div>

            <div className="program-card">
              <div className="program-header">
                <h3>Pre-Kindergarten</h3>
                <p className="program-age">Ages 4-5 Years</p>
              </div>
              <div className="program-content">
                <p>Comprehensive kindergarten preparation with advanced learning opportunities.</p>
                <ul>
                  <li>Letter and sound recognition</li>
                  <li>Early math concepts</li>
                  <li>Problem-solving skills</li>
                  <li>Writing practice</li>
                  <li>STEM activities</li>
                  <li>Social studies concepts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Our Facilities</p>
            <h2>A Glimpse Into Our World</h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <Image src="/images/hero-classroom.png" alt="Modern classroom" width={400} height={300} />
              <div className="gallery-overlay">
                <h4>Bright Learning Spaces</h4>
              </div>
            </div>
            <div className="gallery-item">
              <Image src="/images/art-activities.png" alt="Art activities" width={400} height={300} />
              <div className="gallery-overlay">
                <h4>Creative Art Center</h4>
              </div>
            </div>
            <div className="gallery-item">
              <Image src="/images/outdoor-playground.png" alt="Outdoor playground" width={400} height={300} />
              <div className="gallery-overlay">
                <h4>Safe Outdoor Play Area</h4>
              </div>
            </div>
            <div className="gallery-item">
              <Image src="/images/reading-corner.png" alt="Reading corner" width={400} height={300} />
              <div className="gallery-overlay">
                <h4>Cozy Reading Nook</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section className="fee-structure" id="fees">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Tuition & Fees</p>
            <h2>Transparent & Affordable Pricing</h2>
            <p>Invest in your child&apos;s future with our competitive rates and flexible payment options</p>
          </div>
          <div className="fee-cards">
            <div className="fee-card">
              <h3>Half-Day Program</h3>
              <p className="fee-period">8:00 AM - 12:00 PM</p>
              <div className="fee-price">₹8,500</div>
              <p className="fee-period">per month</p>
              <ul className="fee-features">
                <li>4 hours of daily instruction</li>
                <li>Morning snack included</li>
                <li>Core curriculum activities</li>
                <li>Art and music classes</li>
                <li>Parent-teacher meetings</li>
                <li>Progress reports</li>
              </ul>
              <a href="#apply" className="btn btn-outline">Enroll Now</a>
            </div>

            <div className="fee-card featured">
              <span className="fee-badge">Most Popular</span>
              <h3>Full-Day Program</h3>
              <p className="fee-period">8:00 AM - 3:00 PM</p>
              <div className="fee-price">₹14,500</div>
              <p className="fee-period">per month</p>
              <ul className="fee-features">
                <li>7 hours of daily care & learning</li>
                <li>Nutritious lunch & snacks</li>
                <li>Extended learning activities</li>
                <li>Outdoor play time</li>
                <li>Rest/nap time</li>
                <li>All Half-Day benefits</li>
              </ul>
              <a href="#apply" className="btn btn-primary">Enroll Now</a>
            </div>

            <div className="fee-card">
              <h3>Extended Care</h3>
              <p className="fee-period">8:00 AM - 6:00 PM</p>
              <div className="fee-price">₹18,000</div>
              <p className="fee-period">per month</p>
              <ul className="fee-features">
                <li>10 hours of comprehensive care</li>
                <li>All meals & snacks provided</li>
                <li>Homework assistance (Pre-K)</li>
                <li>Enrichment activities</li>
                <li>Flexible pickup times</li>
                <li>All Full-Day benefits</li>
              </ul>
              <a href="#apply" className="btn btn-outline">Enroll Now</a>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem', background: 'white', padding: '2rem', borderRadius: '1rem' }}>
            <h3>Additional Information</h3>
            <p style={{ maxWidth: '800px', margin: '1rem auto' }}>
              <strong>Registration Fee:</strong> ₹3,000 (one-time, non-refundable)<br />
              <strong>Annual Fee:</strong> ₹5,000 (covers materials, activities, and events)<br />
              <strong>Sibling Discount:</strong> 10% off for second child<br />
              <strong>Payment Options:</strong> Monthly, Quarterly, or Annual (5% discount on annual payment)
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="application" id="apply">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Join Our Family</p>
            <h2>Application Form</h2>
            <p>Fill out the form below and we&apos;ll get back to you within 24 hours</p>
          </div>

          <div className="form-container">
            <div className="success-message" id="successMessage">
              ✓ Application submitted successfully! We&apos;ll contact you soon.
            </div>

            <form id="applicationForm">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="childName">Child&apos;s Full Name *</label>
                  <input type="text" id="childName" name="childName" required />
                </div>

                <div className="form-group">
                  <label htmlFor="childAge">Child&apos;s Age *</label>
                  <input type="number" id="childAge" name="childAge" min="2" max="5" required />
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth *</label>
                  <input type="date" id="dateOfBirth" name="dateOfBirth" required />
                </div>

                <div className="form-group">
                  <label htmlFor="program">Preferred Program *</label>
                  <select id="program" name="program" required>
                    <option value="">Select a program</option>
                    <option value="toddler">Toddler Program (Ages 2-3)</option>
                    <option value="preschool">Preschool Program (Ages 3-4)</option>
                    <option value="prek">Pre-Kindergarten (Ages 4-5)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="schedule">Preferred Schedule *</label>
                  <select id="schedule" name="schedule" required>
                    <option value="">Select a schedule</option>
                    <option value="half">Half-Day (8 AM - 12 PM)</option>
                    <option value="full">Full-Day (8 AM - 3 PM)</option>
                    <option value="extended">Extended Care (8 AM - 6 PM)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="startDate">Preferred Start Date *</label>
                  <input type="date" id="startDate" name="startDate" required />
                </div>

                <div className="form-group">
                  <label htmlFor="parentName">Parent/Guardian Name *</label>
                  <input type="text" id="parentName" name="parentName" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Home Address *</label>
                  <input type="text" id="address" name="address" required />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="additionalInfo">Additional Information or Questions</label>
                  <textarea id="additionalInfo" name="additionalInfo" placeholder="Tell us anything else we should know..."></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-header">
            <p className="section-subtitle">Get In Touch</p>
            <h2>Visit Us Today</h2>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Location</h3>
              <p>
                123 Learning Lane<br />
                Sunshine Valley, SV 12345<br />
                Near Green Park
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Phone</h3>
              <p>
                Main: +91 98765 43210<br />
                Admissions: +91 98765 43211<br />
                Mon-Fri: 8 AM - 6 PM
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Email</h3>
              <p>
                info@brightbeginnings.edu<br />
                admissions@brightbeginnings.edu<br />
                We reply within 24 hours
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">🕐</div>
              <h3>School Hours</h3>
              <p>
                Monday - Friday<br />
                8:00 AM - 6:00 PM<br />
                Closed on weekends
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🌟 Bright Beginnings</h3>
              <p>
                Empowering young minds to explore, discover, and grow.
                Where every child&apos;s potential shines bright.
              </p>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <p><a href="#about">About Us</a></p>
              <p><a href="#programs">Programs</a></p>
              <p><a href="#fees">Fee Structure</a></p>
              <p><a href="#apply">Apply Now</a></p>
            </div>

            <div className="footer-section">
              <h3>Contact Info</h3>
              <p>123 Learning Lane, Sunshine Valley</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: info@brightbeginnings.edu</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Bright Beginnings Preschool. All rights reserved. | Nurturing minds, building futures.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
