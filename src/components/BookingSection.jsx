import Reveal from './Reveal';

export default function BookingSection() {
  return (
    <section className="book-section" id="book">
      <div className="wrap">
        <Reveal className="services-head">
          <span className="eyebrow-script">Reserve Your Session</span>
          <h2 className="section-title">Book Your Massage</h2>
        </Reveal>

        <Reveal className="book-grid" style={{ display: 'grid' }}>
          <div className="book-photo">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=900&fit=crop" alt="Relaxing massage session" />
          </div>
          <div className="book-form-side">
            <span className="eyebrow-script">Get In Touch</span>
            <h3 className="section-title">Request A Booking</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-field">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your name" required />
                </div>
                <div className="form-field">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="080..." required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Treatment</label>
                  <select defaultValue="">
                    <option value="" disabled>Select a treatment</option>
                    <option>Swedish Massage</option>
                    <option>Deep Tissue</option>
                    <option>Hot Stone Therapy</option>
                    <option>Aromatherapy</option>
                    <option>Sports Recovery</option>
                    <option>Prenatal Massage</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Preferred Date</label>
                  <input type="date" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field full">
                  <label>Location</label>
                  <input type="text" placeholder="Home, hotel or office address" />
                </div>
              </div>
              <button type="submit" className="btn btn-red">Request Booking</button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
