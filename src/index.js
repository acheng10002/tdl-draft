import { titles, buttons, projectsListAttributes, newProjectFieldAttributes, firstThreeTaskFields, priorityTaskFieldLabel, priorityTaskField, statusTaskField } from './config.js';

import { initializeProjectData, loadDataFromLocalStorage, prepareAndCreateDate, appendDate, prepareAndCreateObjectData, prepareAndCreateTitleData, appendTitles, prepareAndCreateButtonData, appendButtons, appendProjectsListAndField, appendTasksTitleAndList, prepareAndCreateThreeTaskFieldsData, prepareAndCreatePriorityTaskFieldData, appendTaskFields, appendStatusTaskField } from './page_load2.js';

initializeProjectData();

let projectMapping = loadDataFromLocalStorage('projectMapping');

// selects the only div element in index.html
let pageInfo = document.querySelector('div');

// assigns the div an id of content
pageInfo.id = 'content';

/* DATE 
   creates an element for a localized date string that was converted from a Date object, and appends it to the 'content' div */
const processedDate = prepareAndCreateDate();
appendDate(processedDate, pageInfo);

/* LEFT PANE TITLE AND RIGHT PANE TITLE (RIGHT PANE TITLE IS INITIALLY HIDDEN)
   creates elements for two processed titles data that is in an array and appends them to the 'content' div */
const processedTitles = prepareAndCreateObjectData(titles, prepareAndCreateTitleData);
appendTitles(processedTitles, pageInfo);

/* NEW PROJECT, NEW TASK, AND SAVE BUTTONS (SAVE BUTTON IS INITIALLY HIDDEN)
   creates elements for processed buttons data and appends them to the 'content' div */
let processedButtons = prepareAndCreateObjectData(buttons, prepareAndCreateButtonData);
appendButtons(processedButtons, projectsListAttributes, newProjectFieldAttributes, pageInfo);

// PROJECTS LIST AND NEW PROJECT FIELD ON LEFT PANE
appendProjectsListAndField(projectsListAttributes, newProjectFieldAttributes, pageInfo);

// TASKS TITLE AND LIST ON MIDDLE PANE
appendTasksTitleAndList(projectMapping['Project1'], projectsListAttributes, newProjectFieldAttributes, pageInfo);

// TASK FIELDS ON RIGHT PANE
const processedThreeTaskFields = prepareAndCreateObjectData(firstThreeTaskFields, prepareAndCreateThreeTaskFieldsData);
const processedPriorityTaskField = prepareAndCreateObjectData(priorityTaskField, prepareAndCreatePriorityTaskFieldData);
appendTaskFields(processedThreeTaskFields, priorityTaskFieldLabel, processedPriorityTaskField, pageInfo);

appendStatusTaskField(statusTaskField);

/* CURRENT ISSUES
*/