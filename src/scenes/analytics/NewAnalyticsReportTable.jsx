import React, { useState ,useEffect} from 'react';
import axios from 'axios'
// import Pdp from './Pdp'

function NewAnalyticsReport({data,selectedGraph}) {

  const [data1,setData1] = useState()
  const [limit,setLimit] = useState(10)
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  console.log("selectedGraph::: from new ",selectedGraph)

  useEffect(() => {
    const fetchData = async() => {
      const url = 'http://localhost:3001/getSingleData';

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


  // const handleEntriesPerPageChange = (event) => {
  
  //   setEntriesPerPage(parseInt(event.target.value, 10));
  // };

  return (
    <div className="mainClass container">

    

      <table className="table ">
        <thead>
          <tr className='text-sm'>
            <th scope="col">ATTEMPTED ON</th>
            <th scope="col">RANK</th>
           
            <th scope="col">TOTAL TIME TAKEN</th>
            <th scope="col">TOTAL TIME</th>
            <th scope="col">CORRECT</th>
            <th scope="col">INCORRECT</th>
            <th scope="col">SKIPPED</th>
            <th scope="col">MARKS OBTAINED</th>
            
          </tr>
        </thead>
        <tbody className="hover:bg-red-400">
        
          
          
            {
             

             
             data.map(item => {
              const dateObject = new Date(item.Date);
              const formattedDate = dateObject.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
              return (
                <>
                {/* <th scope="column">{1}</th> */}
                {
                selectedGraph === "total" && 
                <tr className="hover:bg-red-400">
                <td >{formattedDate}</td>
                <td >{item.Rank}</td>
                <td >{item.TotalTimeTaken}</td>
                <td >{item.TimeDuration}</td>
                <td >{item.TotalCorrect}</td>
                <td >{item.Totalincorrect}</td>
                <td >{item.Totalskipped}</td>
                <td >{item.Total_Marks_obt}</td>
                
              
                </tr>
                
                  }
                {
                selectedGraph === "apti" && 
                <tr className="hover:bg-red-400">
                <td >{formattedDate}</td>
                <td >{item.Rank}</td>
                <td >{item.TotalTimeTaken}</td>
                <td >{item.TimeDuration}</td>
                <td >{item.Apticorrect}</td>
                <td >{item.Totalincorrect}</td>
                <td >{item.AptiSkipped}</td>
                <td >{item.Apti}</td>
                
              
                </tr>
                
                  }
                {
                selectedGraph === "pdp" && 
                <tr className="hover:bg-red-400">
                <td >{formattedDate}</td>
                <td >{item.Rank}</td>
                <td >{item.Pdtime}</td>
                <td >{item.TimeDuration}</td>
                <td >{item.PDcorrect}</td>
                <td >{item.PDincorrect}</td>
                <td >{item.Totalskipped}</td>
                <td >{item.Total_Marks_obt}</td>
                
              
                </tr>
                
                  }
                {
                selectedGraph === "technical" && 
                <tr className="hover:bg-red-400">
                <td >{formattedDate}</td>
                <td >{item.Rank}</td>
                <td >{item.Techtime}</td>
                <td >{item.TimeDuration}</td>
                <td >{item.techcorrect}</td>
                <td >{item.techincorrect}</td>
                <td >{item.TechSkipped}</td>
                <td >{item.Tech}</td>
                
              
                </tr>
                
                  }
              </>
              )
})
             

            }
            
       
         
        </tbody>
      </table>
      {/* <div className="container1" style={{height:"800px"}}>
        <div className="" >
          <Pdp />
        </div>
      </div> */}
  </div>
  );
}

export default NewAnalyticsReport;