import React from "react";
import { Link } from 'react-router-dom';

const ViewTemplate = ({ titleTicket, importanceTicket, importance, authorTicket, clientTicket,
     termTicket, dateTicket, stateTicket, commentsTicket, descriptionTicket, linkToEdit, addComment, deleteTicket}) => (
    <div className="container">
        <div className="ticketWindow">
            <form>                
                <div className="ticketInfo">
                    <div className="ticketTitle"><h2>{titleTicket}</h2> <h3>(<strong className={importance}>{importanceTicket}</strong>)</h3></div>
                    <div className="information">Status: {stateTicket} Author: {authorTicket} Client: {clientTicket}</div>
                    <div className="information">Term: {termTicket} Date of creation: {dateTicket}</div>
                </div>
                <div className="ticketDescription">
                    <div className="descriptionTitle">
                        <h3>Description: </h3>
                    </div>
                    <div className="description">
                        <p>
                            {descriptionTicket}
                        </p>
                    </div>
                    
                </div>
                <div className="ticketButtons d-flex justify-content-end">
                    <Link to={linkToEdit} />
                    <button onClick={deleteTicket}>Delete</button>
                </div>
                <div className="ticketComments">
                    {commentsTicket}
                    <div className="addComment d-flex justify-content-end">
                        <button onClick={addComment}>Add a comment</button>
                    </div>
                </div>
            </form>            
        </div>
    </div>
)

export default ViewTemplate;