import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function Transaction({ trx, note, amount }) {
    return (
        <li className={trx ? "trx in" : "trx out"}>
            <button className="trx-del">
                <FaTrashAlt />
            </button>
            <span className="trx-desc" id="trx-desc">
                {note}
            </span>
            <span className="trx-amount" id="trx-amount">
                {trx ? "₹" + amount : "-₹" + amount}
            </span>
        </li>
    );
}

export default Transaction;
