const projectsListText = {
    p1: "Project 1",
    p2: "Project 2",
    p3: "Project 3",
    p4: "Project 4",
    p5: "Project 5",
    p6: "Project 6",
    p7: "Project 7",
    p8: "Project 8",
    p9: "Project 9"
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
    'new-task': {
        position: "middle",
        id: "new-task",
        text: "+ New Task"
    },
    'save-task': {
        position: "right",
        id: "save-task",
        text: "Save"
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
    for: "task-priority",
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

export { titles, buttons, projectsListText, newProjectFieldAttributes, projectsListAttributes, firstThreeTaskFields, priorityTaskFieldLabel, priorityTaskField, statusTaskField };

