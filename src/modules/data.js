import {
  addProject, bsModal, bsCollapse, addAlert, rename, clearTasks, drawTask
} from './dom';

const tasks = [];

const task = (title, project, priority, date) => ({
  title, project, priority, date,
});

function drawList(title) {
  rename(title);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  clearTasks();

  if (title === 'Today') {    
    tasks.forEach((task, index) => {
      if (task.date === today) {
        drawTask(task, index);
      }
    });
  } else if (title === 'Upcoming') {
    tasks.forEach((task, index) => {
      if (task.date > today) {
        drawTask(task, index);
      }
    });
  } else {
    tasks.forEach((task, index) => {
      if (task.project === title) {
        drawTask(task, index);
      }
    });
  }
}

function createTask(modal) {
  if (title.value == '' || date.value == '') {
    addAlert(document.querySelector('.modal-body'));
  } else {
    // eslint-disable-next-line no-undef
    const newTask = task(title.value, project.value, priority.value, date.value);
    tasks.push(newTask);
    drawList(project.value);
    title.value = '';
    project.value = 'Default';
    priority.value = 'low';
    date.value = '';
    modal.hide();
  }
}

export {
  task, tasks, createTask, drawList,
};