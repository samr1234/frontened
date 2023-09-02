import React,{useState} from 'react'

const TopSection = ({data1}) => {


  const [isClassesAttendedHovered, setIsClassesAttendedHovered] = useState(false);
  const [isTestAttemptedHovered, setIsTestAttemptedHovered] = useState(false);


  const handleClassesAttendedHover = () => {
    setIsClassesAttendedHovered(true);
    setIsTestAttemptedHovered(false); // Ensure the other hover state is set to false
  };
  
  const handleTestAttemptedHover = () => {
    setIsTestAttemptedHovered(true);
    setIsClassesAttendedHovered(false); // Ensure the other hover state is set to false
  };

  const handleMouseLeave = () => {
    setIsClassesAttendedHovered(false);
    setIsTestAttemptedHovered(false);
  };

  return (
    <div className="lg:text-lg sm:grid grid-cols-4 pb-3 mb-3 text-sm sm:w-full">
          <div className="mr-3 pb-3">
            <div className="card text-white h-100 ">
              <div
                className="card-body bg-success rounded"
                style={{
                  background: "linear-gradient(to right, #1cbf4b, #0c8f2c)",
                }}
              >
                <div className="rotate">
                  <i className="fa fa-code fa-4x"></i>
                </div>
                <h6 className="text-uppercase">Classes Attended</h6>
                <h1
                  className="display-4 cursor-pointer"
                  onMouseOver={handleClassesAttendedHover}
                  onMouseLeave={handleMouseLeave}
                >
                  {data1.length > 0
                    ? isClassesAttendedHovered
                      ? `${data1[0].ClassesAttend}/${data1[0].TotalAttend}`
                      : data1[0].ClassesAttend
                    : 0}
                </h1>
              </div>
            </div>
          </div>
          <div className="mr-3 pb-3">
            <div className="card text-white h-100">
              <div
                className="card-body bg-info rounded"
                style={{
                  background: "linear-gradient( to right, #FFA500, #FF6347)",
                }}
              >
                <div className="rotate">
                  <i className="fa fa-cubes fa-4x" aria-hidden="true"></i>
                </div>
                <h6 className="text-uppercase">Rank</h6>
                <h1 className="display-4">
                  {data1.length > 0 ? data1[0].Rank : 0}
                </h1>
              </div>
            </div>
          </div>
          <div className="mr-3 pb-3">
            <div className="card text-white h-100">
              <div
                className="card-body bg-info rounded"
                style={{
                  background: "linear-gradient( to right, #FFA500, #FF6347)",
                }}
              >
                <div className="rotate">
                  <i className="fa fa-cubes fa-4x" aria-hidden="true"></i>
                </div>
                <h6 className="text-uppercase">Test Attempted</h6>
                <h1 className="display-4 cursor-pointer" 
                onMouseOver={handleTestAttemptedHover}
                onMouseLeave={handleMouseLeave}
              > 
              {data1.length > 0 ?  isTestAttemptedHovered ?`${data1[0].Testattempted}/${data1[0].TestShare}`:data1[0].Testattempted : 0}</h1>
              </div>
            </div>
          </div>
          <div className="mr-3 pb-3">
            <div className="card text-white h-100">
              <div
                className="card-body bg-info rounded"
                style={{
                  background: "linear-gradient(to right, 279EFF, A2678A)",
                }}
              >
                <div className="rotate">
                  <i className="fa fa-info fa-4x" aria-hidden="true"></i>
                </div>
                <h6 className="text-uppercase">Batch Name</h6>
                <h2 className="display-4">
                  {data1.length > 0 ? data1[0].studentId?.batch : 0}
                </h2>
              </div>
            </div>
          </div>
        </div>
  )
}

export default TopSection