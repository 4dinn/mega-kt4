
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(){
  return (
    <div className="notfound">
      <h2>Page not found</h2>
      <p>Oops — the page you requested does not exist.</p>
      <Link to="/products"><button className="btn">Go to products</button></Link>
    </div>
  );
}
