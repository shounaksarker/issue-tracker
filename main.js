document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  // console.log("delete", id);
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  let openIssue = 0;
  let closeIssue = 0;
  
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>`;
    if(status == "Open")
    {
      issuesList.innerHTML += `<h3> ${description} </h3>`;
      openIssue+=1;
      
    }
    else{
      issuesList.innerHTML += `<h3><strike> ${description} </strike></h3>`;
      closeIssue+=1;
    }
                              
    issuesList.innerHTML += `<p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
              </div>`;
  }
  if(openIssue+closeIssue !=0){
    document.getElementById("open-issue").innerText =`Open issue (${openIssue})`;
    document.getElementById("total-issue").innerText = `out of (${openIssue+closeIssue})`;
  }
  else{
    document.getElementById("open-issue").innerText =" ";
    document.getElementById("total-issue").innerText = " ";
  }
  
}
