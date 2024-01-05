import { titles, buttons, projectsListText, projectsListAttributes, newProjectFieldAttributes, firstThreeTaskFields, priorityTaskFieldLabel, priorityTaskField, statusTaskField } from './config.js';

import { prepareDate, createAndAppendDate, prepareObjectData, prepareTitleData, createAndAppendTitles, prepareButtonData, createAndAppendButtons, createAndAppendProjectsListAndField, Project1, createAndAppendTasksTitleAndList, prepareThreeTaskFieldsData, preparePriorityTaskFieldData, createAndAppendTaskFields, createAndAppendStatusTaskField, selectProject, createAndAppendTask } from './page_load2.js';

const pageInfo = document.querySelector('div');

pageInfo.id = 'content';

const processedDate = prepareDate();
createAndAppendDate(processedDate, pageInfo);

const processedTitles = prepareObjectData(titles, prepareTitleData);
createAndAppendTitles(processedTitles, pageInfo);

const processedButtons = prepareObjectData(buttons, prepareButtonData);
createAndAppendButtons(processedButtons, pageInfo);

createAndAppendProjectsListAndField(projectsListText, projectsListAttributes, newProjectFieldAttributes, pageInfo);

selectProject(pageInfo);

createAndAppendTasksTitleAndList(Project1, pageInfo);

const processedThreeTaskFields = prepareObjectData(firstThreeTaskFields, prepareThreeTaskFieldsData);
const processedPriorityTaskField = prepareObjectData(priorityTaskField, preparePriorityTaskFieldData)
createAndAppendTaskFields(processedThreeTaskFields, priorityTaskFieldLabel, processedPriorityTaskField, pageInfo);

createAndAppendStatusTaskField(statusTaskField);
