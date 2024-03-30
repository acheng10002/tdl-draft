import {projectsListText, projectMapping, projectsListAttributes, newProjectFieldAttributes} from './config.js'

saveDataToLocalStorage('projectsListText', projectsListText);
// saveDataToLocalStorage('projectMapping', projectMapping);

let currentProjectData = projectMapping['Project1'];

let isEditingTask = false;
let editingTaskId = null;

let selectedProjectData = null;


/* saves project items and tasks to localStorage every time new data is created or updated
   key is a string representing the name of the storage slot and data is the data to be stored which can be of 
   any type that can be serialized to JSON */
function saveDataToLocalStorage(key, data) {

    // *localStorage can only store strings
    localStorage.setItem(key, JSON.stringify(data));
}


/* checks for existing project items and tasks in localStorage when the application is first loaded
   retrieves and parses the stored data into a JavaScript object */
function loadDataFromLocalStorage(key) {

    /* retrieves data stored in localStorage under the key; result is a JSON string or null if there is no data
       for the given key */
    const storedData = localStorage.getItem(key);

    // checks if storedData is truthy
    if (storedData) {

        // parses the JSON string back into a JavaScript object or array
        return JSON.parse(storedData);
    }

    // if storedData is null, function returns an empty object
    return {};
}


/* returns a localized date string that was converted from a Date object, formatted to a specific locale and options */
function prepareAndCreateDate() {
    return new Date().toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric', 
        weekday: 'long' 
    });
}


/* utility function that creates HTML elements 
   rest parameter allows for an indefinite number of arguments representing child elements 
        the rest parameter arguments get treated as an array inside the function */
function createElement(type, properties, ...children) {

    // type is the type of HTML element to be created
    const element = document.createElement(type);
        
    // properties is an object containing key-value pairs where values are property values to be set on the HTML element
    for (const key in properties) {

        /* for each key, set the corresponding property value on the element ex. if properties is {id: myElement, className: myClass}, 
           element will have its id set to myElement and its className set to myClass */
        element[key] = properties[key];
    }
        
    // iterates over the children array, and for each child, appends the child to the parent element 
    children.forEach(child => element.appendChild(child));
        
    return element;
}


// creates an element for Date string and appends it to the page container; createAndAppendDate(processedData, pageInfo)
function appendDate(dateData, container) {

    // creates a date div and sets its classes and text content 
    const dateDiv = createElement('div', {
        className: "section date middle",
        textContent: dateData
    });
    
    // appends the date div to the page
    container.appendChild(dateDiv);
}


/* takes in a data object made up of key-value pairs, prepareFunction processes it and pushes the processed data into an array */
function prepareAndCreateObjectData(obj, prepareAndCreateFunction) {

    const processedData = [];

    // iterates over each key in obj
    for (const key in obj) {

        // item is assigned the value of the current property being iterated over
        const item = obj[key];

        // calls prepareFunction, passing it the current key and its value, and pushes the result of the prepareFunction into the processedData array
        processedData.push(prepareAndCreateFunction(key, item));
    }
    return processedData;
}


// a prepareData function that processes the title object and returns the processed data; prepareObjectData(titles, prepareTitleData) 
function prepareAndCreateTitleData(key, item) {
    return {
    
        /* processes the key-value pairs of a title object and then returns them, sets object's classes property, 
           sets the src property for an image associated with the current value, sets the image's alt property, sets text content, sets a class for the text */
        classes: ["section", key, item.position],
        imageSrc: item.image,
        imageAlt: item.alt,
        textContent: item.text,
        textClass: item['text-class'],
    };     
}


// creates elements for the processed titles data and appends them to the page container; createAndAppendTitles(processedTitles, pageInfo)
function appendTitles(titlesData, container) {

    /* iterates over an array of processed title data/objects, each object includes the 
       title's classes, title's image data, alt text data, and text content */
    titlesData.forEach(data => {

        /*  for each processed object in the array (projects-title or each-task-title)
            creates a div element, and sets its classes by joining all class names 
           provided in data.classes with a space between the classes */
        const titleDiv = createElement('div', {
            className: data.classes.join(' ')
        });

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

        // append img and text content div elements to their container, titleDiv 
        titleDiv.appendChild(img);
        titleDiv.appendChild(textDiv);

        container.appendChild(titleDiv);
    });
}


// a prepareData function that processes the buttons object and returns the processed data
function prepareAndCreateButtonData(key, item) {

    return {

        /* takes the current key and its value of a button object and processes it 
            sets/processes new key-value pairs and then returns them
            sets classes property for the object, sets its id property, sets its text content */
        classes: ["section", key, item.position],
        id: item.id,
        textContent: item.text
    };
}


// creates elements for the processed buttons data and appends them to the page container; createAndAppendButtons(processedButtons, pageInfo)
function appendButtons(buttonsData, container) {

    /* iterates over an array of button objects, each object includes the button's id and text content, 
       and for the div the button is nested into, its classes */
    buttonsData.forEach(data => { 

        // creates a button element and sets its id attribute and text content 
        const button = createElement('button', {
            id: data.id,
            textContent: data.textContent
        });

        /* creates a div container for the button, and sets its classes by joining all class names 
           provided in data.classes with a space between them */
        const buttonDiv = createElement('div', {
            className: data.classes.join(' ')
        });

        // appends the button to its container, buttonDiv
        buttonDiv.appendChild(button);

        container.appendChild(buttonDiv);
    });

    // newTaskButton is assigned to the element whose id is 'new-task'
    let newTaskButton = document.getElementById('new-task');

    // adds a click event listener to newTaskButton, and runs the createNewTask function when the button is clicked
    newTaskButton.addEventListener('click', newTask);

    // saveTaskButton is assigned to the element whose id is 'save-task'
    let saveTaskButton = document.getElementById('save-task');
    
    // adds a click event listener to saveTaskButton, and runs the createAndAppendTask function when the button is clicked 
    saveTaskButton.addEventListener('click', () => {

        appendTask(selectedProjectData, container);
    });

    let deleteProjectButton = document.getElementById("delete-project");
    
    deleteProjectButton.addEventListener('click', function() {
        deleteProject(selectedProjectData, container);
    });
}


/* creates li elements for projectsListText data and appends them with their attributes
   key is the unique identifier for the project; projectsListText is the object containing project names keyed
   by their unique identifiers; list is the DOM element to which the project list item will be appended; listAttributesData
   is the object containing data for setting attributes on the list item's  child elements, like an image */
function appendProjectsList(key, list, listAttributesData, container) {

    let projectsListText = loadDataFromLocalStorage('projectsListText');

    // fetches the project name using the key from the projectsListText
    const projectName = projectsListText[key];

    // saveDataToLocalStorage('projectsListText', projectsListText);
    
    // creates and configures the arrow pointing right image, the icon associated with each project
    let img = createElement('img');
    img.src = listAttributesData.image;
    img.alt = listAttributesData.alt;

    // creates a text node with projectName as text content
    let textNode = document.createTextNode(projectName);

    // creates li element and appends img element and text node as children
    let projectDiv = createElement('li', { className: key }, img, textNode); 

    projectDiv.addEventListener("click", () => {
        let projectKey = projectName.replace(" ", "");
        selectedProjectData = projectMapping[projectKey];
        appendTasksTitleAndList(selectedProjectData, container);
    });

    // appends the newly created li element to the ul element
    list.appendChild(projectDiv);
}

// creates projectData based on user input
function prepareAndCreateProjectData(input, listAttributesData) {

    // checks if user input is empty
    if (!input.value.trim()) return null;

    // assigns a cleaned string to projectName
    const projectName = input.value.trim();

    let projectsListText = loadDataFromLocalStorage('projectsListText');

    // generates a unique key for projectsListText for the new project by incrementing the total count of existing projects
    const nextKey = `p${Object.keys(projectsListText).length + 1}`;

    let projectMapping = loadDataFromLocalStorage('projectMapping');

    // generates a unique key for projectMapping similar to nextKey
    const newProjectKey = `Project${Object.keys(projectMapping).length + 1}`;

    // adds the new project name to projectsListText using nextKey
    projectsListText[nextKey] = projectName;

    saveDataToLocalStorage('projectsListText', projectsListText);

    /* creates a new project object with detailed information (position, image, alt text, project name) and
       adds it to projectMapping using newProjectKey */
    projectMapping[newProjectKey] = {
        'Project': {
            position: "middle",
            image: listAttributesData.image,
            alt: listAttributesData.alt,
            text: projectName,
        },
    };

    // persists the updated projectMapping to local storage to ensure data is saved across sessions
    saveDataToLocalStorage('projectMapping', projectMapping);

    // returns an object containing the new project's data, ready for DOM manipulation
    return {
        projectName,
        nextKey,
        image: listAttributesData.image,
        alt: listAttributesData.alt 
    };
}

// data function
function deleteProject(projectData, container) {

    if (projectData) {
        let projectsListText = loadDataFromLocalStorage('projectsListText');
        let projectMapping = loadDataFromLocalStorage('projectMapping');

        let projectName = projectData['Project'].text;

        let formattedProjectName = projectName.replace(/\s/g, '');

        delete projectMapping[formattedProjectName];

        let keyToDelete = Object.keys(projectsListText).find(key => projectsListText[key] === projectName);

        if (keyToDelete) {
            delete projectsListText[keyToDelete];
        }

        saveDataToLocalStorage('projectMapping', projectMapping);

        console.log(projectMapping);

        saveDataToLocalStorage('projectsListText', projectsListText);

        selectProject(container);

        projectsListText = loadDataFromLocalStorage('projectsListText');

        projectMapping = loadDataFromLocalStorage('projectMapping');

        const keys = Object.keys(projectMapping);

        if (keys.length > 0) {
            const firstKey = keys[0];
            const firstProjectData = projectMapping[firstKey];
        
            // creates the list of tasks associated with the selected project and appends it to the page
            appendProjectsListAndField(projectsListAttributes, newProjectFieldAttributes, container);

            // selectProject(container);

            appendTasksTitleAndList(firstProjectData, container);

        // Object.keys(projectsListText).forEach(key => {
        
        //     // extracts the numeric part of the key by removing the first character "p"
        //     const projectIndex = key.substring(1);
    
        //     // tries to find a clickable DOM element with a class matching the current key (.p1, .p2, etc.)
        //     const projectTitleDiv = document.querySelector(`.${key}`);
    
        //         // checks if the projectTitleDiv was successfully found
        //         if (projectTitleDiv) {
            
        //             // adds an event listener to the projectTitleDiv that triggers a function when the element is clicked
        //             projectTitleDiv.addEventListener('click', () => {
            
        //             switchToTwoPanes();
            
        //             selectedProjectData = projectMapping ? projectMapping[`Project${projectIndex}`] : projectsListText[key];
            
        //             appendTasksTitleAndList(selectedProjectData, container);
        //             });
        //         }
            // appendTasksTitleAndList(firstProjectData, container);
    
            // selectProject(container);
        // });
        }
    }
}


// data function
function deleteTask(projectData, editingTaskId, container) {

    if (editingTaskId !== null) {
        delete projectData[editingTaskId];

        editingTaskId = null;

        appendTasksTitleAndList(projectData, container);

    } else {
        switchToTwoPanes();
    }

    switchToTwoPanes();

    return projectData;

    // saveDataToLocalStorage('projectData', projectData);
    // saveDataToLocalStorage('projectData', projectMapping);
}


// manipulates the DOM using the project data created by prepareAndCreateProjectData
function appendProjectData(projectData, list) {

    // checks if projectData exists
    if (!projectData) return;
     
    // destructures the projectData object to extract necessary details for DOM elements
    const { projectName, nextKey, image, alt } = projectData; 

    // creates an img element for the project and sets its src and alt attributes
    const imgElement = document.createElement('img');
    imgElement.src = image;
    imgElement.alt = alt;

    // creates a text node for the project name
    const textNode = document.createTextNode(projectName);

    // creates a list item li and assigns it to a class with the project's unique key
    const listItem = document.createElement('li');
    listItem.className = nextKey;

    // appends the image element and text node as its children
    listItem.appendChild(imgElement);
    listItem.appendChild(textNode);

    // appends the newly created list item to the provided list
    list.appendChild(listItem);
}


// ties project data creation and project data DOM manipulation steps
function appendNewProjectToList(input, list, listAttributesData, container) {

    // creates the new project's data based on the user's input
    const projectData = prepareAndCreateProjectData(input, listAttributesData);

    // adds the created project data to the DOM, visualizing the new project in the list
    appendProjectData(projectData, list);

    // checks if project data was successfully created and added
    if (projectData) {

        // potentially update any relevant functionalities tied to the new project
        selectProject(container);
    } else {

        // if input was empty, sets the input field's placeholder to prompt the user for a project name
        alert("Enter new project name.");
    }

    // clears input field after processing to prepare for the next input
    input.value = '';
}


// creates elements for the projects list and the new-project field
function appendProjectsListAndField(listAttributesData, fieldAttributesData, container) {

    // creates a div container for the projects list and sets its classes
    const listDiv = createElement('div', { 
        className: "section projects-list left" 
    });

    // creates a ul element for the projects list
    const list = createElement('ul');

    let projectsListText = loadDataFromLocalStorage('projectsListText');

    let projectMapping = loadDataFromLocalStorage('projectMapping');

    Object.keys(projectMapping).forEach(projectKey => {
        const projectIndex = projectKey.replace('Project', '');
        const projectTextKey = `p${projectIndex}`;
        if (!projectsListText.hasOwnProperty(projectTextKey)) {
            const projectName = projectMapping[projectKey].Project.text;
            projectsListText[projectTextKey] = projectName;
            saveDataToLocalStorage('projectsListText', projectsListText);
        }
    })

    projectsListText = loadDataFromLocalStorage('projectsListText');

    // loops through projectsListText and calls appendProjectsList on each project/key to populate the projects list
    for (const key in projectsListText) {
        appendProjectsList(key, list, listAttributesData, container);
    }
    
    // append the projects list to its container
    listDiv.appendChild(list);

    // creates a container for the input field
    const projectFieldDiv = createElement('div');

    // creates a label element for the input field and sets its for attribute
    const label = createElement('label', { 
        htmlFor: fieldAttributesData.for 
    });

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
        appendNewProjectToList(input, list, listAttributesData, container);
    });

    // adds a keyup event listener to the input field to call appendNewProjectName when the Enter key is hit
    input.addEventListener('keyup', function (event) {

        if (event.key === 'Enter') {
            appendNewProjectToList(input, list, listAttributesData, container);
        }
    });
}
    

// creates elements for the tasks project title and tasks list 
function appendTasksTitleAndList(projectData, container) {

    // clears any existing tasks list div before creating a new one
    const existingTasksListDiv = container.querySelector('.tasks-list');

    if (existingTasksListDiv) {

        // removes the existing tasks list div from the DOM
        existingTasksListDiv.remove();

        // creates and appends a new div element and adds the middle class back to it
        const clearedTasksListDiv = document.createElement('div');
        clearedTasksListDiv.classList.add('middle');
        container.appendChild(clearedTasksListDiv);
    } 

    // projectData = loadDataFromLocalStorage('projectData');

    if (projectData) {

        // assigns tasksTitleData to the value/object associated with projectData['Project'] key
        let tasksTitleData = projectData['Project'];

        // creates a div for the title and sets it classes
        const titleDiv = createElement('div', {
            className: "section project-title tasks-list-project " + tasksTitleData.position
        });

        // creates img element of the folder plus down-pointing arrow icon and sets its src and alt attributes 
        const img = createElement('img', {
            src: tasksTitleData.image, 
            alt: tasksTitleData.alt
        });

        // creates div for the title's text content and sets the div's id
        const textDiv = createElement('div', {
            textContent: tasksTitleData.text
        });

        // appends the img and text div elements to their title container
        titleDiv.appendChild(img);
        titleDiv.appendChild(textDiv);

        container.appendChild(titleDiv);

        // creates a div container for all the tasks in the list
        const tasksListDiv = createElement('div', {
            className: 'section tasks-list middle'
        });

        // iterates through keys/objects inside the projectData object
        for (let taskKey in projectData) {

            // move on if the key is Project (which contains properties for the title)
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
                isEditingTask = true;
                editingTaskId = this.parentElement.getAttribute('id');
            
                switchToThreePanes();
            
                populateFormFields(projectData, editingTaskId);

                let deleteTaskButton = document.getElementById('delete-task');

                deleteTaskButton.addEventListener('click', () => {
                    projectData = deleteTask(projectData, editingTaskId, container);

                    saveDataToLocalStorage('projectData', projectData);

                    const projectName = projectData.Project.text;
                    const formattedProjectName = projectName.replace(' ', '');
                    projectMapping[formattedProjectName] = projectData;

                    saveDataToLocalStorage('projectMapping', projectMapping);
                });
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
    }
}

// a prepareData function that processes the firstThreeTaskFields data and returns the processed data
function prepareAndCreateThreeTaskFieldsData(key, item) {
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
function prepareAndCreatePriorityTaskFieldData(key, item) {
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
function appendTaskFields(threeTaskFieldsData, fieldLabel, priorityTaskFieldData, container) {

    // creates a form container and sets its classes
    const formDiv = createElement('div', {
        className: 'section task-details right'
    });

    // creates a form and sets its attributes
    const form = createElement('form', {
        action: '', 
        method: 'post', 
        id: 'form'
    });

    // iterates through each object in the firstThreeTaskFields array object
    threeTaskFieldsData.forEach(data => {

        // for each object, create a label and set its attributes and text content
        const label = createElement('label', {
            htmlFor: data.labelFor,
            id: data.labelId,
            textContent: data.labelTextContent
        });

        // for each object, creates a task field div container and set its class
        const taskFieldDiv = createElement('div', {
            className: data.class
        });

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
    const priorityTaskFieldDiv = createElement('div', {
        className: 'priority-field'
    });

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
function appendStatusTaskField(statusTaskFieldData) {

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
function switchToThreePanes() {
    const stylesheet = document.getElementById('stylesheetToSwitch');

    if (stylesheet.href.endsWith('style2.css')) {
        stylesheet.href = 'style.css';
    }
} 

// switches from two panes to three panes 
function switchToTwoPanes() {
    const stylesheet = document.getElementById('stylesheetToSwitch');

    if (stylesheet.href.endsWith('style.css')) {
        stylesheet.href = 'style2.css';
    }
} 


// populates the form fields with the data for the task selected
function populateFormFields(projectData, taskId) {
    let taskData = projectData[taskId];

    let taskTitle = taskData["task-title"];

    let taskDescription = taskData['task-description'];

    let taskDueDate = taskData['task-duedate'];

    if (taskDueDate.includes('/')) {
        
        //splits the taskDueDate string into an array of substrings based on "/" as the delimiter
        const dateParts = taskDueDate.split('/');
        
        /* regex for the third substring, YYYY, then "-", then the first substring, MM, padded with a '0'
           if MM is a single digit, then "-", and lastly the second substring, DD, padded with a '0'
           if DD is a single digit */
        taskDueDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
    }

    let taskPriority = taskData['priority-level'];

    let taskStatus = taskData['status'];

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


// creates a new task in the DOM
function newTask() {
    isEditingTask = false;
    editingTaskId = null;

    // switches from two panes to three panes
    switchToThreePanes();

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

    let deleteTaskButton = document.getElementById('delete-task');

    deleteTaskButton.addEventListener('click', switchToTwoPanes);
}


// creates the middle pane for a selected project; updates the displayed content accordingly
function selectProject(container) {

    let projectsListText = loadDataFromLocalStorage('projectsListText');
    let projectMapping = loadDataFromLocalStorage('projectMapping');

    // get an array of keys from the projectsListText object, then iterates over these keys
    Object.keys(projectsListText).forEach(key => {
    
        // extracts the numeric part of the key by removing the first character "p"
        const projectIndex = key.substring(1);

        // tries to find a clickable DOM element with a class matching the current key (.p1, .p2, etc.)
        const projectTitleDiv = document.querySelector(`.${key}`);

        // checks if the projectTitleDiv was successfully found
        if (projectTitleDiv) {

            // adds an event listener to the projectTitleDiv that triggers a function when the element is clicked
            projectTitleDiv.addEventListener('click', () => {

                switchToTwoPanes();

                selectedProjectData = projectMapping ? projectMapping[`Project${projectIndex}`] : projectsListText[key];

                appendTasksTitleAndList(selectedProjectData, container);

            });
        }
    });
}


// gathers input data
function gatherTaskInputs() {

    // retrieves user inputs from their respective DOM elements, and returns an object containing all these values
    return {
    taskTitle: document.getElementById('each-task').value.trim(),
    taskDueDate: document.getElementById('task-duedate').value.trim(),
    taskDescription: document.getElementById('task-description').value.trim(),
    taskStatus: document.getElementById('status-dropdown').value,
    priorityLevel: document.querySelector('input[type="radio"][name="priority"]:checked') ? document.querySelector('input[type="radio"][name="priority"]:checked').nextElementSibling.textContent.trim().toLowerCase() : ''
    };
}


// creates task data from inputs
function prepareAndCreateTaskData(inputs) {

    // checks if any of the fields are missing or blank
    if (!inputs.taskTitle || !inputs.taskDueDate || !inputs.taskDescription || !inputs.taskStatus || !inputs.priorityLevel) {
        alert("One or more inputs are blank or not selected.");
        return;
    }

    // converts task due date into a Date object and formats it into a more readable string
    const date = new Date(inputs.taskDueDate + 'T00:00:00');
    const formattedDueDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    // returns a new task object with keys matching a structured task data format
    return {
        'task-title': inputs.taskTitle,
        'task-duedate': formattedDueDate,
        'task-description': inputs.taskDescription,
        'priority-level': inputs.priorityLevel,
        'status': inputs.taskStatus,
        'task-edit': "Edit",
    };
}


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


// updates projectData structure
function prepareAndCreateTaskInProjectData(projectData) {

    // collect form input data
    const inputs = gatherTaskInputs();

    // creates a structured task object from these inputs
    const taskData = prepareAndCreateTaskData(inputs);

    if (taskData) {
        // if editing an existing task
        if (editingTaskId !== null) {

            // updates the corresponding task in project data with the newly created task object
            projectData[editingTaskId] = taskData;

            saveDataToLocalStorage('projectData', projectData);

        // if creating a new task
        } else {

            // generates a new task Id based on the current size of projectData and adds the task object to projectData using the new Id
            const newTaskId = (Object.keys(projectData).length - 1).toString();
            projectData[newTaskId] = taskData;

            saveDataToLocalStorage('projectData', projectData);
        }

        const projectName = projectData.Project.text;
        const formattedProjectName = projectName.replace(' ', '');
        projectMapping[formattedProjectName] = projectData;

        saveDataToLocalStorage('projectMapping', projectMapping);
    }
}


// ties project data creation and project data DOM manipulation steps
function appendTask(projectData, container) {

    // retrieves a link element for a stylesheet 
    let stylesheet = document.getElementById('stylesheetToSwitch');

    // checks if the current stylesheet has three panes
    if (stylesheet.href.endsWith('style.css')) { 

        // updates projectData structure
        prepareAndCreateTaskInProjectData(projectData);

        // creates elements for the tasks project title and tasks list 
        appendTasksTitleAndList(projectData, container);

        // saves project items and tasks to localStorage every time new data is created or updated
        saveDataToLocalStorage('projectData', projectData);

        saveDataToLocalStorage('projectMapping', projectMapping);

        // switches stylesheet back to having two panes
        switchToTwoPanes();
    }
}


export { loadDataFromLocalStorage, prepareAndCreateDate, appendDate, prepareAndCreateObjectData, prepareAndCreateTitleData, appendTitles, prepareAndCreateButtonData, appendButtons, appendProjectsListAndField, appendTasksTitleAndList, prepareAndCreateThreeTaskFieldsData, prepareAndCreatePriorityTaskFieldData, appendTaskFields, appendStatusTaskField, selectProject  };