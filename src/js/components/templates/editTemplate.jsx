import React from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { Category, Importance, Status } from '../utils/consts';
import FormError from "../utils/formError";

const EditTemplate = ({ titleTicket, clientTicket, changeTitle, changeCategory, changeImportance, changeStatus,
            termTicket, changeDate, descriptionTicket, editTicket, cancelEdit, changeClient, changeDesc, method, selectedStatus, selectedCategory, selectedImportance, Title, titleValid, descValid, titleError, descError}) => (
    <div className="container-fluid">
        <h2 className="paddingTitle">{Title}</h2>
        <form onSubmit={editTicket} method={method}>                
            <div className="ticketInfo row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="labels">
                        <div>
                            <label htmlFor="title">Title</label>
                        </div>
                        <div>
                            <input type="text" value={titleTicket} className="sizeInput editInputs form-control" name="title" id="title" onChange={changeTitle}/>
                            <FormError isError={!titleValid} errorMsg={titleError} />
                        </div>
                    </div>
                    <div className="labels">
                        <div>
                            <label htmlFor="client">Client</label>
                        </div>
                        <div>
                            <input type="text" value={clientTicket} name="client" className="sizeInput editInputs form-control" id="client" onChange={changeClient}/>
                        </div>
                    </div>
                    <div className="labels">
                        <div>
                            <label htmlFor="term">Term</label>
                        </div>
                        <div>
                            <DatePicker 
                                name="date"
                                id="term"
                                className="sizeInput editInputs form-control"
                                moment={termTicket}
                                onChange={changeDate}
                            />                                            
                        </div>
                    </div> 
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="labels">
                        <div>
                            <label htmlFor="importance">Importance</label>
                        </div>
                        <div>
                            <Select options={Importance} 
                            placeholder="Select" 
                            name="importance" 
                            id="importance" 
                            value={selectedImportance ? Importance.filter(imp => imp.label === selectedImportance) : selectedImportance}
                            onChange={changeImportance}
                            />
                        </div>
                    </div>
                    <div className="labels">
                        <div>
                            <label htmlFor="status">Status</label>
                        </div>
                        <div>
                            <Select options={Status} 
                            placeholder="Select"
                            name="status" 
                            id="status" 
                            value={selectedStatus ? Status.filter(status => status.label === selectedStatus) : selectedStatus}
                            onChange={changeStatus}
                            />                                            
                        </div>
                    </div>
                    <div className="labels">
                        <div>
                            <label htmlFor="category">Category</label>
                        </div>
                        <div>
                            <Select 
                            options={Category} 
                            placeholder="Select" 
                            name="category" 
                            id="category" 
                            value={selectedCategory ? Category.filter(category => category.label === selectedCategory) : selectedCategory} 
                            onChange={changeCategory}
                            />                                            
                        </div>
                    </div>
                </div>                                   
            </div>
            <div className="ticketDescription">
                <div className="descriptionTitle">
                    <h4>Description</h4>
                    <FormError isError={!descValid} errorMsg={descError} />
                </div>
                <div className="description">
                    <textarea className="form-control" rows="8" value={descriptionTicket} name="description" onChange={changeDesc}>
                    </textarea>
                </div>
                <div className="d-flex justify-content-start">
                    <button type="submit" className="marginButtons btn btn-dark">Save</button>
                    
                    <Link to={cancelEdit} className="marginButtons btn btn-dark">Cancel</Link>
                </div>    
            </div>                
            
        </form>            
    </div>
)

export default EditTemplate;