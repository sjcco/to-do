import '@fortawesome/fontawesome-free/js/all';
import './main.scss';
import { 
  addProject, retrieveLocalStorage, taskModal, projectcollapse, clearForm, bsModal } from './modules/dom';
import { createTask, drawList, updateTask } from './modules/data';

window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');


let stuff = document.getElementById('content');
let button = document.createElement('button');
button.textContent = 'open modal';
button.addEventListener('click', () => { taskModal.show(); });
stuff.appendChild(button);

addProject(projectcollapse, true);
retrieveLocalStorage();
drawList('Default');


document.querySelector('#taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(hidden.value);
  if (hidden.value === 'create') {
    createTask(taskModal);
  } else {
    updateTask(taskModal);
  }
  
});
document.querySelector('#addTask').onclick = () => { document.getElementById('hidden').value = 'create'; };
document.querySelector('#newProjectBtn').onclick = () => { addProject(projectcollapse); };
document.querySelector('#cancelProjectBtn').onclick = () => {
  document.getElementById('newProjectForm').value = '';
  projectcollapse.hide();
};
document.getElementById('today').onclick = () => { drawList('Today'); };
document.getElementById('upcoming').onclick = () => { drawList('Upcoming'); };
bsModal.addEventListener('hidden.bs.modal', () => { clearForm(); });