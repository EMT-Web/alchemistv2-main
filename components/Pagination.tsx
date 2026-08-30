import React from 'react'

function Pagination({ items, pageSize, currentPage, onPageChange }:any)  {
    const pagesCount = Math.ceil(items / pageSize); // 100/10
   
    if (pagesCount === 1) return null;
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

   
    return (
      <div className='container'>
        <div className="row mt-5">
  <div className="col text-center">
    <div className="block-27">
   
      <ul>
      {pages.map((page) => (
        <li  key={page}  className={`mr-2 
            ${page === currentPage ? 'active' : ''}
          `}><a href="#toursection" onClick={() => onPageChange(page)}>{page}</a></li>
      ))}
    </ul>
</div>
</div>
</div>
      </div>
    );
   };
   
export default Pagination