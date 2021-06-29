import {
  addProject, bsModal, bsCollapse, addAlert, rename, clearTasks, drawTask
} from './dom';

const tasks = [];

const task = (title, project, priority, date) => ({
  title, project, priority, date,
});

function drawList(title) {
  rename(title);
  clearTasks();
  tasks.forEach((task, index) => {
    if (task.project === title) {
      drawTask(task, index);
    }
  });
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