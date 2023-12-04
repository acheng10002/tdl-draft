import { titles, buttons, projectsListText, projectsListAttributes, newProjectFieldAttributes, Project1, firstThreeTaskFields, priorityTaskFieldLabel, priorityTaskField, statusTaskField } from './config.js';

import { prepareDate, createAndAppendDate, prepareObjectData, prepareTitleData, createAndAppendTitles, prepareButtonData, createAndAppendButtons, createAndAppendProjectsListAndField, createAndAppendTasksTitleAndList, prepareThreeTaskFieldsData, preparePriorityTaskFieldData, createAndAppendTaskFields, createAndAppendStatusTaskField, switchStylesheet } from './page_load2.js';

const pageInfo = document.querySelector('div');

pageInfo.id = 'content';

const processedDate = prepareDate();
createAndAppendDate(processedDate, pageInfo);

const processedTitles = prepareObjectData(titles, prepareTitleData);
createAndAppendTitles(processedTitles, pageInfo);

createAndAppendProjectsListAndField(projectsListText, projectsListAttributes, newProjectFieldAttributes, pageInfo);

const processedButtons = prepareObjectData(buttons, prepareButtonData);
createAndAppendButtons(processedButtons, pageInfo);

// const processedTasksTitleAndListData = prepareObjectData(Project1, prepareTasksTitleAndListData);
createAndAppendTasksTitleAndList(Project1,pageInfo);

const processedThreeTaskFields = prepareObjectData(firstThreeTaskFields, prepareThreeTaskFieldsData);
const processedPriorityTaskField = prepareObjectData(priorityTaskField, preparePriorityTaskFieldData)
createAndAppendTaskFields(processedThreeTaskFields, priorityTaskFieldLabel, processedPriorityTaskField, pageInfo);

createAndAppendStatusTaskField(statusTaskField);

var taskEditDivs = document.getElementsByClassName('task-edit');

Array.from(taskEditDivs).forEach(function(div) {
    div.addEventListener('click', switchStylesheet)
});

var newTaskButton = document.getElementById('new-task');

newTaskButton.addEventListener('click', switchStylesheet);

// document.getElementsByClassName('task-edit').addEventListener('click', function() {
//     var stylesheet = document.getElementById('stylesheetToSwitch');
//     if (stylesheet.href.endsWith('style2.css')) {
//         stylesheet.href = 'style.css';
//     } else {
//         stylesheet.href = 'style2.css';
//     }

//     window.location.reload();
// });

/* import { titles, buttons, projectsListText, fieldAtts, projectsListAtts, project1Tasks, threeTaskFields, labelTaskField, oneTaskField } from './config.js';

import { prepareDate, createAndAppendDate, prepareTitleData, createAndAppendTitles, prepareButtonData, createAndAppendButtons, prepareProjectsListData, prepareFieldAttributesData, createAndAppendProjectsListAndField, prepareTasksListData, createAndAppendTasksList, prepareThreeTaskFieldsData, prepareOneTaskFieldData, createAndAppendTaskFields } from './page_load.js';

const pageInfo = document.querySelector('div');

pageInfo.id = 'content';

const processedDate = prepareDate();
createAndAppendDate(processedDate, pageInfo);

const processedTitles = prepareTitleData(titles);
createAndAppendTitles(processedTitles, pageInfo);

const processedProjectsList = prepareProjectsListData(projectsListText);
const processedFieldAtts = prepareFieldAttributesData(fieldAtts);
createAndAppendProjectsListAndField(processedProjectsList, projectsListAtts, processedFieldAtts, pageInfo);

const processedButtons = prepareButtonData(buttons);
createAndAppendButtons(processedButtons, pageInfo);

const processedTasksListData = prepareTasksListData(project1Tasks);
createAndAppendTasksList(processedTasksListData, pageInfo);

const processedThreeTaskFields = prepareThreeTaskFieldsData(threeTaskFields);
const processedOneTaskField = prepareOneTaskFieldData(oneTaskField)
createAndAppendTaskFields(processedThreeTaskFields, labelTaskField, processedOneTaskField, pageInfo); */




