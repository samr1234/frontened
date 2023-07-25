import React, { useState ,useEffect} from 'react';
import './Report.css';
import Pdp from '../analytics/Pdp'
import Apti from '../analytics/Apti'
import axios from 'axios'
function Report() {

  const [data1,setData1] = useState()
  const [limit,setLimit] = useState(10)
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async() => {
      const url = 'http://localhost:3001/getCourseData';

   let data = await axios.get(url,{params: {
    _limit: entriesPerPage
   }});
   console.log("data:::::::",data)
   
   if(data){
    
   

    setData1(data.data)
  //  console.log("data1::::",data1)

   }
        
           
  }
    fetchData();
  }, [entriesPerPage]);

  console.log("data1:::",data1)


  const handleEntriesPerPageChange = (event) => {
  
    setEntriesPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div className="mainClass container">
      <div className="heading">
        <h2>
          Total Questions <span>40</span> <span>Maximum Time <span>90 Minutes</span></span>
        </h2>
      </div>

      <div className=" SELECT">
        <label htmlFor="entries">Show</label>
        <select id="entries" name="entries" value={entriesPerPage} onChange={handleEntriesPerPageChange}>
          <option value="5" >5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          
        </select>
        <label htmlFor="entries">entries</label>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">RANK</th>
            <th scope="col">NAME</th>
            <th scope="col">MARK OBTAINED</th>
            <th scope="col">CORRECT</th>
            <th scope="col">INCORRECT</th>
            <th scope="col">SKIPPED</th>
            <th scope="col">TOTAL TIME</th>
          </tr>
        </thead>
        <tbody>
        
          
          
            {
             

             data1?.map(item => {
              const {studentId} = item;
              console.log("studentId:::",studentId.name)
              return (
                <>
                {/* <th scope="column">{1}</th> */}
                <tr>
                <td >{item.Rank}</td>
                <td >{studentId.name}</td>
                <td >{item.Total_Marks_obt}</td>
                <td >{item.TotalCorrect}</td>
                <td >{item.Totalincorrect}</td>
                <td >{item.Totalskipped}</td>
                <td >{item.TimeDuration}</td>
          
                </tr>
              </>
              )
})
             

            }
            
       
         
        </tbody>
      </table>
      <div className="container1" style={{height:"800px"}}>
        <div className="" >
          {/* <Pdp /> */}
        </div>
        {/* <div className="right">
          <Apti />
        </div> */}
      </div>



      
      </div>
  );
}

export default Report;
