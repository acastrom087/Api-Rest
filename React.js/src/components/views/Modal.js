//import { useParams } from "react-router";
import './Modal.css'
function Modal(props){
    
    return(
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Photo</h5>
                    <button type="button" className="close" onClick={props.closeModal}  data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                   <img src={props.url}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Modal;