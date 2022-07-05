const React = require('react')
const Links = require('./Links.jsx')
const Contact = require('./Contact.jsx')

const Footer = () => {
  return (
    <footer className='row pb-5 text-center'>
      <Links />
      <Contact />
    </footer>
  )
}

module.exports = Footer
