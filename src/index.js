import { titles, buttons, projectsListText, projectsListAttributes, newProjectFieldAttributes, firstThreeTaskFields, priorityTaskFieldLabel, priorityTaskField, statusTaskField, projectMapping } from './config.js';

import { prepareAndCreateDate, appendDate, prepareAndCreateObjectData, prepareAndCreateTitleData, appendTitles, prepareAndCreateButtonData, appendButtons, createAndAppendProjectsListAndField, createAndAppendTasksTitleAndList, prepareThreeTaskFieldsData, preparePriorityTaskFieldData, createAndAppendTaskFields, createAndAppendStatusTaskField, selectProject } from './page_load2.js';

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
appendButtons(processedButtons, pageInfo);

// PROJECTS LIST AND NEW PROJECT FIELD ON LEFT PANE
createAndAppendProjectsListAndField(projectsListText, projectsListAttributes, newProjectFieldAttributes, pageInfo);

// TASKS TITLE AND LIST ON MIDDLE PANE
createAndAppendTasksTitleAndList(projectMapping['Project1'], pageInfo);

const processedThreeTaskFields = prepareAndCreateObjectData(firstThreeTaskFields, prepareThreeTaskFieldsData);
const processedPriorityTaskField = prepareAndCreateObjectData(priorityTaskField, preparePriorityTaskFieldData)
createAndAppendTaskFields(processedThreeTaskFields, priorityTaskFieldLabel, processedPriorityTaskField, pageInfo);

createAndAppendStatusTaskField(statusTaskField);

/* ADDS EVENT LISTENER TO EACH PROJECT NAME AND CHANGES TASKS TITLE AND LIST ON MIDDLE PANE */
selectProject(pageInfo, projectsListText, projectMapping);

/* CURRENT ISSUES: 

    NEED DELETE BUTTON FOR PROJECTS AND DELETE BUTTON FOR TASKS

     X NEWLY ADDED PROJECTS DO NOT BECOME SELECTABLE PROJECTS */
