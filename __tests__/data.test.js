/**
 * @jest-environment jsdom
 */

test('draw list of tasks in project', () => {
  const rename = jest.fn();
  const drawTask = jest.fn();
  const clearTasks = jest.fn();
  const tasks = [{ project: 'title' }];
  const mockdrawList = jest.fn((title) => {
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
  });

  mockdrawList('title');
  expect(rename).toHaveBeenCalledTimes(1);
  expect(clearTasks).toHaveBeenCalledTimes(1);
  expect(drawTask).toHaveBeenCalledTimes(1);
});

it('Draws list of projects in collapse menu', () => {
  document.body.innerHTML = `
  <div class="container"></div>`;
  const projects = ['example1', 'example2'];
  const addProject = jest.fn();
  const collapse = document.getElementById('container');
  const mockdrawProjects = jest.fn().mockImplementation((collapse) => {
    projects.forEach(element => {
      addProject(collapse, true, element);
    });
  });
  mockdrawProjects(collapse);
  expect(addProject).toHaveBeenCalledTimes(2);
});