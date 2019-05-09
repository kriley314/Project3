import React from 'react';
import "./style.css";

function Group() {
    return (
        <div className="text-box">
            <div className="btn-group">
                <button type="button" className="btn btn-dark">
                    Current Group <i className="fas fa-users"></i>
                </button>
            </div>
        </div>
    );
}

export default Group;