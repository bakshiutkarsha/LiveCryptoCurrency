import * as React from "react";
// @ts-ignore
import TableStyle from "../../../styles/Table.scss";
import moment from 'moment';

interface TableInfo {
    from: string
    to: string
    rate: number
    orderExpiresIn: number,
    status: string,
    max: number,
    min: number,
    minConf: number,
    createdAt: string,
    updatedAt: string


}
const Table: React.FC = () => {
  const [tableInfo, setTableInfo] = React.useState<TableInfo[]>([])

  const [frequency, setFrequency] = React.useState(5000);

  async function getInfo() {
    const currencyData = await fetch('https://liquality.io/swap/agent/api/swap/marketinfo')
    setTableInfo(await currencyData.json());
  }

  React.useEffect(() => {
    if(frequency && !tableInfo.length){
        getInfo();
    } else {
        const intervalId = setInterval(async() => { 
            getInfo();
        }, frequency)
        return () => clearInterval(intervalId); 
    }
  }, [tableInfo])

  function convertCurrency(labelValue){
    let currency =  Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));

    let convertedNum = String(currency)
    return [convertedNum.substring(0, convertedNum.length - 1), convertedNum.charAt(convertedNum.length - 1)]
  }

  function onFrequencyChange(e){
    setFrequency(e.currentTarget.value)
  }

  function getDays(seconds){
    return Math.floor(seconds/86400);
  }

  return <div className={TableStyle.tableCntr}>
      <div className={TableStyle.headCntr}>
        <p>Live Currency Dashboard</p>
        <div className={TableStyle.frequencyCntr}>
                <span>Choose Frequency: </span>
                <div> 
                    <span>
                        <input type="radio" name="frequency" value='5000' onChange={onFrequencyChange.bind(this)}/> 5 sec
                    </span>
                    <span>
                        <input type="radio" name="frequency" value='10000' onChange={onFrequencyChange.bind(this)}/> 10 sec
                    </span>
                    <span>
                        <input type="radio" name="frequency" value='15000' onChange={onFrequencyChange.bind(this)}/> 15 sec          
                    </span>
                </div>
        </div>
      </div>
      
       <table className={TableStyle.table} cellPadding="0" cellSpacing="0">
           <thead>
               <tr>
                   <th>Sender</th>
                   <th>Receiver</th>
                   <th>Rate</th>
                   <th>Expies In</th>
                   <th>Status</th>
                   <th>Max Amount(unit)</th>
                   <th>Min Amount(unit)</th>
                   <th>Created At</th>
                   <th>Updated At</th>
               </tr>
           </thead>
           <tbody>
           {tableInfo.map(info => (
               <tr key={`${info.from}_${info.to}_${info.rate}`}>
                   <td>{info.from}</td>
                   <td>{info.to}</td>
                   <td>{info.rate}</td>
                   <td>{getDays(info.orderExpiresIn)} days</td>
                   <td><span className={TableStyle.active}>{info.status}</span></td>
                   <td>{convertCurrency(info.max)[0]} <span className={`${TableStyle.currencyUnit} ${convertCurrency(info.max)[1]}`}>{convertCurrency(info.max)[1]}</span></td>
                   <td>{convertCurrency(info.min)[0]} <span className={`${TableStyle.currencyUnit} ${TableStyle.min} ${convertCurrency(info.max)[1]}`}>{convertCurrency(info.min)[1]}</span></td>
                   <td>{moment(info.createdAt).format('D MMM, YYYY')}</td>
                   <td>{moment(info.updatedAt).format('D MMM, YYYY')}</td>
               </tr>
           ))}        
           </tbody>
       </table>
  </div>
};


export default Table;