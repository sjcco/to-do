import jQuery from 'jquery';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
// eslint-disable-next-line import/no-cycle
import { drawList, projects, tasks } from './data';

window.$ = window.jQuery = jQuery;// eslint-disable-line 

const bsModal = document.getElementById('taskModal');
const bsCollapse = document.getElementById('collapseNewProject');

const taskModal = () => new bootstrap.Modal(bsModal, { focus: false });
const projectCollapse = () => new bootstrap.Collapse(bsCollapse, { toggle: false });

const addProject = (collapse, def = false, elem = '') => {
  const input = document.querySelector('#newProjectForm');
  const projects = document.querySelector('#projectsList');
  let projectTitle = input.value;

  // eslint-disable-next-line eqeqeq
  if (!input.value == '' || def === true) {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const project = document.getElementById('project');

    li.classList.add('nav-item');
    anchor.classList.add('nav-link', 'text-white');
    anchor.setAttribute('role', 'button');
    li.appendChild(anchor);
    projects.insertBefore(li, projects.lastElementChild);

    if (def === true) {
      anchor.textContent = 'Default';
      projectTitle = 'Default';
      if (elem !== '') {
        anchor.textContent = elem;
        projectTitle = elem;
        const option = document.createElement('option');
        option.setAttribute('value', elem);
        option.textContent = elem;
        project.appendChild(option);
        anchor.textContent = elem;
      }
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

const rename = (title) => {
  const header = document.getElementById('projectTitle');
  header.textContent = title;
};

const clearTasks = () => {
  const taskList = document.getElementById('tasksContainer');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.lastChild);
  }
};

const saveToLocalStorage = () => {
  localStorage.clear();
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('projects', JSON.stringify(projects));
};

const retrieveLocalStorage = () => {
  if (localStorage.tasks) {
    const arr = JSON.parse(localStorage.getItem('tasks'));
    arr.forEach(element => {
      tasks.push(element);
    });
  }
  if (localStorage.projects) {
    const arr2 = JSON.parse(localStorage.getItem('projects'));
    arr2.forEach(element => {
      projects.push(element);
    });
  }
};

const fillForm = (index) => {
  document.getElementById('title').value = tasks[index].title;
  document.getElementById('project').value = tasks[index].project;
  document.getElementById('priority').value = tasks[index].priority;
  document.getElementById('date').value = tasks[index].date;
};

const clearForm = () => {
  document.getElementById('title').value = '';
  document.getElementById('project').value = 'Default';
  document.getElementById('priority').value = 'low';
  document.getElementById('date').value = '';
};

const drawTask = (task, index) => {
  const taskList = document.getElementById('tasksContainer');
  const label = document.createElement('label');
  label.classList.add('control', 'control-checkbox');
  const infoCont = document.createElement('div');
  infoCont.classList.add('row', 'justify-content-between');
  label.appendChild(infoCont);
  const title = document.createElement('div');
  title.classList.add('col-5', 'ps-4');
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
  const editcont = document.createElement('div');
  editcont.classList.add('col-auto');
  const editAnchor = document.createElement('a');
  editAnchor.classList.add('text-decoration-none');
  editAnchor.setAttribute('role', 'button');
  const edit = document.createElement('i');
  edit.classList.add('fas', 'fa-edit');
  editAnchor.appendChild(edit);
  editcont.appendChild(editAnchor);
  date.textContent = task.date;
  infoCont.appendChild(title);
  infoCont.appendChild(priority);
  infoCont.appendChild(date);

  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  label.appendChild(input);
  const control = document.createElement('div');
  control.classList.add('control_indicator', 'px-1');
  label.appendChild(control);
  const todoCont = document.createElement('div');
  todoCont.classList.add('row', 'justify-content-center');
  label.classList.add('col-10');
  taskList.appendChild(todoCont);
  todoCont.appendChild(label);
  todoCont.appendChild(editcont);
  input.setAttribute('data-index', index);
  editAnchor.setAttribute('data-index', index);
  editAnchor.addEventListener('click', (e) => {
    document.getElementById('hidden').value = e.target.closest('a').dataset.index;
    fillForm(e.target.closest('a').dataset.index);
    $('#taskModal').modal('show');// eslint-disable-line
  });
  input.addEventListener('change', (e) => {
    tasks.splice(e.target.dataset.index, 1);
    saveToLocalStorage();
    drawList(document.getElementById('projectTitle').textContent);
  });
};

export {
  addProject, bsModal, bsCollapse, addAlert, rename,
  clearTasks, drawTask, saveToLocalStorage, retrieveLocalStorage,
  taskModal, projectCollapse, clearForm,
};