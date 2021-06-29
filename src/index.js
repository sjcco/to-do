import '@fortawesome/fontawesome-free/js/all';
import './main.scss';
import {
  addProject, retrieveLocalStorage, taskModal,
  projectcollapse, clearForm, bsModal, saveToLocalStorage,
} from './modules/dom';
import {
  createTask, drawList, updateTask, projects, drawProjects,
} from './modules/data';

window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

addProject(projectcollapse, true);
retrieveLocalStorage();
drawList('Default');
drawProjects();


document.querySelector('#taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (hidden.value === 'create') {// eslint-disable-line
    createTask(taskModal);
  } else {
    updateTask(taskModal);
  }
});
document.querySelector('#addTask').onclick = () => { document.getElementById('hidden').value = 'create'; };
document.querySelector('#newProjectBtn').onclick = () => {
  projects.push(document.querySelector('#newProjectForm').value);
  saveToLocalStorage();
  addProject(projectcollapse);
};
document.querySelector('#cancelProjectBtn').onclick = () => {
  document.getElementById('newProjectForm').value = '';
  projectcollapse.hide();
};
document.getElementById('today').onclick = () => { drawList('Today'); };
document.getElementById('upcoming').onclick = () => { drawList('Upcoming'); };
bsModal.addEventListener('hidden.bs.modal', () => { clearForm(); });