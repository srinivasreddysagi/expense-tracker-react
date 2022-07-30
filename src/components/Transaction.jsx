import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function Transaction({ trx }) {
    return (
        <li className={trx ? "trx in" : "trx out"}>
            <button className="trx-del">
                <FaTrashAlt />
            </button>
            <span className="trx-desc" id="trx-desc">
                Income
            </span>
            <span className="trx-amount" id="trx-amount">
                ₹2,000
            </span>
        </li>
    );
}

export default Transaction;
