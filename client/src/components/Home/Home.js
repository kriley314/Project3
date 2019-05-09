import React from "react";
import "./style.css";

function Home() {
    return (
        <div className="text-box">
            <div class="btn-group">
                <button type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                    My Groups <i class="fas fa-users"></i>
                </button>
            </div>

        </div>

    );
}

export default Home;