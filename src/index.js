import { titles, buttons, projectsListText, projectsListAttributes, newProjectFieldAttributes, firstThreeTaskFields, priorityTaskFieldLabel, priorityTaskField, statusTaskField, Project1, Project2, Project3, Project4, Project5 } from './config.js';

import { prepareDate, createAndAppendDate, prepareObjectData, prepareTitleData, createAndAppendTitles, prepareButtonData, createAndAppendButtons, createAndAppendProjectsListAndField, createAndAppendTasksTitleAndList, prepareThreeTaskFieldsData, preparePriorityTaskFieldData, createAndAppendTaskFields, createAndAppendStatusTaskField, selectProject } from './page_load2.js';

// selects the only div element in index.html
let pageInfo = document.querySelector('div');

// assigns the div an id of content
pageInfo.id = 'content';

/* DATE 
   creates an element for a localized date string that was converted from a Date object,
   and appends it to the 'content' div */
const processedDate = prepareDate();
createAndAppendDate(processedDate, pageInfo);

/*  LEFT PANE TITLE AND RIGHT PANE TITLE
    (RIGHT PANE TITLE IS INITIALLY HIDDEN)
   creates elements for processed titles data that is in an array
   and appends them to the 'content' div */
const processedTitles = prepareObjectData(titles, prepareTitleData);
createAndAppendTitles(processedTitles, pageInfo);

/* NEW PROJECT, NEW TASK, AND SAVE BUTTONS
   (SAVE BUTTON IS INITIALLY HIDDEN)
   creates elements for processed buttons data
   and appends them to the 'content' div */
let processedButtons = prepareObjectData(buttons, prepareButtonData);
createAndAppendButtons(processedButtons, Project1, pageInfo);

// PROJECTS LIST AND NEW PROJECT FIELD ON LEFT PANE
createAndAppendProjectsListAndField(projectsListText, projectsListAttributes, newProjectFieldAttributes, pageInfo);

/* ADDS EVENT LISTENER TO EACH PROJECT NAME AND CHANGES TASKS TITLE AND LIST ON MIDDLE PANE */
selectProject(pageInfo);

// TASKS TITLE AND LIST ON MIDDLE PANE
createAndAppendTasksTitleAndList(Project1, pageInfo);


const processedThreeTaskFields = prepareObjectData(firstThreeTaskFields, prepareThreeTaskFieldsData);
const processedPriorityTaskField = prepareObjectData(priorityTaskField, preparePriorityTaskFieldData)
createAndAppendTaskFields(processedThreeTaskFields, priorityTaskFieldLabel, processedPriorityTaskField, pageInfo);

createAndAppendStatusTaskField(statusTaskField);

// projectData = selectProject(pageInfo);

// let test = projectData['Project'];

// console.log(test);

/* selectProject(pageInfo);

let projectData = selectProject(pageInfo);

   createAndAppendTasksTitleAndList(projectData, pageInfo);

   createAndAppendTasksTitleAndList(pageInfo);

   selectProject(pageInfo);
   

   console.log(projectData);
   createAndAppendTasksTitleAndList(projectData, pageInfo);
   selectProject(pageInfo); 
   
   
   CURRENT ISSUES:
   
   NEW TASK ONLY ADDED TO PROJECT 1 TASKS LIST UPON LOAD AND NOT AFTER PROJECT SELECTION 
   NEW TASK ONLY ADDED PROJECT 1 TASKS LIST AND NOT ANY OTHER PROJECT TASKS LIST
   IN PAGELOAD2.JS, PROJECTDATA['PROJECT'] KEEPS BEING UNDEFINED */


