const projectsListText = {
    p1: "Her Project",
    p2: "His Project",
    p3: "Their Project",
    p4: "Our Project",
    p5: "My Project"
}


const titles = {
    'projects-title': {
        position: "left",
        image: "./img/folders-multiple.svg",
        alt: "multiple folders icon",
        'text-class': "projects-title-text",
        text: "Projects"

    },
    'each-task-title': {
        position: "right",
        image: "./img/calendar-check.svg",
        alt: "calendar with check mark icon",
        text: "Task"
    }
}


const buttons = {
    'new-project': {
        position: "left",
        id: "new-project",
        text: "+ New Project"
    },
    'delete-project': {
        position: "left",
        id: "delete-project",
        text: "Delete Project"
    },
    'new-task': {
        position: "middle",
        id: "new-task",
        text: "+ New Task"
    },
    'save-task': {
        position: "right",
        id: "save-task",
        text: "Save"
    },
    'delete-task': {
        position: "right",
        id: "delete-task",
        text: "Delete Task"
    }
}


const projectsListAttributes =  {
    image: "./img/arrow-right.svg",
    alt: "arrow pointing right"
}
 

const newProjectFieldAttributes = {
    for: "add-new-project",
    type: "text",
    id: "add-new-project",
    placeholder: "+ New Project"
}


const Project1 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Her Project"
    },
    '0': {
        'task-edit': "Edit",
        'task-title': "Task 1 Title",
        'task-description': "Diam maecenas ultricies mi eget mauris pharetra et. Aliquam vestibulum morbi blandit cursus risus at ultrices.",
        'task-duedate': "12/06/2023",
        'priority-level': "high",
        'status': "In Progress"
    },
    '1': {
        'task-edit': "Edit",
        'task-title': "Task 2 Title",
        'task-description': "In fermentum et sollicitudin ac orci phasellus. Risus feugiat in ante metus dictum.",
        'task-duedate': "12/15/2023",
        'priority-level': "medium",
        'status': "Complete"
    },
    '2': {
        'task-edit': "Edit",
        'task-title': "Task 3 Title",
        'task-description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        'task-duedate': "12/18/2023",
        'priority-level': "medium",
        'status': "In Progress"
    },
    '3': {
        'task-edit': "Edit",
        'task-title': "Task 4 Title",
        'task-description': "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        'task-duedate': "01/04/2024",
        'priority-level': "low",
        'status': "Not Started"
    }
}


const Project2 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "His Project"
    },
    '0': {
        'task-edit': "Edit",
        'task-title': "Task 1 Title",
        'task-description': "Diam maecenas ultricies mi eget mauris pharetra et. Aliquam vestibulum morbi blandit cursus risus at ultrices.",
        'task-duedate': "12/06/2023",
        'priority-level': "high",
        'status': "In Progress"
    },
    '1': {
        'task-edit': "Edit",
        'task-title': "Task 2 Title",
        'task-description': "In fermentum et sollicitudin ac orci phasellus. Risus feugiat in ante metus dictum.",
        'task-duedate': "12/15/2023",
        'priority-level': "medium",
        'status': "Complete"
    },
    '2': {
        'task-edit': "Edit",
        'task-title': "Task 3 Title",
        'task-description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        'task-duedate': "12/18/2023",
        'priority-level': "medium",
        'status': "In Progress"
    }
}


const Project3 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Their Project"
    },
    '0': {
        'task-edit': "Edit",
        'task-title': "Task 1 Title",
        'task-description': "Diam maecenas ultricies mi eget mauris pharetra et. Aliquam vestibulum morbi blandit cursus risus at ultrices.",
        'task-duedate': "12/06/2023",
        'priority-level': "high",
        'status': "In Progress"
    },
    '1': {
        'task-edit': "Edit",
        'task-title': "Task 2 Title",
        'task-description': "In fermentum et sollicitudin ac orci phasellus. Risus feugiat in ante metus dictum.",
        'task-duedate': "12/15/2023",
        'priority-level': "medium",
        'status': "Complete"
    }
}


const Project4 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Our Project"
    },
    '0': {
        'task-edit': "Edit",
        'task-title': "Task 1 Title",
        'task-description': "Diam maecenas ultricies mi eget mauris pharetra et. Aliquam vestibulum morbi blandit cursus risus at ultrices.",
        'task-duedate': "12/06/2023",
        'priority-level': "high",
        'status': "In Progress"
    }
}


const Project5 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "My Project"
    }
}


const projectMapping = {
    Project1: Project1,
    Project2: Project2,
    Project3: Project3,
    Project4: Project4,
    Project5: Project5
}


const firstThreeTaskFields = {
    'task-field': {
        for: "each-task",
        'label-id': "each-task-label",
        'label-text': "Task Title:",
        type: "text",
        'input-id': "each-task"
    },
    'duedate-field': {
        for: "task-duedate",
        'label-id': "task-duedate-label",
        'label-text': "Task Due Date:",
        type: "date",
        'input-id': "task-duedate"

    },
    'description-field': {
        for: "task-description",
        'label-id': "task-description-label",
        'label-text': "Task Description:",
        name: "task-textarea",
        'textarea-id': "task-description"
    }
}


const priorityTaskFieldLabel = {
    'label-id': "task-priority-label",
    'label-text': "Priority:" 
}


const priorityTaskField = {
    input1: {
        type: "radio",
        name: "priority",
        id: "high",
        value: "high",
        for: "high",
        'label-text': "High",
        class: "priority",
        'data-color': "red",
    },
    input2: {
        type: "radio",
        name: "priority",
        id: "medium",
        value: "medium",
        for: "medium",
        'label-text': "Medium",
        class: "priority",
        'data-color': "yellow",

    },
    input3: {
        type: "radio",
        name: "priority",
        id: "low",
        value: "low",
        for: "low",
        'label-text': "Low",
        class: "priority",
        'data-color': "green",

    }
}


const statusTaskField = {
        class: "status-field",
        for: "status-dropdown",
        'label-id': "task-status-label",
        'label-text': "Status:",
        name: "status",
        'select-id': "status-dropdown", 
        options: [
            {
                value: "Not Started",
                text: "Not Started"
            },
            {
                value: "In Progress",
                text: "In Progress",
            },
            {
                value: "Complete",
                text: "Complete"
            }
        ]
}

export { titles, buttons, projectsListText, newProjectFieldAttributes, Project1, Project2, Project3, Project4, Project5, projectMapping, projectsListAttributes, firstThreeTaskFields, priorityTaskFieldLabel, priorityTaskField, statusTaskField };

// // finds the last numeric task id
// function findLastNumericTaskId(projectData) {

//     let lastNumericTaskId;

//     // extracts the keys of the projectData
//     const taskIds = Object.keys(projectData);

//     const containsNumericKeys = taskIds.some(key => /^\d+$/.test(key));

//     if (!containsNumericKeys) {

//         lastNumericTaskId = null;

//         return lastNumericTaskId;
//     } else {

//         // filter keys to remove non-numeric ones, and convert to numbers
//         const numericTaskIds = taskIds.filter(taskId => !isNaN(taskId)).map(Number);

//         // find the max value among numeric keys
//         let lastNumericTaskId = Math.max(...numericTaskIds);

//         return lastNumericTaskId;
//     }
// }

// // data function - updates projectData structure
// function prepareAndCreateTaskInProjectData(projectData, listAttributesData, fieldAttributesData, container) {

//     // collect form input data
//     const inputs = gatherTaskInputs();

//     // creates a structured task object from these inputs
//     const taskData = prepareAndCreateTaskData(inputs, listAttributesData, fieldAttributesData, container);

//     if (taskData) {
//         // if editing an existing task
//         if (editingTaskId !== null) {

//             // updates the corresponding task in project data with the newly created task object
//             projectData[editingTaskId] = taskData;

//             // gets the project key of the project in projectMapping that matches the projectData name
//             let projectKey = findProjectKeyByProjectText(projectData['Project'].text);

//             // let projectMapping = loadDataFromLocalStorage('projectMapping');

//             // updates projectMapping with the lastest projectData under this formatted project name
//             projectMapping[projectKey] = projectData;
    
//             // saveDataToLocalStorage('projectMapping', projectMapping);

//         // if creating a new task
//         } else {

//             // gets a new task id by getting the length of keys in projectData and decrementing by 1
//             let newTaskId = findLastNumericTaskId(projectData);

//             if (newTaskId !== null) {
//                 newTaskId = (Number(newTaskId) + 1).toString();
//             } else {
//                 newTaskId = '0';
//             }

//             // adds the new taskData object to projectData using the new id
//             projectData[newTaskId] = taskData;

//             // gets the project key of the project in projectMapping that matches the projectData name
//             let projectKey = findProjectKeyByProjectText(projectData['Project'].text);

//             // let projectMapping = loadDataFromLocalStorage('projectMapping');

//             // updates projectMapping with the lastest projectData under this formatted project name
//             projectMapping[projectKey] = projectData;

//             // saveDataToLocalStorage('projectMapping', projectMapping);
//         }

//         return projectData;
//     }
// }
