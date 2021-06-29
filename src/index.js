import '@fortawesome/fontawesome-free/js/all';
import './main.scss';
import { addProject, bsModal, bsCollapse } from './modules/dom';
import {
  createTask, drawList,
} from './modules/data';

window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

// eslint-disable-next-line no-undef
const taskModal = new bootstrap.Modal(bsModal, { focus: false });
// eslint-disable-next-line no-undef
const projectcollapse = new bootstrap.Collapse(bsCollapse, { toggle: false });


addProject(projectcollapse, true);

document.querySelector('#taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  createTask(taskModal);
});
document.querySelector('#newProjectBtn').onclick = () => { addProject(projectcollapse); };
document.querySelector('#cancelProjectBtn').onclick = () => {
  document.getElementById('newProjectForm').value = '';
  projectcollapse.hide();
};
document.getElementById('today').onclick = () => { drawList('Today'); };
document.getElementById('upcoming').onclick = () => { drawList('Upcoming'); };