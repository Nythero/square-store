const React = require('react')
const ReactDOM = require('react-dom/client')
const { BrowserRouter, Routes, Route } = require('react-router-dom')
const routes = require('./routes/routes.jsx')
const NotFound = require('./views/NotFound.jsx')

const props = window.PROPS

if(true) {
  ReactDOM.createRoot(document).render(
    <BrowserRouter>
      <Routes>
        {routes.map(r => <Route 
  	key={r.path}
  	element={React.createElement(r.component, props)}
  	path={r.path}/>)}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
