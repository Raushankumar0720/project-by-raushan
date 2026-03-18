// Users array (immutable updates only)
let users = [];

// ✅ Add user
function addUser(name, age) {
  users = [...users, { name, age }];
}

// ✅ Remove user
function removeUser(name) {
  users = users.filter(user => user.name !== name);
}

// ✅ Update age
function updateAge(name, age) {
  users = users.map(user =>
    user.name === name ? { ...user, age } : user
  );
}

// ✅ Get users
function getUsers() {
  return users;
}

// Render users in <ul>
function renderUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  getUsers().forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} (${user.age})`;
    list.appendChild(li);
  });
}

// Handlers for buttons
function addUserHandler() {
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);

  if (name && !isNaN(age)) {
    addUser(name, age);
    renderUsers();
  } else {
    alert("Please enter valid name and age!");
  }
}

function removeUserHandler() {
  const name = document.getElementById("name").value.trim();

  if (name) {
    removeUser(name);
    renderUsers();
  } else {
    alert("Please enter a name to remove!");
  }
}

function updateAgeHandler() {
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);

  if (name && !isNaN(age)) {
    updateAge(name, age);
    renderUsers();
  } else {
    alert("Please enter valid name and age to update!");
  }
}

// ✅ Attach event listeners to buttons
document.getElementById("addBtn").addEventListener("click", addUserHandler);
document.getElementById("removeBtn").addEventListener("click", removeUserHandler);
document.getElementById("updateBtn").addEventListener("click", updateAgeHandler);

