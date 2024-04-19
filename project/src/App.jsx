import { useEffect, useState } from "react";
import "./App.css";
import { currensy } from "./currensy-code";

function App() {
  const [selectV1, setSelectV1] = useState("USD");
  const [selectV2, setSelectV2] = useState("AZN");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  async function getData() {
    try {
      const respons = await fetch(
        `https://v6.exchangerate-api.com/v6/d77d1bce95f1cd0d08b0c491/latest/${selectV1}`
      );
      const result = await respons.json();
      setData(result.conversion_rates);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  function convert() {
    console.log(Object.keys(data));
    amount && setShow(true);
    getData();
    amount && setResult(data[selectV2] * Number(amount));
  }
  useEffect(() => {
    result && setResult(Math.round(result * 100) / 100);
  }, [result]);

  return (
    <>
      <div className="w-full p-3 h-[100vh] bg-purple-600 grid place-content-center ">
        <div className="bg-white text-center p-10 flex flex-col gap-8">
          <h1 className="text-4xl font-medium">Currency Converter</h1>
          <div className="relative ">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="peer w-full border-b-2 border-black outline-none p-2 text-xl"
              type="number"
            />
            <span className="absolute top-[50%] left-2 -translate-y-[50%] text-xl peer-focus:text-sm peer-focus:-translate-y-9 peer-valid:text-sm peer-valid:-translate-y-9 transition-all">
              Amount
            </span>
          </div>
          <div className="flex gap-5 ">
            <select
              value={selectV1}
              name={selectV1}
              onChange={(e) => setSelectV1(e.target.value)}
              className="select "
            >
              {currensy.map((item, index) => (
                <option
                  className="bg-white text-black"
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
            <select
              value={selectV2}
              onChange={(e) => setSelectV2(e.target.value)}
              className="select"
            >
              {currensy.map((item, index) => (
                <option
                  className="bg-white text-black"
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={convert}
            className="bg-purple-600 text-gray-50 w-full p-4 rounded-md text-xl "
          >
            Convert
          </button>
          <p
            className={`${
              show ? "p-3" : "p-0"
            } rounded-md   transition-all text-xl bg-purple-300`}
          >
            {result}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
