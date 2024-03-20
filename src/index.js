import { titles, buttons, projectsListText, projectsListAttributes, newProjectFieldAttributes, firstThreeTaskFields, priorityTaskFieldLabel, priorityTaskField, statusTaskField, projectMapping } from './config.js';

import { prepareDate, createAndAppendDate, prepareObjectData, prepareTitleData, createAndAppendTitles, prepareButtonData, createAndAppendButtons, createAndAppendProjectsListAndField, createAndAppendTasksTitleAndList, prepareThreeTaskFieldsData, preparePriorityTaskFieldData, createAndAppendTaskFields, createAndAppendStatusTaskField, selectProject } from './page_load2.js';

// selects the only div element in index.html
let pageInfo = document.querySelector('div');

// assigns the div an id of content
pageInfo.id = 'content';

/* DATE 
   creates an element for a localized date string that was converted from a Date object, and appends it to the 'content' div */
const processedDate = prepareDate();
createAndAppendDate(processedDate, pageInfo);

/* LEFT PANE TITLE AND RIGHT PANE TITLE (RIGHT PANE TITLE IS INITIALLY HIDDEN)
   creates elements for two processed titles data that is in an array and appends them to the 'content' div */
const processedTitles = prepareObjectData(titles, prepareTitleData);
createAndAppendTitles(processedTitles, pageInfo);

/* NEW PROJECT, NEW TASK, AND SAVE BUTTONS (SAVE BUTTON IS INITIALLY HIDDEN)
   creates elements for processed buttons data and appends them to the 'content' div */
let processedButtons = prepareObjectData(buttons, prepareButtonData);
createAndAppendButtons(processedButtons, pageInfo);

// PROJECTS LIST AND NEW PROJECT FIELD ON LEFT PANE
createAndAppendProjectsListAndField(projectsListText, projectsListAttributes, newProjectFieldAttributes, pageInfo);

// TASKS TITLE AND LIST ON MIDDLE PANE
createAndAppendTasksTitleAndList(projectMapping['Project1'], pageInfo);

const processedThreeTaskFields = prepareObjectData(firstThreeTaskFields, prepareThreeTaskFieldsData);
const processedPriorityTaskField = prepareObjectData(priorityTaskField, preparePriorityTaskFieldData)
createAndAppendTaskFields(processedThreeTaskFields, priorityTaskFieldLabel, processedPriorityTaskField, pageInfo);

createAndAppendStatusTaskField(statusTaskField);

/* ADDS EVENT LISTENER TO EACH PROJECT NAME AND CHANGES TASKS TITLE AND LIST ON MIDDLE PANE */
selectProject(pageInfo, projectsListText, projectMapping);

/* CURRENT ISSUES: 

     NEWLY ADDED PROJECTS DO NOT BECOME SELECTABLE PROJECTS     
   X SEQUENCE OF EDIT BUTTON CLICK AND SAVE BUTTON CLICK, CREATES NEW TASK INSTEAD OF SAVING EDITTED TASK 
     FIX EXECUTION OF NEW PROJECT CLICK WHEN NO NEW PROJECT INPUT */