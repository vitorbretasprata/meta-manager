import React from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { Category, Importance, Status } from '../utils/consts';

const EditTemplate = ({ titleTicket, clientTicket, selectDate, changeTitle, 
            termTicket, changeDate, descriptionTicket, editTicket, cancelEdit, changeClient, changeDesc, method}) => (
    <div className="container">
        <div className="ticketWindow">
            <form onSubmit={editTicket} method={method}>                
                <div className="ticketInfo">
                    <div className="ticketTitle">
                        <h2><input type="text" value={titleTicket} className="sizeInput editInputs" name="filterTitle" placeholder="Title" onChange={changeTitle}/></h2>
                    </div>
                    <div className="gridName selects">
                        <div className="information form-group">
                            <label for="importance">Importance</label>
                            <Select options={Importance} placeholder="Select" name="filterImportance" id="importance" />
                        </div>
                        <div className="information form-group">
                            <label for="status">Status</label> 
                            <Select options={Status} placeholder="Select" name="filterStatus" id="status" />                                            
                        </div>
                        <div className="information form-group">
                            <label for="status">Category</label> 
                            <Select options={Category} placeholder="Select" name="filterCategory" id="category" />                                            
                        </div>
                        <div className="information form-group">
                            <label for="client">Client</label>
                            <input type="text" value={clientTicket} name="filterClient" className="sizeInput editInputs form-control" id="client" onChange={changeClient}/>
                        </div> 
                        <div className="information form-group">
                            <label for="term">Term</label>
                            <br />
                            <DatePicker
                            name="filterDate"
                            className="sizeInput editInputs form-control"
                            selected={termTicket}
                            onChange={changeDate}
                            onSelect={selectDate}
                            />                                                                           
                        </div>
                    </div>                    
                </div>
                <div className="ticketDescription">
                    <div className="descriptionTitle">
                        <h4>Description</h4>
                    </div>
                    <div className="description">
                        <textarea className="form-control" rows="10" value={descriptionTicket} name="filterDescription" onChange={changeDesc}>
                        </textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="marginButtons btn btn-dark">Save</button>
                        
                        <Link to={cancelEdit} className="marginButtons btn btn-dark">Cancel</Link>
                    </div>    
                </div>                
                
            </form>            
        </div>
    </div>
)

export default EditTemplate;