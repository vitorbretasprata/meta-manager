import React from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";

const Importance = [
    { value: '1', label: 'Low' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'High' },
    { value: '4', label: 'Emergency' }
  ];

const Status = [
    { value: '1', label: 'Low' },
    { value: '2', label: 'Medium' },
    { value: '3', label: 'High' },
    { value: '4', label: 'Emergency' }
  ];


const EditTemplate = ({ titleTicket, clientTicket,
     termTicket, changeDate, descriptionTicket, editTicket, cancelEdit}) => (
    <div className="container">
        <div className="ticketWindow">
            <form>                
                <div className="ticketInfo">
                    <div className="ticketTitle">
                        <h2><input type="text" value={titleTicket} className="sizeInput editInputs"/></h2>
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
                            <label for="client">Client</label>
                            <input type="text" value={clientTicket} className="sizeInput editInputs form-control" id="client"/>
                        </div> 
                        <div className="information form-group">
                            <label for="term">Term</label>
                            <DatePicker
                            selected={termTicket}
                            onChange={changeDate}
                            />                                                                           
                        </div>
                    </div>                    
                </div>
                <div className="ticketDescription">
                    <div className="descriptionTitle">
                        <h4>Description</h4>
                    </div>
                    <div className="description">
                        <textarea className="form-control" rows="10" value={descriptionTicket}>
                        </textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button onClick={editTicket} className="marginButtons btn btn-dark">Save</button>
                        <Link to={cancelEdit} className="marginButtons btn btn-dark">Cancel</Link>
                    </div>    
                </div>                
                
            </form>            
        </div>
    </div>
)

export default EditTemplate;