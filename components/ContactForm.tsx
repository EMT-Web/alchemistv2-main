import React from 'react'

function ContactForm() {
  return (
    <div className="col-md-6 order-md-last d-flex">
        <form action="#" className="bg-light p-5 contact-form">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Your name" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Your email" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Subject" />
          </div>
          <div className="form-group">
            <textarea name="" id="" cols={30} rows={7} className="form-control" placeholder="Message"></textarea>
          </div>
          <div className="form-group">
            <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5" />
          </div>
        </form>
    </div>
  )
}

export default ContactForm