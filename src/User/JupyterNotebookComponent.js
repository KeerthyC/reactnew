import React, { useState } from "react";
import axios from "axios";
import "./JupyterNotebookComponent.css";
import ConfirmationDialog from "./utils/ModalBox";
import Button from "react-bootstrap/Button";
import RemoveLocalStorage from "./utils/RemoveLocalStorage";
import { useNavigate } from "react-router-dom";
import Timer from "./utils/TimerJupyter";
import SnackBar from "./utils/SnackBar";
import DOMPurify from 'dompurify';
import SplitPane from 'react-split-pane';
import './utils/Resizer.css';
import TestTabs from "./utils/TestTabs";

const apiurl = process.env.REACT_APP_API_URL;

  


const JupyterNotebookComponent = () => {
  const hexmModsString = localStorage.getItem("hexm_mods");
  const hexmMods = hexmModsString ? JSON.parse(hexmModsString) : [];  
  const firstMod = hexmMods.length > 0 ? hexmMods[0] : null;
  const fileName = firstMod.mod_name;
  const navigate = useNavigate(); // For React Router v6
  const [notebookUrl, setNotebookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const djuserToken = localStorage.getItem("djangoToken");
  const maxPollAttempts = 5;
  const pollInterval = 4000; // Poll every 4 seconds
  // Begin SA-25
  const [showDialog, setShowDialog] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    duration: 6000,
    severity: "info",
  });



  const [isResizing, setIsResizing] = useState(false);

  const handleDragStarted = () => {
    setIsResizing(true);
  };

  const handleDragFinished = () => {
    setIsResizing(false);
  };


  const handleContinue = () => {
    setShowDialog(false);
    setSnackbarInfo({
      open: true,
      message: "Saving Notebook Instance..",
      duration: 3000,
      severity: "info",
    });
    // Wait for 3 seconds, then execute abc()
    setTimeout(() => {
      handleSaveandSubmit();
      // Show "Quitting" message
      setSnackbarInfo({
        open: true,
        message: "Uploading Notebook to Server",
        duration: 6000,
        severity: "success",
      });
      // Wait for 3 more seconds, then execute def()
      setTimeout(() => {
        stopJupyter();

        setSnackbarInfo({
          open: false,
          message: "Shutting Down Server",
          duration: 0,
          severity: "warning",
        });
      }, 3000);
    }, 3000);
  };



  const handleDiscard = () => {
    console.log("Discard clicked");
    setShowDialog(false);
    // Additional discard logic
  };

  const handleSaveandSubmit = () => {
    let iframe = document.getElementById("hnotebook");
    let targetOrigin = localStorage.getItem("jupnoteurl");
    iframe.contentWindow.postMessage("save-notebook", targetOrigin);
    // Additional discard logic
  };

  // End SA-25


  const pollJupyterServer = (url) => {
    axios
      .get(url)
      .then(() => {
        setNotebookUrl(url); // Server is ready, set the notebook URL
        setIsLoading(false);
      })
      .catch(() => {
        if (pollCount < maxPollAttempts) {
          setTimeout(() => pollJupyterServer(url), pollInterval);
          setPollCount(pollCount + 1);
        } else {
          console.error("Failed to connect to Jupyter Notebook server.");
          setIsLoading(false);
          // Handle max poll attempts reached here
        }
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarInfo({ ...snackbarInfo, open: false });
  };


  




  const startJupyter = async () => {
    setIsLoading(true);
    setPollCount(0);
    console.log("Attempting to start Jupyter");
    try {
        const response = await axios.get(apiurl+'/api/start-jupyter/', {
            headers: {
                'Authorization': `Bearer ${djuserToken}`, // Adjust based on your auth setup
            },
            params: {
              fileName: fileName // Send fileName as a query parameter
            }
        });

        if (response.data.url) {
            const notebookUrl = `${response.data.url}/lab/tree/Questions.ipynb`;
            localStorage.setItem("jupnoteurl", response.data.url);            
            pollJupyterServer(notebookUrl);
        }
    } catch (error) {
        console.error('Error starting Jupyter Notebook:', error);
        setIsLoading(false);
        setSnackbarInfo({
            open: true,
            message: "Session Expired. Redirecting..",
            duration: 6000,
            severity: "warning",
          });
          setTimeout(() => {
            navigate("/"+localStorage.getItem("ttokenname"));
          }, 3000);
               
}   
     

};










  const stopJupyter = async () => {
    try {
      await axios.get(apiurl + "/api/stop-jupyter/", {
        headers: {
          Authorization: `Bearer ${djuserToken}`, // Adjust based on your auth setup
        },
      });
      console.log("Jupyter Notebook stopped");
      setNotebookUrl("");
      setIsLoading(false);
      const TestFinish = RemoveLocalStorage("jupyter"); //SA-25
      navigate("/usermsg");
    } catch (error) {
      console.error("Error stopping Jupyter Notebook:", error);
    }
  };

  return (
    <div>


      <SnackBar
        open={snackbarInfo.open}
        handleClose={handleCloseSnackbar}
        message={snackbarInfo.message}
        duration={snackbarInfo.duration}
        severity={snackbarInfo.severity}
      />

      <ConfirmationDialog
        show={showDialog}
        onHide={() => setShowDialog(false)}
        message="Are you sure you want to submit the test?"
        onContinue={handleContinue}
        onDiscard={handleDiscard}
        continueText="Continue"
        discardText="Discard"
      />

      {!notebookUrl && !isLoading && (
 
<div class="container-fluid text-center">
  <div class="row">
    
    <div class="col-sm-5" style={{background:'#ffffff',padding:'85px',lineHeight:'1.7em',paddingTop:'150px',height:'100vh',textAlign:'left'}}>
<h5 style={{color:'#576871',fontWeight:'400',marginBottom:'50px'}}>Hey {localStorage.getItem("CName")}</h5>

     
    <h1 style={{fontWeight:'700',marginTop:'20px'}}> Jupyter Practical Test </h1>
    </div>
    <div class="col-sm-7" style={{background:'#f3f7f7',padding:'85px',lineHeight:'1.7em',paddingTop:'150px',height:'100vh'}}>
    <h2 class="d-block test-instructions__title" style={{color:'#39424e',fontWeight:'400'}}>Instructions</h2>
    <hr/>
    <h5 className="card-title  mb-4" style={{textAlign:'left'}}>Important: Please Read Before Continuing</h5>
<div style={{textAlign:'left'}}>

   

        <p className="card-text">           
           You about to start the practical tests section. If you are ready to proceed please click below button to start the test
        </p>

   


           <ul className="list-group list-group-flush">
            <li className="list-group-item" style={{background:'transparent'}}>
              Test Name :- {firstMod.mod_name}
            </li>
            <li className="list-group-item" style={{background:'transparent'}}>Time :- {firstMod.time} Minutes</li>
          </ul>
	 <div style={{textAlign:'right'}}> 
     <button
            style={{
              width: "300px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "30px",
              marginTop: "30px",
            }}
            className="btn btn-primary"
            onClick={startJupyter}
          >
            Start Jupyter Test
          </button>
   </div>
        </div>
    </div>
  </div>
</div>
     
       
      )}
      {isLoading && (
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            marginTop: "100px",
          }}
        >
          <div className="spinner-border text-success" role="status">
            <span className="sr-only"> </span>
          </div>{" "}
          <p style={{ padding: "20px" }}>
            Please wait while we setup Jupyter Test Environment{" "}
          </p>
        </div>
      )}
      {notebookUrl && (
        <div className="container-fluid text-center">



<div className="row" >


<div class="d-flex flex-row" style={{padding:'0px'}}>
<div>

<div style={{background:'#e7eeef',maxWidth:'70px',padding:'0px',minWidth:'70px',height:'100vh'}}>
          <div style={{background:'#39424e',width:'auto',position:'fixed',top:'0',left:'0',padding: '10px',paddingBottombottom: '0px;'}}
            >
              <Timer
                time={firstMod.time}
                onTimeout={stopJupyter}
                lowTimeThreshold={2}
              />
            </div>
<div style={{marginTop:'78px'}}>

<div>
  <TestTabs/>
    {/*  {hexmMods.map((mod, index) => (
        <div key={index} className="testtab p-4 text-center" id={`Test${index + 1}`}>
       
          <svg style={{ display: mod.isVisible ? 'block' : 'none' }} viewBox="0 0 24 24" width="1em" height="1em" class="ui-svg-icon ui-svg-icon" fill="currentColor"><path d="M12 23C5.9 23 1 18.1 1 12c0-3 1.1-5.7 3.2-7.8C6.3 2.1 9.1 1 12 1c1.6 0 3.1.3 4.5 1 .5.2.7.8.5 1.3-.2.5-.8.7-1.3.5-1.2-.5-2.4-.8-3.7-.8-5 0-9 4-9 9s4 9 9 9 9-4 9-9v-.9c0-.6.4-1 1-1s1 .4 1 1v.9c0 6.1-4.9 11-11 11z"></path><path d="M12 15c-.3 0-.5-.1-.7-.3l-3-3c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l2.3 2.3L22.3 2.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path></svg>
          <span style={{ display: mod.isVisible ? 'none' : 'block' }}>{index + 1}</span>
        </div>
    ))}*/}
    </div>

</div>



          </div>


</div>
  <SplitPane split="vertical" minSize={70} defaultSize='30%' 
        onDragStarted={handleDragStarted} 
        onDragFinished={handleDragFinished}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={2}
        direction="vertical"
        cursor="col-resize">
  
  <div  style={{marginLeft:'70px',overflow:'hidden'}}>
    
  <div style={{height: '100vh',overflowY: 'scroll',background:'#f3f7f7',position:'relative'}}> 
          <section class="question-view__title-wrapper"><h1 class="disable-text-selection question-view__title">
            {firstMod.mod_name}</h1></section>
<hr/>
          <section className="question-view__instruction" style={{padding:'10px'}}>
            <div className="candidate-rich-text disable-text-selection">
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(firstMod.question) }} />
          
           </div></section>


          <div style={{position:'fixed',color:'#333',bottom:'0px',right: '0px',
    textAlign: 'center',background:'#ffffff',zIndex:'999999'}}>
<div>
{notebookUrl && (
        <div>
          {firstMod && firstMod.type === "jupyter" && (
            <div>
            {/*  <Timer
                time={firstMod.time}
                onTimeout={stopJupyter}
                lowTimeThreshold={2}
          />*/}
            </div>
          )}
          <div>
            <Button onClick={() => setShowDialog(true)}>
              Save & Submit Test
            </Button>
          </div>
        </div>
      )}
  </div>

          </div>
          </div>
    
    </div>
  <div>
    
  <div style={{height: '100vh'}}>



  <div style={{ position: 'relative', height: '100%' }}>
        {isResizing && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <p>Resizing</p>
          </div>
        )}
        <iframe 
          id="hnotebook"
          src={notebookUrl}
          width="100%"
          height="680px"
          style={{border: "none", display: isResizing ? 'none' : 'block', height: '100%' }}
          allowFullScreen
        />
      </div>
                 </div>
    
    </div>
  </SplitPane>
</div>



      </div>
    
      </div>
        
        
      )}

    </div>
  );
};

export default JupyterNotebookComponent;