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
    // 'project-title': {
    //     position: "middle",
    //     image: "./img/folder-arrow-down.svg",
    //     alt: "arrow pointing right icon",
    //     text: projectsListText[1],
    //     id: "tasks-list-project"
    // },
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


const Project1 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Project 1",
        id: "tasks-list-project"
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
    },
    '4': {
        'task-edit': "Edit",
        'task-title': "Task 5 Title",
        'task-description': "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        'task-duedate': "01/17/2024",
        'priority-level': "high",
        'status': "In Progress"
    },
    '5': {
        'task-edit': "Edit",
        'task-title': "Task 6 Title",
        'task-description': "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        'task-duedate': "01/23/2024",
        'priority-level': "medium",
        'status': "Not Started"
    }
}


const Project2 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Project 2",
        id: "tasks-list-project"
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

const Project3 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Project 3",
        id: "tasks-list-project"
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


const Project4 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Project 4",
        id: "tasks-list-project"
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
    },
    '4': {
        'task-edit': "Edit",
        'task-title': "Task 5 Title",
        'task-description': "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        'task-duedate': "01/17/2024",
        'priority-level': "high",
        'status': "In Progress"
    }
}

const Project5 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Project 5",
        id: "tasks-list-project"
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


const Project6 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Project 6",
        id: "tasks-list-project"
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
    },
    '4': {
        'task-edit': "Edit",
        'task-title': "Task 5 Title",
        'task-description': "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        'task-duedate': "01/17/2024",
        'priority-level': "high",
        'status': "In Progress"
    },
    '5': {
        'task-edit': "Edit",
        'task-title': "Task 6 Title",
        'task-description': "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        'task-duedate': "01/23/2024",
        'priority-level': "medium",
        'status': "Not Started"
    }
}


const Project7 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Project 7",
        id: "tasks-list-project"
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

const Project8 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Project 8",
        id: "tasks-list-project"
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


const Project9 = {
    'Project': {
        position: "middle",
        image: "./img/folder-arrow-down.svg",
        alt: "arrow pointing right icon",
        text: "Project 9",
        id: "tasks-list-project"
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

/* 
formData = {
    'person1': {
        'Name': 'John Doe',
        'Email': 'john.doe@example.com',
        'Comment': 'This is a test comment.',
        'Country': 'USA'
    },
    'person2': {
        'Name': 'Jane Doe',
        'Email': 'john.doe@example.com',
        'Comment': 'This is a test comment.',
        'Country': 'USA'
    },
    'person3': {
        'Name': 'Jack Doe',
        'Email': 'john.doe@example.com',
        'Comment': 'This is a test comment.',
        'Country': 'USA'
    }
}
*/


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

export { titles, buttons, projectsListText, newProjectFieldAttributes, projectsListAttributes, Project1, Project2, Project3, Project4, Project5, Project6, Project7, Project8, Project9, firstThreeTaskFields, priorityTaskFieldLabel, priorityTaskField, statusTaskField };