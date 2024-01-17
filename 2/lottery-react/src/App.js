import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
import { useEffect, useState, Fragment } from "react";

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [value, setValue] = useState(0)
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);

      setManager(manager);
      setPlayers(players);
      setBalance(balance);
    }

    fetchData();
  }, [players, balance]);

  // console.log(web3);
  // console.log(web3.eth.getAccounts().then(console.log));

  const enterLottery = async (even) => {
    even.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    });

    setMessage('You have been entered!');
  }

  const pickWinerBttn = async () => {
    const account = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.pickWiner().call({
      from: account[0]
    });

    setMessage('A winer has been picked!');
  }

  return (
    <Fragment >
      <div className="App">
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {manager}
        </p>
        <p>
          There are curently {players.length} people entered,
          competing to win {web3.utils.fromWei(balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={enterLottery}>
          <h4>What to try luck?</h4>
          <div>
            <lable>Amount of ether ro ether: </lable>
            <input
              value={value}
              onChange={(even) => setValue(even.target.value)}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />
        <h4>Ready to pick a winer?</h4>
        <button onClick={pickWinerBttn}>Pick a winer</button>
        <hr />

        <h2>{message}</h2>
      </div>
    </Fragment>
  );
}

export default App;