import React, {useCallback, useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [users, setUsers]: any[] = useState([]);
  const [allusers, setallUsers]: any[] = useState([]);
  const [sex, seSex] = useState("");
  const [selC, seselC] = useState("");
  const [country, setCountry]: any[] = useState([]);
 
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(json => {
        const tmp: {[key: string] : Array<any>} = {};
        json?.results?.forEach((item: { location: { country: string; }; }) => {
          const country = item?.location?.country;
          if (country) {
            if (!tmp[country]) {
              tmp[country] = [];
            } else {
              tmp[country].push(item);
            }
          }
        });
        const array: Array<any> = [];
        const tmpArr = Object.entries(tmp);
        tmpArr.forEach((item) => {
          const cname = item[0];
          const citems = item[1];
          array.push({
            cname,
            citems,
            cvalue: citems.length
          })
        });
        array.sort((a, b) => b.cvalue - a.cvalue);
        setCountry(array);
        seselC(country?.[0]?.cname);
      })
      .catch(error => console.error(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback((item: any) => {
    seselC(item.target.value);
  }, [])

  useEffect(() => {
    const curi = country.find((opt: any) => opt.cname === selC);
    setUsers(curi?.citems);
    setallUsers(curi?.citems);
  }, [country, selC]);

    
  const handleChangeSex = useCallback((item: any) => {
    seSex(item.target.value);
    setUsers(() => allusers?.filter((opt: any) => item.target.value ? opt?.gender === item.target.value : opt))
  }, [allusers]);
 

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <div style={{display: "flex"}}>
          <select value={selC} onChange={handleChange} style={{marginRight: 10}}>
            {
              country.map((item: any) => 
                <option value={item.cname} key={item.cname}>{item.cname}</option>)
            }
          </select>
          <select value={sex} onChange={handleChangeSex}>
            <option value="female">女</option>
            <option value="male">男</option>
            <option value="">所有</option>
          </select>
        </div>
        

        {
          users?.map((item: any) => <div style={{display: "flex"}}>
            <div style={{marginRight: 10}}>{`${item?.name?.first}${item?.name?.title}${item?.name?.last}`}</div>
            <div style={{marginRight: 10}}>{`${item?.gender === "male" ? "男" : "女"}`}</div>
            <div style={{marginRight: 10}}>{`${item?.location?.city}`}</div>
            <div>{
              `${new Date(item?.registered?.date).getFullYear()} - ${new Date(item?.registered?.date).getMonth()+1} - ${new Date(item?.registered?.date).getDate()}`
            }</div>
          </div>)
        }
      </header>
    </div>
  );
}

export default App;
