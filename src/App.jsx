import React, { useState, useCallback, useEffect,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { RiCheckboxCircleLine } from 'react-icons/ri';

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let generatedPassword = '';
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) string += "0123456789";
    if (symbols) string += "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";
    for (let i = 0; i < length; i++) {
      let char = string.charAt(Math.floor(Math.random() * string.length));
      generatedPassword += char;
    }
    setPassword(generatedPassword);
  }, [length, numbers, symbols,setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, symbols, passwordGenerator]);

 
  const passwordRef = useRef(null);
  const copyToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  return (
    <div className=" d-flex justify-content-center align-items-center vh-100">
      <div className="password-generator rounded p-4">
        <h1 className="text-center mb-4">Password Generator</h1>
        <div className="form-group">
          <label htmlFor="length">Password Length:</label>
          <input
            type="range"
            id="length"
            min="8"
            max="25"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="form-control-range"
          />
          <span>{length}</span>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="numbers"
            className="form-check-input"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
          />
          <label htmlFor="numbers" className="form-check-label">Include Numbers</label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="symbols"
            className="form-check-input"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          />
          <label htmlFor="symbols" className="form-check-label">Include Symbols</label>
        </div>
        <div className="form-group">
          <label htmlFor="generatedPassword" className="mt-4">Generated Password:</label>
          <div className="input-group">
            <input
              type="text"
              id="generatedPassword"
              value={password}
              readOnly
              className="form-control"
              ref={passwordRef}
            />
            <button className="btn btn-primary" onClick={copyToClipboard}>
              {copied ? <RiCheckboxCircleLine /> : 'Copy'}
            </button>
          </div>
        </div>
        <footer className="text-center mt-4">
                Made with ❤️ by Sandeep
              </footer>
      </div>
    </div>
  );
}

export default App;
