import { drawList, tasks } from './data';

const bsModal = document.getElementById('taskModal');
const bsCollapse = document.getElementById('collapseNewProject');

const addProject = (collapse, def = false) => {
  const input = document.querySelector('#newProjectForm');
  const projects = document.querySelector('#projectsList');
  let projectTitle = input.value;

  // eslint-disable-next-line eqeqeq
  if (!input.value == '' || def === true) {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const project = document.getElementById('project');
    console.log(project);

    li.classList.add('nav-item');
    anchor.classList.add('nav-link', 'text-white');
    anchor.setAttribute('role', 'button');
    li.appendChild(anchor);
    projects.insertBefore(li, projects.lastElementChild);

    if (def === true) {
      anchor.textContent = 'Default';
      projectTitle = 'Default';
    } else {
      const option = document.createElement('option');
      option.setAttribute('value', projectTitle);
      option.textContent = projectTitle;
      project.appendChild(option);
      anchor.textContent = projectTitle;
      input.value = '';
      collapse.hide();
    }

    anchor.addEventListener('click', () => { drawList(projectTitle); });
  }
};

const addAlert = (parent) => {
  window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
  const alert = document.createElement('div');
  alert.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
  alert.setAttribute('role', 'alert');
  alert.setAttribute('id', 'blankAlert');
  alert.textContent = 'Please fill in the blank fields';
  const btn = document.createElement('button');
  btn.classList.add('btn-close');
  btn.setAttribute('data-bs-dismiss', 'alert');
  btn.setAttribute('type', 'button');

  const bsAlert = new bootstrap.Alert(alert);


  parent.insertBefore(alert, parent.firstChild);
  alert.appendChild(btn);
  setTimeout(() => { bsAlert.close(); }, 5000);
};

function rename(title) {
  const header = document.getElementById('projectTitle');
  header.textContent = title;
}

function clearTasks() {
  const taskList = document.getElementById('tasksContainer');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.lastChild);
  }
}

function drawTask(task, index) {
  const taskList = document.getElementById('tasksContainer');
  const label = document.createElement('label');
  label.classList.add('control', 'control-checkbox', 'mx-5', 'mb-4');
  const infoCont = document.createElement('div');
  infoCont.classList.add('row', 'justify-content-between');
  label.appendChild(infoCont);
  const title = document.createElement('div');
  title.classList.add('col-5');
  title.textContent = task.title;
  const priority = document.createElement('div');
  priority.classList.add('col-auto');
  const prioritySpan = document.createElement('span');
  prioritySpan.classList.add('badge');
  prioritySpan.textContent = task.priority;
  switch (task.priority) {
    case 'low':
      prioritySpan.classList.add('bg-success');
      break;
    case 'medium':
      prioritySpan.classList.add('bg-warning');
      break;
    case 'high':
      prioritySpan.classList.add('bg-danger');
      break;
    default:
      prioritySpan.classList.add('bg-success');
  }
  priority.appendChild(prioritySpan);
  const date = document.createElement('div');
  date.classList.add('col-auto');
  date.textContent = task.date;
  infoCont.appendChild(title);
  infoCont.appendChild(priority);
  infoCont.appendChild(date);

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  label.appendChild(input);
  const control = document.createElement('div');
  control.classList.add('control_indicator');
  label.appendChild(control);
  taskList.appendChild(label);
  input.setAttribute('data-index', index)
  input.addEventListener('change', (e) => {
    tasks.splice(e.target.dataset.index, 1);
    drawList(document.getElementById('projectTitle').textContent);
  });
}

export {
  addProject, bsModal, bsCollapse, addAlert, rename, clearTasks, drawTask,
};