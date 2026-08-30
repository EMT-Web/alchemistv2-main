import React from 'react'
import ReactSelect, { components } from "react-select";

export const tourOptions = [
    { value: "1", label: "City Tour" },
    { value: "1/1", label: "Blue" },
    { value: "2/1", label: "Purple" },
    { value: "3/2", label: "Red" },
    { value: "4/3", label: "Orange" },
    { value: "5/4", label: "Yellow" },
    { value: "6/5", label: "Green" },
    { value: "7/6", label: "Forest" },
    { value: "8/7", label: "Slate" },
    { value: "9/8", label: "Silver" }
  ];

function MainForm({destinations, categories}:any) {

  const destinationOptions = destinations.map((d:any)=>{
    return {'value': d._id, 'label': d.city}
  })
  const categoryOptions = categories.map((c:any)=>{
    return {'value': c._id, 'label': c.title}
  })

  return (
    <section className="ftco-section ftco-no-pb ftco-no-pt">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="ftco-search d-flex justify-content-center">
                    <div className="row">
                        <div className="col-md-12 nav-link-wrap">
                            <div className="nav nav-pills text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a className="nav-link active mr-md-1" id="v-pills-1-tab" data-toggle="pill" href="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected="true">Search Tour</a>
                                {/* <a className="nav-link" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Hotel</a> */}
                            </div>
                        </div>
                        <div className="col-md-12 tab-wrap">
                            
                            <div className="tab-content" id="v-pills-tabContent">

                                <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-nextgen-tab">
                                    <form action="/search" method="get" className="search-property-1">
                                        <div className="row no-gutters">
                                            <div className="col-md d-flex">
                                                <div className="form-group p-4 border-0">
                                                    <label htmlFor="destination">Destination</label>
                                                    <div className="form-field">
                                                        <div className="icon"><span className="fa fa-search"></span></div> 
                                                        {/* <select className="form-control">
                                                        <option value="1">City Tour</option>
                                                        <option value="1/1">1 Day Excursion</option>
                                                        <option value="2/1">2 Days Tour</option>
                                                        </select> */}
                                                      

                                                        <ReactSelect
                                                        options={destinationOptions}
                                                        isMulti={true}
                                                        closeMenuOnSelect={false}
                                                        hideSelectedOptions={false}
                                                        name='destinations'
                                                        />
                                                        {/* <input type="select" name="destination" className="form-control" placeholder={t('search_place')} /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md d-flex">
                                                <div className="form-group p-4 border-0">
                                                    <label htmlFor="categories">Type</label>
                                                    <div className="form-field">
                                                        <div className="icon"><span className="fa fa-search"></span></div> 
                                                        {/* <select className="form-control">
                                                        <option value="1">City Tour</option>
                                                        <option value="1/1">1 Day Excursion</option>
                                                        <option value="2/1">2 Days Tour</option>
                                                        </select> */}
                                                       
                                                        <ReactSelect
                                                        options={categoryOptions}
                                                        isMulti={true}
                                                        closeMenuOnSelect={false}
                                                        hideSelectedOptions={false}
                                                        name='categories'
                                                        />
                                                        {/* <input type="select" name="destination" className="form-control" placeholder={t('search_place')} /> */}
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            {/* <div className="col-md d-flex">
                                                <div className="form-group p-4">
                                                    <label htmlFor="#">{t('check_in_date')}</label>
                                                    <div className="form-field">
                                                        <div className="icon"><span className="fa fa-calendar"></span></div>
                                                        <input type="date" className="form-control checkin_date" placeholder={t('check_in_date')} />
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div className="col-md d-flex">
                                                <div className="form-group p-4">
                                                    <label htmlFor="#">{t('check_out_date')}</label>
                                                    <div className="form-field">
                                                        <div className="icon"><span className="fa fa-calendar"></span></div>
                                                        <input type="date" className="form-control checkout_date" placeholder={t('check_out_date')} />
                                                    </div>
                                                </div>
                                            </div> */}
                                        
                                            <div className="col-md d-flex">
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
                </div>
            </div>
        </div>
        </div>
    </section>
  )
}

export default MainForm


