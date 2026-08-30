import React from 'react'

function FilterForm() {
  return (
    <section className="ftco-section ftco-no-pb">
   <div className="container">
      <div className="row">
       <div className="col-md-12">
          <div className="search-wrap-1 ftco-animate">
             <form action="#" className="search-property-1">
                <div className="row no-gutters">
                   <div className="col-lg d-flex">
                      <div className="form-group p-4 border-0">
                         <label htmlFor="#">Destination</label>
                         <div className="form-field">
                         <select id="test" multiple>
  <option value="1">American Black Bear</option>
  <option value="2">Asiatic Black Bear</option>
  <option value="3">Brown Bear</option>
  <option value="4">Giant Panda</option>
  <option value="5">Sloth Bear</option>
  <option value="6">Sun Bear</option>
  <option value="7">Polar Bear</option>
  <option value="8">Spectacled Bear</option>
</select>
                       </div>
                   </div>
               </div>
               <div className="col-lg d-flex">
                  <div className="form-group p-4">
                     <label htmlFor="#">Check-in date</label>
                     <div className="form-field">
                       <div className="icon"><span className="fa fa-calendar"></span></div>
                       <input type="text" className="form-control checkin_date" placeholder="Check In Date" />
                   </div>
               </div>
           </div>
           <div className="col-lg d-flex">
              <div className="form-group p-4">
                 <label htmlFor="#">Check-out date</label>
                 <div className="form-field">
                   <div className="icon"><span className="fa fa-calendar"></span></div>
                   <input type="text" className="form-control checkout_date" placeholder="Check Out Date" />
               </div>
           </div>
       </div>
       <div className="col-lg d-flex">
                      <div className="form-group p-4 border-0">
                         <label htmlFor="#">Destination</label>
                         <select id="my-select" multiple>
    <option value="1">January</option>
    <option value="2">February</option>
    <option value="3">March</option>
    <option value="4">April</option>
    <option value="5">May</option>
    <option value="6">June</option>
    <option value="7">July</option>
    <option value="8">August</option>
    <option value="9">September</option>
    <option value="10">October</option>
    <option value="11">November</option>
    <option value="12">December</option>
</select>
                   </div>
               </div>
<div className="col-lg d-flex">
  <div className="form-group d-flex w-100 border-0">
     <div className="form-field w-100 align-items-center d-flex">
        <input type="submit" value="Search" className="align-self-stretch form-control btn btn-primary" />
    </div>
</div>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</section>
  )
}

export default FilterForm