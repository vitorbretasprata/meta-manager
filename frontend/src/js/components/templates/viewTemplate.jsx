import React from "react";
import { Link } from 'react-router-dom';

const ViewTemplate = ({ titleTicket, importanceTicket, authorTicket, clientTicket,
     termTicket, dateTicket, stateTicket, commentsTicket, descriptionTicket, linkToEdit, addComment, deleteTicket}) => (
    <div className="container">
        <div className="ticketWindow">
            <form>
                <div className="ticketTitle">{titleTicket} (<strong className={importance}>{importanceTicket}</strong>)</div>
                <div className="ticketInfo">
                    <div className="information">Status: {stateTicket} Author: {authorTicket} Client: {clientTicket}</div>
                    <div className="information">Term: {termTicket} Date of creation: {dateTicket}</div>
                </div>
                <div className="ticketDescription">
                    {descriptionTicket}
                </div>
                <div className="ticketButtons">
                    <Link to={linkToEdit} />
                    <button onClick={deleteTicket}>Delete</button>
                </div>
                <div className="ticketComments">
                    {commentsTicket}
                    <div className="addComment">
                        <button onClick={addComment}>Add a comment</button>
                    </div>
                </div>
            </form>            
        </div>
    </div>
)

export default ViewTemplate;