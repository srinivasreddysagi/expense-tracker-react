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
                if (note.trim() !== "" && /^\d+$/.test(amount)) {
                    const trx = {
                        id: uuidv4(),
                        trx: action.payload === "income" ? true : false,
                        note,
                        amount,
                    };

                    let income = state.income;
                    let expense = state.expense;
                    const Amount = parseInt(amount);

                    if (trx.trx) income += Amount;
                    else expense += Amount;

                    const balance = income - expense;

                    setNote("");
                    setAmount("");

                    return {
                        balance,
                        income,
                        expense,
                        transactions: [...state.transactions, trx],
                    };
                }
                return state;
            }
            case "DELETE": {
                const trx = state.transactions.find((item) => {
                    return item.id === action.payload;
                });

                const Amount = parseInt(trx.amount);
                let income = state.income;
                let expense = state.expense;

                if (trx.trx) income -= Amount;
                else expense -= Amount;

                console.log(income, expense);

                const balance = income - expense;

                return {
                    balance,
                    income,
                    expense,
                    transactions: state.transactions.filter(
                        (item) => item.id !== action.payload
                    ),
                };
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
                                <span>
                                    {state.balance >= 0
                                        ? "₹" + state.balance
                                        : "-₹" + Math.abs(state.balance)}
                                </span>
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
                            onClick={() => {
                                setState({
                                    type: "SUBMIT",
                                    payload: "income",
                                });
                            }}
                        >
                            Add Income
                        </button>
                        <button
                            className="input-element submit"
                            onClick={() =>
                                setState({
                                    type: "SUBMIT",
                                    payload: "expense",
                                })
                            }
                        >
                            Add Expense
                        </button>
                    </div>
                </div>
                <div className="trx-container">
                    <h3>Statement</h3>
                    <div className="trxs">
                        <ul>
                            {state.transactions.map((item) => (
                                <Transaction
                                    key={item.id}
                                    fun={setState}
                                    {...item}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
