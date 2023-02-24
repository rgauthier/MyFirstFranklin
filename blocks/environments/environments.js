const CM_BEARER = "";
const ADMIN_CONSOLE_BEARER = "";
const ORG = "";

const getAdminHeaders = () => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return headers;
}

const validateUser = () => {
    var inputVal = document.getElementById("add-user-input").value;

    const headersObj = getAdminHeaders();
    
    let getUserInfo = ``

    fetch(getUserInfo, {
        method: "get",
        headers: headersObj
  
      })
      .then(response => response.json())
      .then(json => {
        alert(JSON.stringify(json));
      }).catch(error => console.log('JSON response error  : ' + error.message));
}

const AddUserToAdmin = () => {
    var inputVal = document.getElementById("add-user-input").value;

    alert(`Adding user ${inputVal}`);

    const addUrl = "";
    const headersObj = getAdminHeaders();
    
    let getUserInfo = ``

    fetch(getUserInfo, {
        method: "get",
        headers: headersObj
  
      })
      .then(response => response.json())
      .then(json => {
        //alert(json[0].id);
        let userId = json[0].id;
        fetch(addUrl, {
            method: 'PATCH',
            body: "",
            headers: headersObj,
            })
            .then((response) => response.json())
            .then((json) => console.log(json));
      }).catch(error => console.log('JSON response error  : ' + error.message));


}

const removeUserFromAdmin = (userId) => {
    const removeUrl = "";
    const headersObj = getAdminHeaders();

    fetch(removeUrl, {
        method: 'PATCH',
        body: "",
        headers: headersObj,
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

let makeAdminTable = (arr) => {
    let adminDiv = document.getElementById("admin-user-div")
    if(!!adminDiv) {
        adminDiv.innerHTML = "";
    } else {
        adminDiv = document.createElement('div');
        adminDiv.id = "admin-user-div"
    }

    adminDiv.innerHTML = `<h3 class="admin-header">Admin Users</h3>`;

    const addUserDiv = document.createElement('div');
    addUserDiv.id = "add-user-div";
    addUserDiv.innerHTML = `<input id="add-user-input" type="text"></input>`;

    const validateUserButton = document.createElement('button');
    validateUserButton.id="validate-user-button"
    validateUserButton.type = "button";
    validateUserButton.addEventListener('click',validateUser);
    validateUserButton.innerHTML="Validate User";
    addUserDiv.appendChild(validateUserButton);

    const addUserButton = document.createElement('button');
    addUserButton.id="add-user-button"
    addUserButton.type = "button";
    addUserButton.addEventListener('click',AddUserToAdmin);
    addUserButton.innerHTML="Add User";
    addUserDiv.appendChild(addUserButton);

    adminDiv.appendChild(addUserDiv);

    let table = document.createElement('table');
    table.id = "admin-user-table";
    table.innerHTML = `<tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Type</th>
                        <th>Email</th>
                        <th>Id</th>
                        <th>Action</th>
                       </tr>`;

    for (let entry of arr) {
      let row = document.createElement('tr');
      let data = document.createElement('td');
      data.appendChild(document.createTextNode(entry.firstName));
      row.appendChild(data);
      data = document.createElement('td');
      data.appendChild(document.createTextNode(entry.lastName));
      row.appendChild(data);
      data = document.createElement('td');
      data.appendChild(document.createTextNode(entry.type));
      row.appendChild(data);
      data = document.createElement('td');
      data.appendChild(document.createTextNode(entry.email));
      row.appendChild(data);
      data = document.createElement('td');
      data.appendChild(document.createTextNode(entry.id));
      row.appendChild(data);
      const removeUserButton = document.createElement('button');
      removeUserButton.id="remove-user-button"
      removeUserButton.type = "button";
      removeUserButton.addEventListener('click',() => removeUserFromAdmin(entry.id));
      removeUserButton.innerHTML="Delete";
      data = document.createElement('td');
      data.appendChild(removeUserButton);
      row.appendChild(data);
      table.appendChild(row);
    }
    let resultSection = document.getElementById('envResults')
    adminDiv.appendChild(table);
    resultSection.appendChild(adminDiv);
    return table;
}


const getEnvAdminUsers = (url) => {
    let headers = new Headers();
    let environmentArray = [];

    headers.append('Content-Type', 'application/json');

    fetch(url, {
      method: "get",
      headers: headers

    })
    .then(response => response.json())
    .then(json => {
        let firstVal = environmentArray = json[0];
        let groupId = firstVal.id;
        let partialUrl = url.split('?')[0];
        let adminUrl = `${partialUrl}${groupId}/users`;
        fetch(adminUrl, {
            method: "get",
            headers: headers
      
          })
          .then(response => response.json())
          .then(json => {
            let abc = json;
            makeAdminTable(json);
          }).catch(error => console.log('JSON response error  : ' + error.message));
    }).catch(error => console.log('JSON response error  : ' + error.message));
}

const makeAdminConsoleButton = (value) => {
    const link = document.createElement('a');
    const stringValue = value.textContent;
    let id = stringValue.split("").pop().split('')[0];
    //console.log(id)
    let org = stringValue.split("").pop().split('')[0];
    //console.log(org)
    link.id=id;
    link.appendChild(document.createTextNode(id));
    link.href="#"
    link.addEventListener('click',() => getEnvAdminUsers(``));
    link.className=org;
    return link;
}

let makeTable = (arr) => {
    let table = document.createElement('table');
    table.id = "environemnt-table";
    //table.caption = "Environment List";
    table.innerHTML = `<tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>TYPE</th>
                        <th>STATUS</th>
                        <th>ADMIN LINK</th>
                       </tr>`;
                 
    for (let entry of arr) {
      let row = document.createElement('tr');
      let data = document.createElement('td');
      data.appendChild(document.createTextNode(entry.id));
      row.appendChild(data);
      data = document.createElement('td');
      data.appendChild(document.createTextNode(entry.name));
      row.appendChild(data);
      data = document.createElement('td');
      data.appendChild(document.createTextNode(entry.type));
      row.appendChild(data);
      data = document.createElement('td');
      data.appendChild(document.createTextNode(entry.status));
      row.appendChild(data);
      data = document.createElement('td');
      data.appendChild(makeAdminConsoleButton(document.createTextNode(entry._links[''].href)));
      row.appendChild(data);
      table.appendChild(row);
    }
    let resultSection = document.getElementById('envResults')
    resultSection.appendChild(table);
    return table;
}

const getEnvironments = () => {
    let headers = new Headers();
    let environmentArray = [];

    headers.append('Content-Type', 'application/json');

    fetch('', {
      method: "get",
      headers: headers

    })
    .then(response => response.json())
    .then(json => {
        environmentArray = json._embedded.environments;
        makeTable(environmentArray);
    }).catch(error => console.log('JSON response error  : ' + error.message));
}

export default async function decorate(block) {
    let firstRow = block.querySelector('div');
    let button = firstRow.querySelector('a');
    button.id = 'getenvironments';
    button.addEventListener('click',getEnvironments);
    [...block.children].forEach((row, index) => {
        if(index == 1) {
            row.id = 'envResults';
        }
    });
}