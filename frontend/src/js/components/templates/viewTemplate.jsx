import React from "react";
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const Content = posed.div({
    closed: { height: 0 },
    open: { height: 'auto' }
});

const ViewTemplate = ({ titleTicket, importanceTicket, authorTicket, clientTicket, isOpen,
     termTicket, dateTicket, stateTicket, commentsTicket, descriptionTicket, linkToEdit, addComment, deleteTicket, newComment, categoryTicket}) => (
    <div className="container">
        <div className="ticketWindow">
            <form>                
                <div className="ticketInfo">
                    <div className="ticketTitle"><h2>{titleTicket}</h2> <h3>(<span className={"color-" + importanceTicket}>{importanceTicket}</span>)</h3></div>
                    <div className="information">
                        <span>Status: </span> {stateTicket} 
                        <span>Author:</span> {authorTicket} 
                        <span>Client:</span> {clientTicket} 
                        <span>Category:</span> {categoryTicket}
                    </div>
                    <div className="information"><span>Term:</span>  {termTicket} <span>Date of creation:</span> {dateTicket}</div>
                </div>
                <div className="ticketDescription">
                    <div className="descriptionTitle">
                        <h4>Description</h4>
                    </div>
                    <div className="description">
                        <p>
                            {descriptionTicket}
                        </p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to={linkToEdit} className="marginButtons btn btn-dark">Edit</Link>
                        <button onClick={deleteTicket} className="marginButtons btn btn-dark">Delete</button>
                    </div>    
                </div>
                
                <div className="ticketComments">                    
                    <div className="addComment">
                        <button onClick={addComment} className="btn btn-dark">Add a comment</button>
                    </div>
                    <Content className="content" pose={isOpen ? 'open' : 'closed'}>
                        <form className="conent-wrapper" onSubmit={newComment}>
                            <textarea name="newComment" className="marginComment form-control" rows="3">

                            </textarea>
                            <div className="f-flex justify-content-end">
                                <input type="submit" value="Add" className="btn btn-dark"/>
                            </div>
                        </form>
                    </Content>
                    <div className="Comments">
                        {commentsTicket}
                    </div>                    
                </div>
            </form>            
        </div>
    </div>
)

export default ViewTemplate;