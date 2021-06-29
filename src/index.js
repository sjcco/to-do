import '@fortawesome/fontawesome-free/js/all';
import './main.scss';
import { addProject, bsModal, bsCollapse } from './modules/dom';
import { task, tasks, createTask, drawList } from './modules/data';

window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
  var  today1 = yyyy + '-' + mm + '-' + dd;

    dd = String(today.getDate()+1).padStart(2, 0);
    var tomorrow = yyyy + '-' + mm + '-' + dd;
    console.log(today1);
    console.log(tomorrow);
    console.log(tomorrow < today1);

const taskModal = new bootstrap.Modal(bsModal, { focus: false });
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