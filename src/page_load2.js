import {projectMapping, Project1 } from './config.js'

/* returns a localized date string that was converted from a Date object, formatted to a specific locale and options */
function prepareDate() {
    /* 'en-US' specifies locale, which is U.S. English
       {} is an object specifying the formatting options: 
       day of the month will be a number, 
       month will be in its abbreviated form, 
       year will be a number specific to the locale 
       weekday will be in its full form*/
    return new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' });
}


/* utility function that creates HTML elements 
   type is the type of HTML element to be created
   properties is an object containing key-value pairs where keys are property names and 
   values are the values for those properties to be set on the element 
   rest parameter that allows for an indefinite number of arguments representing child elements 
        the rest parameter arguments are treated as an array inside the function */
function createElement(type, properties, ...children) {
    const element = document.createElement(type);
        
    // iterates over each key/property name in the properties object
    for (const key in properties) {
        /* for each key, set the corresponding property value on the element
            ex. if properties is {id: myElement, className: myClass, 
            element will have its id set to myElement and its className set to myClass */
        element[key] = properties[key];
    }
        
    /* iterates over the children array, and for each child,
        appends the child to the element */
    children.forEach(child => element.appendChild(child));
        
    return element;
}


// creates an element for Date and append it to the page container
function createAndAppendDate(dateData, container) {
    // creates a div and sets its classes and text content 
    const dateDiv = createElement('div', {
        className: "section date middle",
        textContent: dateData
    });
    
    // appends the div to the page
    container.appendChild(dateDiv);
}


/* takes in an object made up of key-value pairs, and prepareFunction processes it and pushes the processed data into an array */
function prepareObjectData(obj, prepareFunction) {
    const processedData = [];

    // iterates over each key/property in obj
    for (const key in obj) {
        // item is assigned the value of the current property being iterated over
        const item = obj[key];
        /* calls prepareFunction, passing it the current key and its value, 
           and pushes the result of this function into the processedData array
           this is where each key-value pair is actually processed */
        processedData.push(prepareFunction(key, item));
    }
    return processedData;
}


// a prepareData function that processes the titles object and returns the processed data
function prepareTitleData(key, item) {
    return {
        /* takes the current key and its value of a title object and processes it 
            sets/processes new key-value pairs and then returns them
            sets classes property for the object, sets the src property for an image associated with the current value,
            sets the alt property for that image, sets text content, sets a class for the text */
        classes: ["section", key, item.position],
        imageSrc: item.image,
        imageAlt: item.alt,
        textContent: item.text,
        textClass: item['text-class'],
    };     
}

// creates elements for the processed titles data and appends them to the page container
function createAndAppendTitles(titlesData, container) {
    /* iterates over an array of processed data/objects, each object includes the 
       title's classes, title's image data, alt text data, and text content */
    titlesData.forEach(data => {

        /*  for each processed object in the array (projects-title or each-task-title)
            creates a div element, and sets its classes by joining all class names 
           provided in data.classes with a space between the classes */
        const titleDiv = createElement('div', {className: data.classes.join(' ')});

        // creates an img element, and sets its src and alt attributes according to the processed object 
        const img = createElement('img', {
            src: data.imageSrc, 
            alt: data.imageAlt
        });

        /* if data.textClass exists (if textClass is a key in the processed object), uses that value as text content,
           otherwise, defaults to an empty string as text content */
        data.textClass ? `${data.textClass}` : '';

        // creates a div for the text content and sets the div's classes and text content 
        const textDiv = createElement('div', {
            textContent: data.textContent
        });

        // if id is a key in the processed object, use that value as the id attribute for the text content div
        if (data.id) {
            textDiv.id = data.id;
        }

        // append img and text content div elements to their container, titleDiv 
        titleDiv.appendChild(img);
        titleDiv.appendChild(textDiv);

        container.appendChild(titleDiv);
    });
}


// a prepareData function that processes the buttons object and returns the processed data
function prepareButtonData(key, item) {
    return {
        /* takes the current key and its value of a button object and processes it 
            sets/processes new key-value pairs and then returns them
            sets classes property for the object, sets its id property, sets its text content */
        classes: ["section", key, item.position],
        id: item.id,
        textContent: item.text
    };
}


// creates elements for the processed buttons data and appends them to the page container
function createAndAppendButtons(buttonsData, projectData, container) {
    /* iterates over an array of button objects, each object includes the
       button's id and text content, and for the div the button is nested into, classes */
    buttonsData.forEach(data => { 

        // creates a button element and sets its id attribute and text content 
        const button = createElement('button', {
            id: data.id,
            textContent: data.textContent});

        /* creates a div container for the button, and sets its classes by joining all class names 
           provided in data.classes with a space between them */
        const buttonDiv = createElement('div', {className: data.classes.join(' ')});

        // appends the button to its container, buttonDiv
        buttonDiv.appendChild(button);

        container.appendChild(buttonDiv);
    });

    // newTaskButton is assigned to the element whose id is 'new-task'
    let newTaskButton = document.getElementById('new-task');

    // adds a click event listener to newTaskButton, and runs the createNewTask function when the button is clicked
    // CREATE NEW TASK - I THINK THIS ONE IS OK...
    newTaskButton.addEventListener('click', createNewTask);

    let saveTaskButton = document.getElementById("save-task");
    
    // // CREATE AND APPEND NEW TASK
    // saveTaskButton.addEventListener('click', () => {
    //     let projectKey = projectData['Project'];
    //     let projectTitle = projectKey['text'];
    //     if (!projectTitle.toString().includes('1')) {
    //         createAndAppendTask(projectData, container);
    //     } 
    // });
    saveTaskButton.addEventListener('click', () => {
            createAndAppendTask(projectData, container);
    });
}
    // let currentProject = document.getElementById("tasks-list-project").textContent;
    
    // let currentProjectMatch = currentProject.match(/\d+/);
    // let numberString = currentProjectMatch[0];
    // let projectData = projectMapping[`Project${numberString}`];


// creates the arrow img element, a text node, and an li element for a new project being added to the projects list
function createProjectsListItem(key, projectName, list, listAttributesData) {
    // creates the arrow pointing right image with attributes taken from listAttributesData
    const img = createElement('img', {
        src: listAttributesData.image,
        alt: listAttributesData.alt
    });
    // creates a text node with projectName as text content 
    const textNode = document.createTextNode(projectName);

    // creates a li element with the img element and text node as children
    const projectDiv = createElement('li', null, img, textNode);

    // adds the key as a class attribute for the li element
    projectDiv.classList.add(key);

    // appends the newly created li element to the ul element
    list.appendChild(projectDiv);
}


/* accesses the input in the new-project field and runs the createProjectsListItem 
    function to add the input to the projects list */
function appendNewProjectName(projectsListText, input, list, listAttributesData) {
    // trims whitespace from the input value
    const newProjectValue = input.value.trim();

    // ensures that the input is not empty
    if (newProjectValue !== '') {

        /* generates a new key for the project (p10: "Project 10", etc.)
            by counting the existing projects and adding 1 */
        const nextKey = 'p' + (Object.keys(projectsListText).length + 1);

        // adds the trimmed input value to the projectsListText object, paired with the nextKey key 
        projectsListText[nextKey] = newProjectValue;

        // creates a new list item for the project and adds it to the projects list
        createProjectsListItem(nextKey, newProjectValue, list, listAttributesData);

        // clears the input field after adding the new project
        input.value = '';
    }
}

// creates elements for the projects list and the new-project field
function createAndAppendProjectsListAndField(projectsListText, listAttributesData, fieldAttributesData, container) {

    // creates a div container for the projects list and sets its classes
    const listDiv = createElement('div', { className: "section projects-list left" });

    // creates a ul element for the projects list
    const list = createElement('ul');

    // loops through projectsListText and calls createProjectListItem on each project/key to populate the projects list
    for (const key in projectsListText) {
        createProjectsListItem(key, projectsListText[key], list, listAttributesData);
    }
    
    // append the projects list to its container
    listDiv.appendChild(list);

    // creates a container for the input field
    const projectFieldDiv = createElement('div');

    // creates a label element for the input field and sets its for attribute
    const label = createElement('label', { htmlFor: fieldAttributesData.for });

    // creates the input field with type, id, and placeholder attributes from fieldAttributesData key values
    const input = createElement('input', {
        type: fieldAttributesData.type,
        id: fieldAttributesData.id,
        placeholder: fieldAttributesData.placeholder
    });

    // appends the label and input to the input field container
    projectFieldDiv.appendChild(label);
    projectFieldDiv.appendChild(input);

    // appends the input field container to the projects list container
    listDiv.appendChild(projectFieldDiv);

    // appends the list container to the page container
    container.appendChild(listDiv);

    /* adds a click event listener to the + New Project button that calls appendNewProjectName 
        when the + New Project button clicked */
    document.getElementById("new-project").addEventListener('click', function() {

        // adds the new project name to the projects list when the button is clicked
        appendNewProjectName(projectsListText, input, list, listAttributesData);
    });

    // adds a keyup event listener to the input field to call appendNewProjectName when the Enter key is hit
    input.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            appendNewProjectName(projectsListText, input, list, listAttributesData);
        }
    });
}
    

// creates elements for the tasks project title and tasks list 
function createAndAppendTasksTitleAndList(projectData, container) {

    // assigns tasksTitleData to the value/object associated with projectData['Project'] key
    const tasksTitleData = projectData['Project'];

    // console.log(tasksTitleData);

    // creates a div for the title and sets it classes
    const titleDiv = createElement('div', {className: "section project-title tasks-list-project " + tasksTitleData.position});

    // creates img element of the folder plus down-pointing arrow icon and sets its src and alt attributes 
    const img = createElement('img', {src: tasksTitleData.image, alt: tasksTitleData.alt});

    // creates div for the title's text content and sets the div's id
    const textDiv = createElement('div', {textContent: tasksTitleData.text});

    // appends the img and text div elements to their title container
    titleDiv.appendChild(img);
    titleDiv.appendChild(textDiv);

    container.appendChild(titleDiv);

    // creates a div container for all the tasks in the list
    const tasksListDiv = createElement('div', {className: 'section tasks-list middle'});

    // iterates through keys/objects inside the projectData object
    for (let taskKey in projectData) {
        // move on if the the key is Project (which contains properties for the title)
        if (taskKey === 'Project') continue;

        // data assigned to the value/object associated with projectData[taskKey]
        let data = projectData[taskKey];

        /* creates a div container for "Edit", task title, "Task Description", "Task Due Date", 
            "Priority Level", and "Status" elements and sets its class and id */
        let taskDiv = createElement('div', {
            className: 'task',
            id: taskKey
        });

        // creates a div for "Edit" and sets its class and text content
        let taskEditDiv = createElement('div', {
            className: "task-edit",
            textContent: data["task-edit"]
        });

        // adds a click event listener to the Edit div element
        taskEditDiv.addEventListener('click', function() {
            // when Edit is clicked, run populateFormFields to populate the task form fields with values from the object
            populateFormFields(taskKey);
        });

        // creates a div for the task title key's value and sets its class and text content
        let taskTitleDiv = createElement('div', {
            className: "task-title",
            textContent: data["task-title"]
        })

        // creates a div for "Task Description" and sets its class and text content
        let taskDescriptionDiv = createElement('div', {
            className: "task-description",
            textContent: data["task-description"]
        });

        /* creates a div for "Task Due Date" and sets its text content and 
            sets its color class based on the value of its priority-level property */
        let taskDueDateDiv = createElement('div', {

            /* if the priority-level is high, set its color class to red 
               if the priority-level is medium, set its color class to yellow
               if the priority-level is low, set its color class to green */
            className: `task-duedate ${data["priority-level"] === "high" ? "red" : data["priority-level"] === "medium" ? "yellow" : "green"}`,
            textContent: data["task-duedate"]
        });

        // creates a div for "Priority Level", and sets its text content and classes, including the hide class
        let priorityLevelDiv = createElement('div', {
            className: `priority-level hide`,
            textContent: data["priority-level"]
        });

        // creates a div for "Status" and sets its text content and classes, including the hide class
        let statusDiv = createElement('div', {
            className: `status hide`,
            textContent: data["status"]
        });

        // appends 4 shown elements and 2 hidden elements to the task container
        taskDiv.appendChild(taskEditDiv);
        taskDiv.appendChild(taskTitleDiv);
        taskDiv.appendChild(taskDescriptionDiv);
        taskDiv.appendChild(taskDueDateDiv);
        taskDiv.appendChild(priorityLevelDiv);
        taskDiv.appendChild(statusDiv);

        // appends the task container to the div container with the tasks list
        tasksListDiv.appendChild(taskDiv);

        container.appendChild(tasksListDiv);
    }

    // console.log(tasksListDiv.textContent);

    // taskEditDivs array is assigned to all elements with the 'task-edit' class
    let taskEditDivs = document.getElementsByClassName('task-edit');

    // creates a click event listener for each div element of class 'task-edit'
    Array.from(taskEditDivs).forEach(function(div) {

        // run switchStylesheet function when each div is clicked
        div.addEventListener('click', switchStylesheet)
    });
}


// a prepareData function that processes the firstThreeTaskFields data and returns the processed data
function prepareThreeTaskFieldsData(key, item) {
    return {
            class: key,
            labelFor: item.for,
            labelId: item["label-id"],
            labelTextContent: item["label-text"],
            inputType: item.type,
            textareaName: item.name,
            inputId: item["input-id"],
            textareaId: item["textarea-id"]
    };
}


// a prepareData function that processes the priorityTaskField data and returns the processed data
function preparePriorityTaskFieldData(key, item) {
    return {
            type: item.type,
            name: item.name,
            id: item.id,
            value: item.value,
            for: item.for,
            "label-text": item["label-text"],
            class: item.class,
            "data-color": item["data-color"]
    };
}

// creates and appends four task fields and a label for the fourth field to the page container
function createAndAppendTaskFields(threeTaskFieldsData, fieldLabel, priorityTaskFieldData, container) {

    // creates a form container and sets its classes
    const formDiv = createElement('div', {className: 'section task-details right'});
    // creates a form and sets its attributes
    const form = createElement('form', {action: '', method: 'post', id: 'form'});

    // iterates through each object in the firstThreeTaskFields array object
    threeTaskFieldsData.forEach(data => {
        // for each object, create a label and set its attributes and text content
        const label = createElement('label', {
            htmlFor: data.labelFor,
            id: data.labelId,
            textContent: data.labelTextContent
        });

        // for each object, creates a task field div container and set its class
        const taskFieldDiv = createElement('div', {className: data.class});

        // appends each label to each task field div
        taskFieldDiv.appendChild(label);

        // if the object has a key of inputType, creates an input element and sets its attributes 
        if (data.inputType) {
            const input = createElement('input', {
                type: data.inputType, 
                id: data.inputId
            });
            // appends the input element to its task field div container
            taskFieldDiv.appendChild(input);
        }

        // if the object has a key of textareaName, creates a textarea element and set its attributes 
        if (data.textareaName) {
            const textarea = createElement('textarea', {
                name: data.textareaName, 
                id: data.textareaId
            });
            // appends the textarea to its task field div container
            taskFieldDiv.appendChild(textarea);
        }
        // appends each task field div to the form element
        form.appendChild(taskFieldDiv);
    });

    // creates main label element with "Priority" as text content 
    const priorityTaskFieldLabel = createElement('label', {
        htmlFor: fieldLabel.for,
        id: fieldLabel["label-id"],
        textContent: fieldLabel["label-text"]
    });

    // creates div container for the Priority main label, input, and input label elements
    const priorityTaskFieldDiv = createElement('div', {className: 'priority-field'});

    // appends main label to the div container
    priorityTaskFieldDiv.appendChild(priorityTaskFieldLabel);

    /* iterates through the priorityTaskFieldData object array, and for each object, 
        creates an input element and set its attributes */
    priorityTaskFieldData.forEach(data => {
        const input = createElement('input', {
            type: data.type,
            name: data.name, 
            id: data.id,
            value: data.value
        });

        // for each object, creates an input label element and set its attributes
        const otherLabel = createElement('label', {
            htmlFor: data.for,
            className: data.class,
            textContent: data["label-text"]
        });

        // for each input label, sets the color for each radio 
        otherLabel.dataset.color = data["data-color"];

        // appends each radio input to the div container
        priorityTaskFieldDiv.appendChild(input);
        // appends each otherLabel to the div container
        priorityTaskFieldDiv.appendChild(otherLabel);
    });

    // appends the div container to the form element
    form.appendChild(priorityTaskFieldDiv);

    // appends the form element to the form container
    formDiv.appendChild(form);

    // appends the form container to the page container
    container.appendChild(formDiv);
}

// creates and appends the status dropdown field to the page container
function createAndAppendStatusTaskField(statusTaskFieldData) {
    // returns the form element
    const form = document.getElementById("form");

    // iterates through the array keyed to "options" in the statusTaskFieldData object
    const optionsElements = statusTaskFieldData.options.map(option => 

        // for each element in the options array, creates an option element and sets its attributes
        createElement('option', {
            value: option.value, 
            textContent: option.text
        })
    );

    // creates a select element and sets its attributes and options
    const select = createElement('select', {
        name: statusTaskFieldData.name, 
        id: statusTaskFieldData["select-id"]}, 
        ...optionsElements);

    // creates a label element and sets its attributes
    const label = createElement('label', {
        htmlFor: statusTaskFieldData.for,
        id: statusTaskFieldData["label-id"],
        textContent: statusTaskFieldData["label-text"]
    });

    // creates a div container for the select (with its options) and label elements 
    const statusTaskFieldDiv = createElement('div', {className: statusTaskFieldData.class}, label, select);

    // appends the status dropdown div container to the page container
    form.appendChild(statusTaskFieldDiv);
}

// switches from two panes to three panes 
function switchStylesheet() {
    var stylesheet = document.getElementById('stylesheetToSwitch');
    if (stylesheet.href.endsWith('style2.css')) {
        stylesheet.href = 'style.css';
    }
} 

// populates the form fields with the data for the task selected
function populateFormFields(taskId) {
    // returns the element with the id value passed into the function
    const taskDiv = document.getElementById(taskId);

    // returns the text content of the nested element that has a class of "task-title" in the middle pane
    const taskTitle = taskDiv.querySelector('.task-title').textContent;

    // returns the text content of the nested element that has a class of "task-description" in the middle pane
    const taskDescription = taskDiv.querySelector('.task-description').textContent;
    
    // returns the text content of the nested element that has a class of "task-duedate" in the middle pane
    let taskDueDate = taskDiv.querySelector('.task-duedate').textContent;

    // convert taskDueDate from MM/DD/YYYY to YYYY-MM-DD
    if (taskDueDate.includes('/')) {
        //splits the taskDueDate string into an array of substrings based on "/" as the delimiter
        const dateParts = taskDueDate.split('/');
        /* regex for the third substring, YYYY, then "-", then the first substring, MM, padded with a '0'
           if MM is a single digit, then "-", and lastly the second substring, DD, padded with a '0'
           if DD is a single digit */
        taskDueDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
    }

    // returns the text content of the nested (hidden) element that has a class of "priority-level" in the middle pane
    const taskPriority = taskDiv.querySelector('.priority-level').textContent;
    
    // returns the text content of the nested (hidden) element that has a class of "status" in the middle pane
    const taskStatus = taskDiv.querySelector('.status').textContent;

    // returns the field element with the id of "each-task" in the right pane
    const eachTaskField = document.getElementById('each-task');

    // returns the field element with the id of "task-description" in the right pane
    const descriptionField = document.getElementById('task-description');

    // returns the field element with the id of "task-duedate" in the right pane
    const dueDateField = document.getElementById('task-duedate');

    // returns the field element with the name of "priority"  in the right pane
    const priorityFields = document.getElementsByName('priority');

    // assigns the value of taskTitle in the middle pane to eachTaskField in the right pane
    eachTaskField.value = taskTitle;

    // assigns the value of taskDescription in the middle pane to descriptionField in the right pane
    descriptionField.value = taskDescription;

    // assigns the value of taskDueDate in the middle pane to dueDateField in the right pane
    dueDateField.value = taskDueDate;

    // loop through the three priority fields
    for (let i = 0; i < priorityFields.length; i++) {
        
        /* if the priority field value exactly matches the text content of the "priority-level" element,
            check off that priority field value and break from this loop */
        if (priorityFields[i].value === taskPriority) {
            priorityFields[i].checked = true;
            break;
        }
    }

    // returns the element with the id of "status-dropdown" in the right pane
    const statusSelect = document.getElementById('status-dropdown');

    // assigns the value of taskStatus in the middle pane to statusSelect in the right pane
    statusSelect.value = taskStatus;
}

// creates a new task
function createNewTask() {
    // switches from two panes to three panes
    switchStylesheet();

    // returns all the task fields and makes their values empty strings 
    let eachTaskField = document.getElementById('each-task');
    if (eachTaskField) {
        eachTaskField.value = '';
    }

    let dueDateField = document.getElementById('task-duedate');
    if (dueDateField) {
        dueDateField.value = '';
    }

    let descriptionField = document.getElementById('task-description');
    if (descriptionField) {
        descriptionField.value = '';
    }

    let priorityFields = document.getElementsByName('priority');
    for (let i = 0; i < priorityFields.length; i++) {
        priorityFields[i].checked = false;
    }

    // returns the status dropdown and makes its selected index the first option which is blank
    let statusSelect = document.getElementById('status-dropdown');
    if (statusSelect) {
        statusSelect.selectedIndex = 0;
    }
}


// creates the middle pane for a selected project
function selectProject(container) {
    // let saveTaskButton = document.getElementById('save-task');

    // let tasksListProject = document.querySelector(".tasks-list-project");

    // if (tasksListProject.textContent === 'Project 1') {

    //     // adds a click event listener to newTaskButton, and runs the createNewTask function when the button is clicked
    //     // CREATE NEW TASK - I THINK THIS ONE IS OK...
    //     saveTaskButton.addEventListener('click', () => {
    //         console.log("Project 1");
    //         createAndAppendTask(Project1, container);   
    //     });
    // } else {
    //     console.log("Not Project 1");
    // }
    // loops through all the projects list elements
    // 9 is a placeholder for what will likely be variable.length
    for (let i = 1; i <= 9; i++) {
        // returns all the projects list elements with a class of p1, p2, p3, etc.
        const projectTitleDiv = document.querySelector(`.p${i}`);

        if (projectTitleDiv) {
            // adds a click event listener to each projects list element
            // projectTitleDiv.addEventListener('click', appendTasksTitleListAndNewTask);
            projectTitleDiv.addEventListener('click', () => {

                // returns the link element with an id of stylesheet 
                let stylesheet = document.getElementById('stylesheetToSwitch');

                // if the stylesheet currently has three panes, switch to two panes 
                if (stylesheet.href.endsWith('style.css')) {
                     stylesheet.href = 'style2.css';
                }

                /* assigns the object that is keyed to the the projects list element selected, 
                    Project1, Project2, Project3, etc. to projectData */
                let projectData = projectMapping[`Project${i}`];

                // processProjectData(projectData);               

                // creates the tasks list in the middle pane for the selected project
                // SHOWS MIDDLE PANE/TASKS LIST FOR SELECTED PROJECT
                createAndAppendTasksTitleAndList(projectData, container);

                // let processedButtons = prepareObjectData(buttons, prepareButtonData);
                // createAndAppendButtons(processedButtons, projectData, container); 

                // let newTaskButton = document.getElementById('new-task');

                // newTaskButton.addEventListener('click', createNewTask);

                let saveTaskButton = document.getElementById('save-task');

                // adds a click event listener to newTaskButton, and runs the createNewTask function when the button is clicked
                // CREATE NEW TASK - I THINK THIS ONE IS OK...
                saveTaskButton.addEventListener('click', () => {
                      let projectKey = projectData['Project'];
                      let projectTitle = projectKey['text'];
                      if (!projectTitle.toString().includes('1')) {
                          createAndAppendTask(projectData, container);
                     } 
                });
            });
        }
    }
}


function prepareTaskData() {
    // returns user input from the task fields
    const taskTitle = document.getElementById('each-task').value;
    let taskDueDate = document.getElementById('task-duedate').value;

    const date = new Date(taskDueDate + 'T00:00:00');

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    taskDueDate = `${month}/${day}/${year}`;

    const taskDescription = document.getElementById('task-description').value;
    const radioInputs = document.querySelectorAll('input[type="radio"][name="priority"]');

    let priorityLevel= null;

    for (const radioInput of radioInputs) {
        if (radioInput.checked) {
            const labelFor = radioInput.getAttribute('id');
            const associatedLabel = document.querySelector(`label[for="${labelFor}"]`);
            const forAttribute = associatedLabel.textContent;
            priorityLevel = forAttribute;
        }
    }

    const taskStatus = document.getElementById('status-dropdown');
    const selectedIndex = taskStatus.selectedIndex;
    const selectedTaskStatus = taskStatus.options[selectedIndex].value;

    const task = {
        'task-edit': "Edit",
        'task-title': taskTitle,
        'task-description': taskDescription,
        'task-duedate': taskDueDate,
        'priority-level': priorityLevel,
        'status': selectedTaskStatus
    };

    return task;
}


// function findLastTaskId() {
//     let lastId = 0;

//     const taskElements = document.getElementsByClassName('task');

//     for (let i = 0; i < taskElements.length; i++) {
//         const taskId = parseInt(taskElements[i].id);

//         if (!isNaN(taskId) && taskId > lastId) {
//             lastId = taskId;
//         }
//     } 
//     return lastId;
// }

function findLastTaskId(projectData) {
    let lastId = 0;

    Object.keys(projectData).forEach(key => {
        const currentId = parseInt(key, 10);

        if (!isNaN(currentId) && currentId > lastId) {
            lastId = currentId;
        }
    });
    return lastId;
}


function createAndAppendTask(projectData, container) {
    let stylesheet = document.getElementById('stylesheetToSwitch');

    if (stylesheet.href.endsWith('style.css')) {
        let lastTaskData = prepareTaskData();

        let lastTaskId = findLastTaskId(projectData);
        // console.log(lastTaskId);

        lastTaskId = lastTaskId + 1;

    // let tasksListDiv = document.querySelector(".tasks-list");

    // console.log(projectData);
    // let projectKeyObject = currentProject['Project'];
    // let projectTitle = projectKeyObject['text'];

    // let projectTitleDiv = createElement('div', {
    //     className: "section project-title tasks-list-project middle",
    //     textContent: `${projectTitle}`
    // });

    // container.appendChild(projectTitleDiv);

    // let tasksListDiv = createElement('div', {
    //     className: "section tasks-list middle"
    // });
    
    // console.log(tasksListDiv);

    // currentProject = selectProject(container);
        if (lastTaskData) {
            projectData[lastTaskId] = lastTaskData;

            createAndAppendTasksTitleAndList(projectData, container);
            // console.log(lastTaskId);

    // createAndAppendTask(currentProject, container);

    // const lastTaskDiv = createElement('div', {
    //     className: 'task',
    //     id: `${lastTaskId}`
    // });

    // // console.log(lastTaskData);

    // // creates a div for the task title key's value and sets its class and text content
    // const taskTitleDiv = createElement('div', {
    //     className: "task-title",
    //     textContent: lastTaskData["task-title"]
    // });
        
    // // creates a div for "Task Description" and sets its class and text content
    // const taskDescriptionDiv = createElement('div', {
    //     className: "task-description",
    //     textContent: lastTaskData["task-description"]
    // });
        
    // /* creates a div for "Task Due Date" and sets its text content and 
    //    sets its color class based on the value of its priority-level property */
    // const taskDueDateDiv = createElement('div', {
        
    //     /* if the priority-level is high, set its color class to red 
    //        if the priority-level is medium, set its color class to yellow
    //        if the priority-level is low, set its color class to green */
    //     className: `task-duedate ${lastTaskData["priority-level"] === "high" ? "red" : lastTaskData["priority-level"] === "medium" ? "yellow" : "green"}`,
    //     textContent: lastTaskData["task-duedate"]
    // });
        
    // // creates a div for "Priority Level", and sets its text content and classes, including the hide class
    // const priorityLevelDiv = createElement('div', {
    //     className: `priority-level hide`,
    //     textContent: lastTaskData["priority-level"]
    // });
        
    // // creates a div for "Status" and sets its text content and classes, including the hide class
    // const statusDiv = createElement('div', {
    //     className: `status hide`,
    //     textContent: lastTaskData["status"]
    // });

    // const taskEditDiv = createElement('div', {
    //     className: "task-edit",
    //     textContent: lastTaskData["task-edit"]
    // });

    // // adds a click event listener to the Edit div element
    // taskEditDiv.addEventListener('click', function() {
    //     // when Edit is clicked, run populateFormFields to populate the task form fields with values from the object
    //     populateFormFields(lastTaskId);
        
    // });

    // lastTaskDiv.appendChild(taskTitleDiv);
    // lastTaskDiv.appendChild(taskDescriptionDiv);
    // lastTaskDiv.appendChild(taskDueDateDiv);
    // lastTaskDiv.appendChild(priorityLevelDiv);
    // lastTaskDiv.appendChild(statusDiv);
    // lastTaskDiv.appendChild(taskEditDiv);

    // tasksListDiv.appendChild(lastTaskDiv);
    // container.appendChild(tasksListDiv);
    }
}
   // console.log(tasksListDiv.textContent);
}

// function appendNewTask(container) {
//     currentProject = selectProject(container);
//     let lastTaskDiv = prepareTaskData();

// */}


export { prepareDate, createAndAppendDate, prepareObjectData, prepareTitleData, createAndAppendTitles, prepareButtonData, createAndAppendButtons, createAndAppendProjectsListAndField, createAndAppendTasksTitleAndList, prepareThreeTaskFieldsData, preparePriorityTaskFieldData, createAndAppendTaskFields, createAndAppendStatusTaskField, selectProject  };