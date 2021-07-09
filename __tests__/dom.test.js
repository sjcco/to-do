/**
 * @jest-environment jsdom
 */

import { addAlert, clearForm } from '../src/modules/dom';

test('Add project', () => {
  document.body.innerHTML = `
  <div class="alertContainer"></div>`;
  const alertContainer = document.body.querySelector('.alertContainer');
  addAlert(alertContainer);
  expect(alertContainer.childElementCount).toBe(1);
  expect(alertContainer.firstElementChild.classList[0]).toBe('alert');
});

test('Clear new task form', () => {
  document.body.innerHTML = `
  <form class="px-5" id="taskForm">
                  <input id="hidden" type="hidden" value="create">
                  <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="title" placeholder="title" value="1">
                    <label for="title">title</label>
                  </div>
                  
                  <div class="row g-2 mb-3">
                    <div class="col-md">
                      <div class="form-floating">
                        <select class="form-select" id="project" aria-label="Floating label select example" value="asdf">
                          <option value='Default' selected>Default</option>
                        </select>
                        <label for="project">projects</label>
                      </div>
                    </div>
                    <div class="col-md">
                      <div class="form-floating">
                        
                        <select class="form-select" id="priority" aria-label="Floating label select example">
                          <option value="low">low</option>
                          <option value="medium" selected>medium</option>
                          <option value="high">High</option>
                        </select>
                        <label for="priority">Priority</label>
                      </div>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text py-3" id="basic-addon1">Date</span>
                    <input type="date" id="date" class="form-control py-3" value="3">
                  </div>
                </form>`;
  clearForm();
  expect(document.getElementById('title').value).toBe('');
  expect(document.getElementById('project').value).toBe('Default');
  expect(document.getElementById('priority').value).toBe('low');
  expect(document.getElementById('date').value).toBe('');
});

test('fill new task form', () => {
  const mockTasks = [{
    title: 'example', project: 'Default', priority: 'high', date: '0',
  }];
  const mockfillForm = jest.fn().mockImplementation((index) => {
    document.getElementById('title').value = mockTasks[index].title;
    document.getElementById('project').value = mockTasks[index].project;
    document.getElementById('priority').value = mockTasks[index].priority;
    document.getElementById('date').value = mockTasks[index].date;
  });
  document.body.innerHTML = `
  <form class="px-5" id="taskForm">
  <input id="hidden" type="hidden" value="create">
                  <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="title" placeholder="title" value="1">
                    <label for="title">title</label>
                  </div>
                  
                  <div class="row g-2 mb-3">
                    <div class="col-md">
                      <div class="form-floating">
                        <select class="form-select" id="project" aria-label="Floating label select example" value="asdf">
                          <option value='Default' selected>Default</option>
                        </select>
                        <label for="project">projects</label>
                      </div>
                    </div>
                    <div class="col-md">
                      <div class="form-floating">
                        
                        <select class="form-select" id="priority" aria-label="Floating label select example">
                          <option value="low">low</option>
                          <option value="medium" selected>medium</option>
                          <option value="high">High</option>
                        </select>
                        <label for="priority">Priority</label>
                      </div>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text py-3" id="basic-addon1">Date</span>
                    <input type="date" id="date" class="form-control py-3" value="3">
                  </div>
                </form>`;
  mockfillForm(0);
  expect(document.getElementById('title').value).toBe('example');
  expect(document.getElementById('project').value).toBe('Default');
  expect(document.getElementById('priority').value).toBe('high');
});