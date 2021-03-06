// eslint-disable-next-line import/no-cycle
import {
  addAlert, rename, clearTasks, drawTask, saveToLocalStorage, addProject,
} from './dom';

const tasks = [];

const projects = [];

const task = (title, project, priority, date) => ({
  title, project, priority, date,
});

const drawList = (title) => {
  rename(title);
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
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
};

const drawProjects = (collapse) => {
  projects.forEach(element => {
    addProject(collapse, true, element);
  });
};

const createTask = (modal) => {
  if (title.value == '' || date.value == '') {// eslint-disable-line
    addAlert(document.querySelector('.modal-body'));
  } else {
    const newTask = task(title.value, project.value, priority.value, date.value);// eslint-disable-line
    tasks.push(newTask);
    saveToLocalStorage();
    drawList(project.value);// eslint-disable-line
    title.value = '';// eslint-disable-line
    project.value = 'Default';// eslint-disable-line
    priority.value = 'low';// eslint-disable-line
    date.value = '';// eslint-disable-line
    modal.hide();
  }
};

const updateTask = (modal) => {
  tasks[hidden.value].title = title.value;// eslint-disable-line
  tasks[hidden.value].project = project.value;// eslint-disable-line
  tasks[hidden.value].priority = priority.value;// eslint-disable-line
  tasks[hidden.value].date = date.value;// eslint-disable-line
  saveToLocalStorage();
  drawList(project.value);// eslint-disable-line
  modal.hide();
};

export {
  task, tasks, createTask, drawList, updateTask, projects, drawProjects,
};