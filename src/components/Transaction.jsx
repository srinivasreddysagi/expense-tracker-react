import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function Transaction({ id, trx, note, amount, fun }) {
    return (
        <li className={trx ? "trx in" : "trx out"}>
            <button
                className="trx-del"
                onClick={() =>
                    fun({
                        type: "DELETE",
                        payload: id,
                    })
                }
            >
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
