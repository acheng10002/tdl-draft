import {projectsListText, Project1, projectMapping} from './config.js'

function prepareDate() {
    return new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' });
}


function createAndAppendDate(dateData, container) {
    const dateDiv = createElement('div', {
        className: "section date middle",
        textContent: dateData
    });

    container.appendChild(dateDiv);
}


/* takes in an object and a prepareData function
   iteratively, prepareData function processes an object and then pushes the processed data into an array */
function prepareObjectData(obj, prepareFunction) {
    const processedData = [];

    /* when obj is an object made up of objects, 
       loops through the objects, and
       each object with a key is assigned to variable called item */
    for (const key in obj) {
        const item = obj[key];
        processedData.push(prepareFunction(key, item));
    }
    return processedData;
}


// a prepareData function
function prepareTitleData(key, item) {
    return {
        classes: ["section", key, item.position],
        imageSrc: item.image,
        imageAlt: item.alt,
        textContent: item.text,
        textClass: item['text-class'],
        // id: item['id']
    };     
}


/* utility function that creates HTML elements 
   type is the type of HTML element to be created
   properties is an object containing key-value pairs where keys are property names and 
   values are the values for those properties to be set on the element 
   rest parameter that allows for an indefinite number of arguments representing child elements 
        the rest parameter arguments are treated as an array inside the function */
function createElement(type, properties, ...children) {
    const element = document.createElement(type);

    // iterates over each key in the properties object
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


function createAndAppendTitles(titlesData, container) {
    /* iterates over an array of objects, each object includes the 
       title's image data, alt text data, and text content */
    titlesData.forEach(data => {

        /* creates a div element, and sets its classes by joining all class names 
           provided in data.classes with a space between them */
        const titleDiv = createElement('div', {className: data.classes.join(' ')});

        // creates an img element, and sets its src and alt attributes according to the data object 
        const img = createElement('img', {
            src: data.imageSrc, 
            alt: data.imageAlt
        });

        /* textDivClasses stores the class names for the text div
           if data.textClass exists, uses that value as text content,
           otherwise, defaults to an empty string as text content */
        //    const textDivClasses = 
        data.textClass ? `${data.textClass}` : '';

        /* creates a div for the text content and sets the div's classes and text content 
           trim() removes whitespace from both ends of a string */
        const textDiv = createElement('div', {
            textContent: data.textContent
        });

        if (data.id) {
            textDiv.id = data.id;
        }

        titleDiv.appendChild(img);
        titleDiv.appendChild(textDiv);

        container.appendChild(titleDiv);
    });
}


// a prepareData function
function prepareButtonData(key, item) {
    return {
        classes: ["section", key, item.position],
        id: item.id,
        textContent: item.text
    };
}


function createAndAppendButtons(buttonsData, container) {
    /* iterates over an array of objects, each object includes the
       button's text content and classes for the div the button is nested into */
    buttonsData.forEach(data => { 

        // creates a button element and sets its text content to value provided in data.textContent
        const button = createElement('button', {
            id: data.id,
            textContent: data.textContent});

        /* creates a div element, and sets its classes by joining all class names 
           provided in data.classes with a space between them */
        const buttonDiv = createElement('div', {className: data.classes.join(' ')});

        buttonDiv.appendChild(button);

        container.appendChild(buttonDiv);
    });
    let newTaskButton = document.getElementById('new-task');

    newTaskButton.addEventListener('click', createNewTask);
}


function createProjectListItem(key, projectName, list, listAttributesData) {
    // creates the arrow pointing right image with attributes taken from listAttributesData
    const img = createElement('img', {
        src: listAttributesData.image,
        alt: listAttributesData.alt
    });
    const textNode = document.createTextNode(projectName);

    // creates a li element containing the img element and text node with the projectName
    const projectsDiv = createElement('li', null, img, textNode);
    projectsDiv.classList.add(key);

    // appends the newly created li element to the ul element
    list.appendChild(projectsDiv);
}


function addNewProject(projectsListText, input, list, listAttributesData) {
    // trims whitespace from the input value
    const newProjectValue = input.value.trim();

    // ensures that the input is not empty
    if (newProjectValue !== '') {

        // generates a new key for the project by counting the existing projects and adding 1
        const nextKey = 'p' + (Object.keys(projectsListText).length + 1);

        // adds the new projectName to the projectsListText object
        projectsListText[nextKey] = newProjectValue;

        // creates a new list item for the project and adds it to the list
        createProjectListItem(nextKey, newProjectValue, list, listAttributesData);

        // clears the input field after adding the new project
        input.value = '';
    }
}


function createAndAppendProjectsListAndField(projectsListText, listAttributesData, fieldAttributesData, container) {

    // creates a div to contain the projects list
    const listDiv = createElement('div', { className: "section projects-list left" });

    const list = createElement('ul');

    // loops through projectsListText and calls createProjectListItem for each project to populate the list
    for (const key in projectsListText) {
        createProjectListItem(key, projectsListText[key], list, listAttributesData);
    }

    listDiv.appendChild(list);

    // creates a container for the input field
    const projectFieldDiv = createElement('div');

    // creates a label element for the input field
    const label = createElement('label', { htmlFor: fieldAttributesData.id });

    // creates the input field with attributes from fieldAttributesData
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

    // appends the list container to the main container
    container.appendChild(listDiv);

    // adds a click event listener to the + New Project button that calls addNewProject when clicked
    document.getElementById("new-project").addEventListener('click', function() {
        addNewProject(projectsListText, input, list, listAttributesData);
    });

    // adds a keyup event listener to the input field to call addNewProject when the Enter key is pressed
    input.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addNewProject(projectsListText, input, list, listAttributesData);
        }
    });
}
    

function createAndAppendTasksTitleAndList(projectData, container) {
    const tasksTitleData = projectData['Project'];
    const titleDiv = createElement('div', {className: "section project-title " + tasksTitleData.position});
    const img = createElement('img', {src: tasksTitleData.image, alt: tasksTitleData.alt});
    const textDiv = createElement('div', {textContent: tasksTitleData.text, id: tasksTitleData.id});

    titleDiv.appendChild(img);
    titleDiv.appendChild(textDiv);

    container.appendChild(titleDiv);

    const tasksListDiv = createElement('div', {className: 'section tasks-list middle'});

    for (let taskKey in projectData) {
        if (taskKey === 'Project') continue;

        const data = projectData[taskKey];

        // creates a div element for "Edit"
        const taskEditDiv = createElement('div', {
            className: "task-edit",
            textContent: data["task-edit"]
        });

        taskEditDiv.addEventListener('click', function() {
            populateFormFields(taskKey);
        });

        const taskTitleDiv = createElement('div', {
            className: "task-title",
            textContent: data["task-title"]
        })

        // creates a div element for "Task Description"
        const taskDescriptionDiv = createElement('div', {
            className: "task-description",
            textContent: data["task-description"]
        });

        // creates a div element for "Task Due Date" and sets its color class based on the value of its priority-level property 
        const taskDueDateDiv = createElement('div', {
            className: `task-duedate ${data["priority-level"] === "high" ? "red" : data["priority-level"] === "medium" ? "yellow" : "green"}`,
            textContent: data["task-duedate"]
        });

        // creates a div element for "Priority Level", and sets its classes, including hide  
        const priorityLevelDiv = createElement('div', {
            className: `priority-level hide`,
            textContent: data["priority-level"]
        });

        const statusDiv = createElement('div', {
            className: `status hide`,
            textContent: data["status"]
        });

        const taskDiv = createElement('div', {
            className: 'task',
            id: taskKey
        });

        taskDiv.appendChild(taskEditDiv);
        taskDiv.appendChild(taskTitleDiv);
        taskDiv.appendChild(taskDescriptionDiv);
        taskDiv.appendChild(taskDueDateDiv);
        taskDiv.appendChild(priorityLevelDiv);
        taskDiv.appendChild(statusDiv);

        tasksListDiv.appendChild(taskDiv);
    }
    container.appendChild(tasksListDiv);

    let taskEditDivs = document.getElementsByClassName('task-edit');

    Array.from(taskEditDivs).forEach(function(div) {
        div.addEventListener('click', switchStylesheet)
    });
}


// a prepareData function
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


// a prepareData function
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


function createAndAppendTaskFields(threeTaskFieldsData, labelField, priorityTaskFieldData, container) {
    const formDiv = createElement('div', {className: 'section task-details right'});
    const form = createElement('form', {action: '', method: 'post', id: 'form'});

    threeTaskFieldsData.forEach(data => {
        const label = createElement('label', {
            htmlFor: data.labelFor,
            id: data.labelId,
            textContent: data.labelTextContent
        });

        const taskFieldDiv = createElement('div', {className: data.class});

        taskFieldDiv.appendChild(label);

        // if the object has a key of inputType, create an input element and sets its properties as specified
        if (data.inputType) {
            const input = createElement('input', {
                type: data.inputType, 
                id: data.inputId
            });

            taskFieldDiv.appendChild(input);
        }

        // if the object has a key of textareaName, create a textarea element and set its properties as specified
        if (data.textareaName) {
            const textarea = createElement('textarea', {
                name: data.textareaName, 
                id: data.textareaId
            });

            taskFieldDiv.appendChild(textarea);
        }

        form.appendChild(taskFieldDiv);
    });

    // creates label element with "Priority" text content 
    const priorityTaskFieldLabel = createElement('label', {
        htmlFor: labelField.for,
        id: labelField["label-id"],
        textContent: labelField["label-text"]
    });

    // creates div element to nest the Priority label into
    const priorityTaskFieldDiv = createElement('div', {className: 'priority-field'});
    priorityTaskFieldDiv.appendChild(priorityTaskFieldLabel);

    // iterates through the priorityTaskFieldData array, and for each object, creates an input element and set its properties as specified
    priorityTaskFieldData.forEach(data => {
        const input = createElement('input', {
            type: data.type,
            name: data.name, 
            id: data.id,
            value: data.value
        });

        // for each object, creates a label element and set its properties as specified
        const otherLabel = createElement('label', {
            htmlFor: data.for,
            className: data.class,
            textContent: data["label-text"]
        });

        // for each label, sets the color to go in each radio input
        otherLabel.dataset.color = data["data-color"];

        priorityTaskFieldDiv.appendChild(input);
        priorityTaskFieldDiv.appendChild(otherLabel);
    });

    form.appendChild(priorityTaskFieldDiv);

    formDiv.appendChild(form);
    
    container.appendChild(formDiv);
}


function createAndAppendStatusTaskField(statusTaskFieldData) {
    const form = document.getElementById("form");

    // iterates through the options array inside the statusTaskFieldData object
    const optionsElements = statusTaskFieldData.options.map(option => 

        // for each element in the options array, creates an option element and sets its properties as specified
        createElement('option', {
            value: option.value, 
            textContent: option.text
        })
    );

    // creates a select element and sets its properties as specified, including the options
    const select = createElement('select', {
        name: statusTaskFieldData.name, 
        id: statusTaskFieldData["select-id"]}, 
        ...optionsElements);

    // creates a label element and sets its properties as specified
    const label = createElement('label', {
        htmlFor: statusTaskFieldData.for,
        id: statusTaskFieldData["label-id"],
        textContent: statusTaskFieldData["label-text"]
    });

    // creates a div element to nest the select, options, and label elements into
    const statusTaskFieldDiv = createElement('div', {className: statusTaskFieldData.class}, label, select);

    form.appendChild(statusTaskFieldDiv);
}


function switchStylesheet() {
    var stylesheet = document.getElementById('stylesheetToSwitch');
    if (stylesheet.href.endsWith('style2.css')) {
        stylesheet.href = 'style.css';
    }
} 


function populateFormFields(taskId) {
    const taskDiv = document.getElementById(taskId);
    const taskTitle = taskDiv.querySelector('.task-title').textContent;

    const taskDescription = taskDiv.querySelector('.task-description').textContent;
    
    let taskDueDate = taskDiv.querySelector('.task-duedate').textContent;

    // convert taskDueDate from MM/DD/YYYY to YYYY-MM-DD
    if (taskDueDate.includes('/')) {
        const dateParts = taskDueDate.split('/');
        taskDueDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
    }

    const taskPriority = taskDiv.querySelector('.priority-level').textContent;
    const taskStatus = taskDiv.querySelector('.status').textContent;

    const eachTaskField = document.getElementById('each-task');
    const descriptionField = document.getElementById('task-description');
    const dueDateField = document.getElementById('task-duedate');
    const priorityFields = document.getElementsByName('priority');

    eachTaskField.value = taskTitle;
    descriptionField.value = taskDescription;
    dueDateField.value = taskDueDate;

    for (let i = 0; i < priorityFields.length; i++) {
        if (priorityFields[i].value === taskPriority) {
            priorityFields[i].checked = true;
            break;
        }
    }

    const statusSelect = document.getElementById('status-dropdown');

    statusSelect.value = taskStatus;
}


function createNewTask() {
    switchStylesheet();

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

    let statusSelect = document.getElementById('status-dropdown');
    if (statusSelect) {
        statusSelect.selectedIndex = 0;
    }
}


function selectProject(container) {
    for (let i = 1; i <= 9; i++) {
        const projectTitleDiv = document.querySelector(`.p${i}`);
        if (projectTitleDiv) {
            projectTitleDiv.addEventListener('click', () => {
                var stylesheet = document.getElementById('stylesheetToSwitch');
                if (stylesheet.href.endsWith('style.css')) {
                    stylesheet.href = 'style2.css';
                }
                const projectData = projectMapping[`Project${i}`];
                createAndAppendTasksTitleAndList(projectData, container);
            });
        }
    }

}


export { prepareDate, createAndAppendDate, prepareObjectData, prepareTitleData, createAndAppendTitles, prepareButtonData, createAndAppendButtons, createAndAppendProjectsListAndField, Project1, createAndAppendTasksTitleAndList, prepareThreeTaskFieldsData, preparePriorityTaskFieldData, createAndAppendTaskFields, createAndAppendStatusTaskField, selectProject };