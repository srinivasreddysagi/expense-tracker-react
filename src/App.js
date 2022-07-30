import { useReducer, useState } from "react";
import "./app.css";
import Transaction from "./components/Transaction";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState("");

    function changeState(state, action) {
        switch (action.type) {
            case "SUBMIT": {
                const trx = {
                    id: uuidv4(),
                    trx: action.add === "income" ? true : false,
                    note,
                    amount,
                };
                return { ...state, transactions: [...state.transactions, trx] };
            }
            default:
                throw new Error();
        }
    }

    const [state, setState] = useReducer(changeState, {
        balance: 0,
        income: 0,
        expense: 0,
        transactions: [],
    });

    return (
        <div className="App">
            <main className="container">
                <h1>Expense Tracker</h1>
                <div className="encap">
                    <div className="tracker">
                        <div className="balance">
                            <h3>Balance</h3>
                            <p>
                                ₹<span>{state.balance}</span>
                            </p>
                        </div>
                        <div className="earn-spend">
                            <div className="income">
                                <h3>Income</h3>
                                <p>
                                    ₹<span>{state.income}</span>
                                </p>
                            </div>
                            <div className="expense">
                                <h3>Expense</h3>
                                <p>
                                    ₹<span>{state.expense}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="addtrx">
                    <h3>Add transaction</h3>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Note"
                            className="input-element"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Amount"
                            className="input-element"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <button
                            className="input-element submit"
                            onClick={(e) => {
                                setState({
                                    type: "SUBMIT",
                                    payload: e,
                                    add: "income",
                                });
                            }}
                        >
                            Add Income
                        </button>
                        <button
                            className="input-element submit"
                            onClick={(e) =>
                                setState({
                                    type: "SUBMIT",
                                    payload: e,
                                    add: "expense",
                                })
                            }
                        >
                            Add Expense
                        </button>
                    </div>
                </div>
                <div className="trx-container">
                    <h3>History</h3>
                    <div className="trxs">
                        <ul>
                            {state.transactions.map((item) => (
                                <Transaction key={item.id} {...item} />
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
