import { useReducer } from "react";
import "./app.css";
import Transaction from "./components/Transaction";

function App() {
    function changeState() {}

    const [state, setState] = useReducer(changeState, {
        balance: 0,
        income: 0,
        expense: 0,
        note: "",
        amount: 0,
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
                <form className="addtrx">
                    <h3>Add transaction</h3>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Note"
                            className="input-element"
                            value={state.value}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Amount"
                            className="input-element"
                            required
                        />
                    </div>
                    <div className="input-container">
                        <button type="submit" className="input-element submit">
                            Add Income
                        </button>
                        <button type="submit" className="input-element submit">
                            Add Expense
                        </button>
                    </div>
                </form>
                <div className="trx-container">
                    <h3>History</h3>
                    <div className="trxs">
                        <ul>
                            <Transaction trx={true} />
                            <Transaction trx={false} />
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
