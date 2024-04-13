import {projectsListText as defaultProjectsListText, projectMapping  as defaultProjectMapping } from './config.js'

// saveDataToLocalStorage('projectsListText', projectsListText);
// saveDataToLocalStorage('projectMapping', projectMapping);

// flags for whether or not tasks are being edited or created
let isEditingTask = true;
let editingTaskId = null;

let projectMapping = loadDataFromLocalStorage('projectMapping');

// sets Project 1 data as initial data for page load
let selectedProjectData = projectMapping['Project1'];

// flags for whether or not new projects are being added
let isProjectButtonListenerAttached = false;
let isProjectInputListenerAttached = false;


// saves project items and tasks to localStorage every time; key is a string representing the name of the storage slot and data is data to be stored
function saveDataToLocalStorage(key, data) {

    // Local Storage can only store strings
    localStorage.setItem(key, JSON.stringify(data));
}

// checks if projectsListText and projectMapping are stored in Local Storage
function initializeProjectData() {

    // Checks if projectsListText is available in Local Storage, either loads it from Local Storage
    let projectsListText = loadDataFromLocalStorage('projectsListText');

    // or initializes projectsListText using imported object and then saves it to Local Storage
    if (!projectsListText || Object.keys(projectsListText).length === 0) {
        projectsListText = defaultProjectsListText; 
        saveDataToLocalStorage('projectsListText', projectsListText);
    }

    // Checks if projectMapping is available in Local Storage,     // either loads it from Local Storage
    let projectMapping = loadDataFromLocalStorage('projectMapping');

    // or initializes projectMapping using imported object and then saves it to Local Storage
    if (!projectMapping || Object.keys(projectMapping).length === 0) {
        projectMapping = defaultProjectMapping; 
        saveDataToLocalStorage('projectMapping', projectMapping);
    }
}


// checks for existing project items and tasks in localStorage when the application is first loaded
function loadDataFromLocalStorage(key) {

    // retrieves data stored in localStorage under the key; result is a JSON string or null if there is no data for the given key 
    const storedData = localStorage.getItem(key);

    // checks if storedData is truthy
    if (storedData) {

        // parses the JSON string back into a JavaScript object or array
        return JSON.parse(storedData);
    }

    // if storedData is null, function returns an empty object
    return {};
}


/* data function - returns a localized date string that was converted from a Date object, formatted to a specific locale and options */
function prepareAndCreateDate() {
    return new Date().toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric', 
        weekday: 'long' 
    });
}


// utility function - creates simple elements with attributes
function appendAndSetElementAttributes(type, attributes) {

    // creates an element of type
    const element = document.createElement(type);

    // for each key-value pair in the attributes object
    Object.entries(attributes).forEach(([key, value]) => {

        // if the key is textContent
        if (key === 'textContent') {

            // make the element's textContent the value
            element.textContent = value;
        } else {

            // if the key is not textContent, set the element's attributes/keys with corresponding values
            element.setAttribute(key, value);
        }
    });

    // returns the newly created element
    return element;
}


/* utility function - creates HTML elements: rest parameter allows for an indefinite number of arguments 
   representing child elements the rest parameter arguments get treated as an array inside the function */
function createElement(type, properties, ...children) {

    // type is the type of HTML element to be created
    const element = document.createElement(type);
        
    // properties is an object containing key-value pairs where values are property values to be set on the HTML element
    for (const key in properties) {

        /* for each key, set the corresponding property value on the element 
           ex. if properties is {id: myElement, className: myClass}, element will have id set to myElement and its className set to myClass */
        element[key] = properties[key];
    }
        
    // iterates over the children array, and for each child, appends the child to the parent element 
    children.forEach(child => {

        if (typeof child === 'string') {

            // if the child is a string, append a new text node from the string 
            element.appendChild(document.createTextNode(child));
        } else {

        // otherwise, append it as a HTML element
        element.appendChild(child);
        }
    });    

    // returns the HTML element
    return element;
}


/* utility function - adds event listenrs to DOM elements, making it easier to attach the sam3 event listener to
   multiple elements or to handle casses where elements are selected by string selectors or directly passed as
   references 
   callback is the function that will be executed when the event is triggered */
function addEventListenerUtility(selector, eventType, callback) {

    /* handles both string selectors for single elements and direct element references 
       checks if the selector is a string, if it is, document.querySelectorAll(selector) and returns a Nodelist 
       that is then converted to an array; if selector is not a string, it is a direct element reference, 
       creates an array with the element as its only item */
    const elements = typeof selector === 'string' ? document.querySelectorAll(selector) : [selector];

    // iterates over the array of elements
    elements.forEach(element => {

        if (element) {
            // if element exists, calls addEventListener on it 
            element.addEventListener(eventType, callback);
        }
    });
}


// DOM function - creates an element for Date string and appends it to the page container
function appendDate(dateData, container) {

    // creates a date div and sets its classes and text content 
    const dateDiv = createElement('div', { 
        className: "section date middle", 
        textContent: dateData 
    });
    
    // appends the date div to the page
    container.appendChild(dateDiv);
}


/* data function - takes in a data object made up of key-value pairs, prepareFunction processes it and pushes the processed data into an array */
function prepareAndCreateObjectData(obj, prepareAndCreateFunction) {

    // initializes processedData as empty array
    const processedData = [];

    // iterates over each key in obj
    for (const key in obj) {

        // item is assigned the value of the current property being iterated over
        const item = obj[key];

        // calls prepareFunction, passing it the current key and its value, and pushes the result of the prepareFunction into the processedData array
        processedData.push(prepareAndCreateFunction(key, item));
    }

    // returns processedData array
    return processedData;
}


// data function - prepareData function that processes the title object and returns the processed data
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


// DOM function - creates elements for the processed titles data and appends them to the page container
function appendTitles(titlesData, container) {

    /* iterates over an array of processed title data/objects, each object includes the title's classes, title's image data, alt text data, and text content */
    titlesData.forEach(data => {

        /* for each processed object in the array (projects-title or each-task-title), creates a div element, and sets its classes by joining all class names 
           provided in data.classes with a space between the classes */
        const titleDiv = createElement('div', {
            className: data.classes.join(' ')
        });

        // creates an img element, and sets its src and alt attributes according to the processed object 
        const img = appendAndSetElementAttributes('img', {src: data.imageSrc, alt: data.imageAlt});

        /* if data.textClass exists (if textClass is a key in the processed object), uses that value as text content,
           otherwise, defaults to an empty string as text content */
        data.textClass ? `${data.textClass}` : '';

        // creates a div for the text content and sets the div's classes and text content 
        const textDiv = appendAndSetElementAttributes('div', {textContent: data.textContent});

        // append img and text content div elements to their container, titleDiv 
        titleDiv.appendChild(img);
        titleDiv.appendChild(textDiv);

        // append the titleDiv container to the page
        container.appendChild(titleDiv);
    });
}


// data function - prepareData function that processes the buttons object and returns the processed data
function prepareAndCreateButtonData(key, item) {

    return {

        /* takes the current key and its value of a button object, processes it, and then returns it
            sets classes property for the object, sets its id property, sets its text content */
        classes: ["section", key, item.position],
        id: item.id,
        textContent: item.text
    };
}


// DOM function - creates elements for the processed buttons data and appends them to the page container
function appendButtons(buttonsData, listAttributesData, fieldAttributesData, container) {

    /* iterates over an array of button objects, each object includes the button's id and text content, 
       and classes for the div the button is nested into */
    buttonsData.forEach(data => { 

        // creates a button element and sets its id attribute and text content 
        const button = appendAndSetElementAttributes('button', {id: data.id, textContent: data.textContent});

        /* creates a div container for the button, and sets its classes by joining all class names provided in data.classes with a space between them */
        const buttonDiv = createElement('div', {
            className: data.classes.join(' ')
        });

        // appends the button to its container, buttonDiv
        buttonDiv.appendChild(button);

        // appends the buttonDiv container to the container
        container.appendChild(buttonDiv);
    });

    // newTaskButton is assigned to the element whose id is 'new-task'
    addEventListenerUtility("#new-task", 'click', () => {

        // runs the newTask function when the button is clicked
        newTask();

        /* attaches an event listener to each of the projects in the projects list, and switch the layout to two panes 
           when any of them are clicked */
        addEventListenerUtility('li', 'click', switchToTwoPanes);
    });


    // adds a click event listener to saveTaskButton 
    addEventListenerUtility("#save-task", 'click', () => {

        // get the projectName
        let projectNameText = selectedProjectData['Project'].text;

        // find the project key corresponding to the projectName in projectMapping
        let projectKey = findProjectKeyByProjectText(projectNameText);

        if (projectKey) {

            /* run the appendTask function if the project key is found, when the button is clicked 
               and appends the edited or new task to the selectedProjectData */
            appendTask(selectedProjectData, listAttributesData, fieldAttributesData, container);
        // } else {

            // if project key is not found, the project's been deleted, run appendTask on the first project in projectMapping
            // let alternateProjectData = Object.keys(projectMapping)[0];
            // appendTasksTitleAndList(selectedProjectData, listAttributesData, fieldAttributesData, container);
        }
    });
    
    // adds a click event listener to deleteProjectButton
    addEventListenerUtility("#delete-project", 'click', () => {

       let projectMapping = loadDataFromLocalStorage('projectMapping');

        let firstProject = Object.values(projectMapping)[0];

        if (selectedProjectData['Project']['text'] === firstProject['Project']['text'] ) {
            
            // if the first project is selected for deletion, do not allow and show pop-up
            alert("First project is the default project and cannot be deleted.")
        
        } else {
            
            // runs the deleteProject function when the button is clicked
            deleteProject(selectedProjectData, listAttributesData, fieldAttributesData, container);
        }
    });
}


// DOM function - listens for a new project input keyup or button click
function listenForNewProject(listAttributesData, container) {

    // handler function that is triggered when the new project button is clicked or when the Enter key is pressed in the input field
    const handleAppendNewProject = () => {

        // fetches the input value and trims any whitespace from it
        let input = container.querySelector("#add-new-project");
        const trimmedValue = input.value.trim();

        // checks if the trimmed input value is not empty and if not, proceeds to append project data
        if (trimmedValue) {
            appendProjectData(listAttributesData, container);

        // if trimmed value is empty, alerts the user to enter a project name
        } else {
            alert("Enter new project name.");
        }
    };

    // checks if event listener for new project button is not already attached using a flag
    if (!isProjectButtonListenerAttached) {

        //adds a click event listener to the new project button which triggers the handler function
        let newProjectButton = container.querySelector("#new-project");
        newProjectButton.addEventListener('click', handleAppendNewProject);

        // sets the flag to true
        isProjectButtonListenerAttached = true;
    }

    // checks if the event listener for the input field is not already attached using another flag
    if (!isProjectInputListenerAttached) {

        // adds a enter keyup event listener to the input field which triggers the handler function
        let input = container.querySelector("#add-new-project");
        input.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                handleAppendNewProject();
            }
        });

        // sets the flag to true
        isProjectInputListenerAttached = true;
    }
}


// data function - removes a specific project 
function deleteProject(projectData, listAttributesData, fieldAttributesData, container) {

    let projectMapping = loadDataFromLocalStorage('projectMapping');

    // checks that projectData is not null or undefined
    if (projectData) {
        /* converts projectMapping into an array of key value pairs, where each pair represents one 
            one property of projectMapping, iterates through these pairs using a destructuring assignment */
        let targetObjectKey = Object.entries(projectMapping).find(([key, value]) => 

            /* checks each value/object inside projectMapping to see if it has a Project property and if so, 
                whether the text project of this Project matches the text projecty of the Project object of
                projectData */
            value.Project && value.Project.text === projectData['Project'].text
            
        /* ? presents errors if the previous operation returns undefined 
            [0] access the first element of the array returned by find */
        )?.[0];

        // removes the project entry from projectMapping
        delete projectMapping[targetObjectKey];

        saveDataToLocalStorage('projectMapping', projectMapping);

        let projectsListText = loadDataFromLocalStorage('projectsListText');

        // searches for the key in projectsListText that maps to the project name to be deleted
        let keyToDelete = Object.keys(projectsListText).find(key => projectsListText[key] === projectData['Project'].text);

        // if the key is found
        if (keyToDelete) {

            // deletes that key-value pair from projectsListText
            delete projectsListText[keyToDelete];

            saveDataToLocalStorage('projectsListText', projectsListText);
        }

        projectMapping = loadDataFromLocalStorage('projectMapping');

        // gets just the keys in the projectMapping object
        const keys = Object.keys(projectMapping);

        // checks if there are any projects left in projectMapping by retrieving the keys and checking their count
        if (keys.length > 0) {

            // selects the first remaining project by key
            const firstKey = keys[0];

            // uses the firstKey's data to select projectData for first remaining project
            const firstProjectData = projectMapping[firstKey];

            // removes the old, pre-deletion projects list
            const div = container.querySelector('.section.projects-list.left');

            if (div) {
                div.remove();
            }

            // updates and displays the projects list and field 
            appendProjectsListAndField(listAttributesData, fieldAttributesData, container);

            // updates and displays the tasks associated with the first project
            appendTasksTitleAndList(firstProjectData, listAttributesData, fieldAttributesData, container);
        }
    }
}


// data function - creates projectData based on user input
function prepareAndCreateProjectData(listAttributesData, container) {

    // gets the new project input field
    let input = container.querySelector("#add-new-project");

    // checks if the input field has a value and trims off its whitespace
    if (!input.value.trim()) {

        // alert if input field has no value
        alert("Enter new project name.");
    } else {

    // otherwise assign input value to projectName
    let projectName = input.value.trim();

    let projectsListText = loadDataFromLocalStorage('projectsListText');

    // generates a unique key for projectsListText by first removing and returning last key
    const lastKey = Object.keys(projectsListText).pop();

    /* gets just the numeric part of the last key, by removing the first character of lastKey, substring should start from index 1
        and converts the number to an int */
    const numericPartOfLastKey = parseInt(lastKey.substring(1), 10);

    // increments the numeric part by 1, concatenates p in front, and that is the next key
    const nextKey = `p${numericPartOfLastKey + 1}`;

    // adds the new project name to projectsListText using nextKey
    projectsListText[nextKey] = projectName;

    saveDataToLocalStorage('projectsListText', projectsListText);

    let projectMapping = loadDataFromLocalStorage('projectMapping');

    // generates a unique key for projectMapping similar to nextKey by first removing and returning the last key
    const lastProjectKey = Object.keys(projectMapping).pop();

    // gets just the numeric part of the last key and converts it to an int
    const numericPartOfLastProjectKey = parseInt(lastProjectKey.replace('Project', ''), 10);

     // increments the numeric part by 1, concatenates Project in front, and that is the nextProjectKey
    const nextProjectKey = `Project${numericPartOfLastProjectKey + 1}`;

    // creates a new project object with detailed information (position, image, alt text, project name) and adds it to projectMapping using newProjectKey 
    projectMapping[nextProjectKey] = {
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
}


// DOM function - manipulates the DOM using the project data created by prepareAndCreateProjectData
function appendProjectData(listAttributesData, container) {

    // gets the projects list
    let list = container.querySelector("ul");

    // creates the new project's data based on the user's input
    const projectData = prepareAndCreateProjectData(listAttributesData, container);

    // checks if projectData exists
    if (!projectData) return;
     
    // destructures the projectData object to extract necessary details for DOM elements
    const { projectName, nextKey, image, alt } = projectData; 

    /* creates a list item li and assigns it to a class with the project's unique key,
       creates a text node for the project name, 
       appends the image element and text node as its children */
    const listItem = createElement('li', {className: nextKey},

        // creates an img element for the project and sets its src and alt attributes
        createElement('img', {src: image, alt: alt}),
        projectName);

    // appends the newly created list item to the provided list
    list.appendChild(listItem);
}


/* DOM function - creates li elements for projectsListText data and appends them with their attributes
   key is the unique identifier for the project; list is the ul element to which the project list item will be appended; listAttributesData
   is the object containing data for setting attributes on the list item's child elements, like an image */
   function appendProjectsListItem(key, list, listAttributesData) {

    let projectsListText = loadDataFromLocalStorage('projectsListText');

    // fetches the project name using the key from the projectsListText
    const projectName = projectsListText[key];

    // creates a text node with projectName as text content
    let textNode = document.createTextNode(projectName);

    // creates li element, appends img element and text node as children
    let projectDiv = createElement('li', { className: key },

    // creates and configures the arrow pointing right image, the icon associated with each project
    createElement('img', {src: listAttributesData.image, alt: listAttributesData.alt}), 
        textNode); 

    // adds an event listener to the li element
    projectDiv.addEventListener("click", () => {

        let projectMapping = loadDataFromLocalStorage('projectMapping');

        // replaces the space in the project name with no space, and this is the key to retrieve the selectedProjectdata
        let targetObjectKey = Object.entries(projectMapping).find(([key, value]) => 
                value.Project && value.Project.text === projectName
        )?.[0];

        // retrieves selectedProjectData from projectMapping
        selectedProjectData = projectMapping[targetObjectKey]; 
    });

    // appends the newly created li element to the ul element
    list.appendChild(projectDiv);
}


// DOM function - creates elements for the projects list and the new-project field
function appendProjectsListAndField(listAttributesData, fieldAttributesData, container) {

    // creates a div container for the projects list and sets its classes
    let listDiv = createElement('div', {className: "section projects-list left"});

    // creates a ul element for the projects list
    let list = createElement('ul', {});

    let projectsListText = loadDataFromLocalStorage('projectsListText');

    // loops through projectsListText and calls appendProjectsListItem on each project/key to populate the projects list
    for (const key in projectsListText) {
        appendProjectsListItem(key, list, listAttributesData);
    }

    // append the projects list to the projects list container
    listDiv.appendChild(list);

    // creates a container for the input field 
    const projectFieldDiv = createElement('div');

    // creates a label element for the input field and sets its for attribute
    const label = appendAndSetElementAttributes('label', {for: fieldAttributesData.for});

    // creates the input field with type, id, and placeholder attributes from fieldAttributesData key values 
    let input = appendAndSetElementAttributes('input', {
        type: fieldAttributesData.type,
        id: fieldAttributesData.id,
        placeholder: fieldAttributesData.placeholder
    });

    // appends the label and input to the input field container
    projectFieldDiv.appendChild(label);
    projectFieldDiv.appendChild(input);

    // appends the input field container to the projects list container
    listDiv.appendChild(projectFieldDiv);

    // appends the list container to the page 
    container.appendChild(listDiv);

    // attaches event listeners to the new project input field add new project button
    listenForNewProject(listAttributesData, container);
    
    // makes the projects list item selectable
    selectProject(listAttributesData, fieldAttributesData, container);
}


// DOM function - creates elements for the tasks project title and tasks list 
function appendTasksTitleAndList(projectData, listAttributesData, fieldAttributesData, container) {

    // // clears any existing tasks list div before creating a new one
    // let existingTasksListDiv = container.querySelector('.tasks-list');

    // if (existingTasksListDiv) {

    //     // removes the existing tasks list div from the DOM
    //     existingTasksListDiv.remove();

    //     // creates and appends a new div element 
    //     const clearedTasksListDiv = document.createElement('div');

    //     // adds the middle class back to the new div element
    //     clearedTasksListDiv.classList.add('middle');

    //     // creates and appends a new div element
    //     const clearedTaskDetailsDiv = document.createElement('div');

    //     // adds a new right class back to the new div element
    //     clearedTaskDetailsDiv.classList.add('new-right');

    //     // appends the two new div elements to the page 
    //     container.appendChild(clearedTasksListDiv);
    //     container.appendChild(clearedTaskDetailsDiv);
    // } 

    if (projectData) {

        // assigns tasksTitleData to the value/object associated with projectData['Project'] key */
        let tasksTitleData = projectData['Project'];

        /* creates a div for the title and sets it classes 
           creates div for the title's text content and sets the div's id 
           appends the img and text div elements to their title container */
        let titleDiv = createElement('div', {
            className: "section project-title tasks-list-project " + tasksTitleData.position,     

        // creates img element of the folder plus down-pointing arrow icon and sets its src and alt attributes 
         }, createElement('img', {src: tasksTitleData.image, alt: tasksTitleData.alt}), tasksTitleData.text);
        
        // appends the titleDiv to the page container
        container.appendChild(titleDiv);

        // creates a div container for all the tasks in the list
        const tasksListDiv = createElement('div', {className: 'section tasks-list middle'});

        // iterates through keys/objects inside the projectData object
        for (let taskKey in projectData) {

            // move on if the key is Project (which contains properties for the title)
            if (taskKey === 'Project') continue;

            // data assigned to the value/object associated with projectData[taskKey]
            let data = projectData[taskKey];

            /* creates a div container for "Edit", task title, "Task Description", "Task Due Date", 
               "Priority Level", and "Status" elements and sets its class and id 
               appends 4 shown elements and 2 hidden elements to the task container */
            let taskDiv = createElement('div', {className: 'task', id: taskKey},
                
                // creates a div for "Edit" and sets its class and text content 
                createElement('div', {className: "task-edit", textContent: data["task-edit"]}),
                        
                // creates a div for the task title key's value and sets its class and text content
                createElement('div', {className: "task-title", textContent: data["task-title"]}),
            
                // creates a div for "Task Description" and sets its class and text content
                createElement('div', {className: "task-description", textContent: data["task-description"]}),
            
                /* creates a div for "Task Due Date" and sets its text content and 
                    sets its color class based on the value of its priority-level property */
                createElement('div', {
            
                    /* if the priority-level is high, set its color class to red 
                    if the priority-level is medium, set its color class to yellow
                    if the priority-level is low, set its color class to green */
                    className: `task-duedate ${data["priority-level"] === "high" ? "red" : data["priority-level"] === "medium" ? "yellow" : "green"}`,
                    textContent: data["task-duedate"]
                    }),
            
                    // creates a div for "Priority Level", and sets its text content and classes, including the hide class
                    createElement('div', {className: `priority-level hide`, textContent: data["priority-level"]}),
            
                    // creates a div for "Status" and sets its text content and classes, including the hide class
                    createElement('div', {className: `status hide`, textContent: data["status"]})
            );

            // adds a click event listener to the Edit div element
            taskDiv.querySelector('.task-edit').addEventListener('click', function() {
            
                // when Edit is clicked
                isEditingTask = true;

                // gets editingTAskId value from the id attribute of taskEditDiv's parent element
                editingTaskId = this.parentElement.getAttribute('id');
            
                // swtiches layout to three panes
                switchToThreePanes();
            
                // populateFormFields to populate the task form fields with values from the object
                populateFormFields(projectData, editingTaskId);

                // gets delete task button
                let deleteTaskButton = document.getElementById('delete-task');

                // adds event listener to delete task button 
                deleteTaskButton.addEventListener('click', () => {

                    // runs deleteTask and assigns updated projectData to projectData
                    projectData = deleteTask(projectData, editingTaskId, listAttributesData, fieldAttributesData, container);
                });
            });

            // appends the task container to the tasks list container 
            tasksListDiv.appendChild(taskDiv);
        }

        // appends the tasks list container to the page
        container.appendChild(tasksListDiv);
    }
}


// utility function - finds the project key of a project in projectMapping using its project name text
function findProjectKeyByProjectText(projectText) {

    let projectMapping = loadDataFromLocalStorage('projectMapping');

    // iterates through the project keys of projectMapping
    for (let key in projectMapping) {

        // if the Project.text of a project in projectMapping with a specific key matches the project name text
        if (projectMapping[key]['Project']['text'] === projectText) {

            // return the matching key
            return key;
        }
    }

    // otherwise return null
    return null;
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


// DOM function - creates and appends four task fields and a label for the fourth field to the page container
function appendTaskFields(threeTaskFieldsData, fieldLabel, priorityTaskFieldData, container) {

    // creates a form container and sets its classes
    const formDiv = createElement('div', {className: 'section task-details right'});

    // creates a form and sets its attributes
    const form = appendAndSetElementAttributes('form', {action: '', method: 'post', id: 'form'});

    // iterates through each object in the firstThreeTaskFields array object
    threeTaskFieldsData.forEach(data => {

        // for each object, creates a task field div container and set its class
        const taskFieldDiv = createElement('div', {className: data.class});

        // for each object, create a label and set its attributes and text content
        const label = appendAndSetElementAttributes('label', {
            for: data.labelFor, 
            id: data.labelId, 
            textContent: data.labelTextContent
        });

        // appends each label to each task field div
        taskFieldDiv.appendChild(label);

        // if the object has a key of inputType, creates an input element and sets its attributes 
        if (data.inputType) {
            const input = appendAndSetElementAttributes('input', {
                type: data.inputType, 
                id: data.inputId
            });
            // appends the input element to its task field div container
            taskFieldDiv.appendChild(input);
        }

        // if the object has a key of textareaName, creates a textarea element and set its attributes 
        if (data.textareaName) {
            const textarea = appendAndSetElementAttributes('textarea', {
                name: data.textareaName, 
                id: data.textareaId
            });
            // appends the textarea to its task field div container
            taskFieldDiv.appendChild(textarea);
        }
        // appends each task field div to the form element
        form.appendChild(taskFieldDiv);
    });

    // creates div container for the Priority main label, input, and input label elements
    const priorityTaskFieldDiv = createElement('div', {className: 'priority-field'});

    // creates main label element with "Priority" as text content 
    const priorityTaskFieldLabel = appendAndSetElementAttributes('label', {
        id: fieldLabel["label-id"],
        textContent: fieldLabel["label-text"]
    });

    // appends main label to the div container
    priorityTaskFieldDiv.appendChild(priorityTaskFieldLabel);

    /* iterates through the priorityTaskFieldData object array, and for each object, 
        creates an input element and set its attributes */
    priorityTaskFieldData.forEach(data => {
        const input = appendAndSetElementAttributes('input', {
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


// DOM function - creates and appends the status dropdown field to the page container
function appendStatusTaskField(statusTaskFieldData) {

    // returns the form element
    const form = document.getElementById("form");

    // iterates through the array keyed to "options" in the statusTaskFieldData object
    const optionsElements = statusTaskFieldData.options.map(option => 

        // for each element in the options array, creates an option element and sets its attributes
        appendAndSetElementAttributes('option', {
            value: option.value, 
            textContent: option.text
        })
    );

    // creates a select element and sets its attributes and options
    const select = createElement('select', 
        {name: statusTaskFieldData.name, id: statusTaskFieldData["select-id"]}, 
        ...optionsElements);

    // creates a label element and sets its attributes
    const label = appendAndSetElementAttributes('label', {
        for: statusTaskFieldData.for,
        id: statusTaskFieldData["label-id"],
        textContent: statusTaskFieldData["label-text"]
    });

    // creates a div container for the select (with its options) and label elements 
    const statusTaskFieldDiv = createElement('div', 
        {className: statusTaskFieldData.class}, 
        label, 
        select);

    // appends the status dropdown div container to the page container
    form.appendChild(statusTaskFieldDiv);
}


// DOM function - switches from two panes to three panes 
function switchToThreePanes() {
    const stylesheet = document.getElementById('stylesheetToSwitch');

    if (stylesheet.href.endsWith('style2.css')) {
        stylesheet.href = 'style.css';
    }
} 


// DOM function - switches from two panes to three panes 
function switchToTwoPanes() {
    const stylesheet = document.getElementById('stylesheetToSwitch');

    if (stylesheet.href.endsWith('style.css')) {
        stylesheet.href = 'style2.css';
    }
} 


// DOM function - populates the form fields with the data for the task selected
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


// data function - removes a specific task from a project's data structure and updates the display accordingly
function deleteTask(projectData, editingTaskId, listAttributesData, fieldAttributesData, container) {

    // checks if editingTaskId flag is not null, meaning there is a specific task selected for deletion
    if (editingTaskId !== null) {

        // deletes the task from projectData, removing the key-value pair where the key is editingTaskId from the projectData object
        delete projectData[editingTaskId];

        // gets the project name of the updated projectData
        let projectNameText = projectData['Project'].text;
        
        // gets the project key for the project in projectMapping that matches the updated projectData
        let projectKey = findProjectKeyByProjectText(projectNameText);

        let projectMapping = loadDataFromLocalStorage('projectMapping');
        
        // uses the key to update projectMapping
        projectMapping[projectKey] = projectData;
        
        saveDataToLocalStorage('projectMapping', projectMapping);

        // resets the editing state to indicate no task is currently selected for editing or deletion
        editingTaskId = null;

        // refreshes the task list displayed in the container
        appendTasksTitleAndList(projectData, listAttributesData, fieldAttributesData, container);

    // if there is no editingTaskId, changes the UI layout to reflect state where no task is selected    
    } else {

        switchToTwoPanes();
    }

    // ensures that UI is always reset
    switchToTwoPanes();

    return projectData;
}


// DOM function - creates a new task in the DOM
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

    // adds an event listener to the delete task button that straight switches the layout to two panes after a new task is created
    addEventListenerUtility('#delete-task', 'click', switchToTwoPanes);
}


// DOM function - gathers input data
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


// data function - creates task data from inputs
function prepareAndCreateTaskData(inputs, listAttributesData, fieldAttributesData, container) {

    // checks if any of the fields are missing or blank
    if (!inputs.taskTitle || !inputs.taskDueDate || !inputs.taskDescription || !inputs.taskStatus || !inputs.priorityLevel) {
        alert("One or more inputs are blank or not selected.");

        appendTasksTitleAndList(selectedProjectData, listAttributesData, fieldAttributesData, container);

        return;
    }

    switchToTwoPanes();

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


// finds the last numeric task id
function findLastNumericTaskId(projectData) {

    let lastNumericTaskId;

    // extracts the keys of the projectData
    const taskIds = Object.keys(projectData);

    const containsNumericKeys = taskIds.some(key => /^\d+$/.test(key));

    if (!containsNumericKeys) {

        lastNumericTaskId = null;

        return lastNumericTaskId;
    } else {

        // filter keys to remove non-numeric ones, and convert to numbers
        const numericTaskIds = taskIds.filter(taskId => !isNaN(taskId)).map(Number);

        // find the max value among numeric keys
        let lastNumericTaskId = Math.max(...numericTaskIds);

        return lastNumericTaskId;
    }
}


// data function - updates projectData structure
function prepareAndCreateTaskInProjectData(projectData, listAttributesData, fieldAttributesData, container) {

    // collect form input data
    const inputs = gatherTaskInputs();

    // creates a structured task object from these inputs
    const taskData = prepareAndCreateTaskData(inputs, listAttributesData, fieldAttributesData, container);

    if (taskData) {
        // if editing an existing task
        if (editingTaskId !== null) {

            // updates the corresponding task in project data with the newly created task object
            projectData[editingTaskId] = taskData;

            // gets the project key of the project in projectMapping that matches the projectData name
            let projectKey = findProjectKeyByProjectText(projectData['Project'].text);

            let projectMapping = loadDataFromLocalStorage('projectMapping');

            // updates projectMapping with the lastest projectData under this formatted project name
            projectMapping[projectKey] = projectData;
    
            saveDataToLocalStorage('projectMapping', projectMapping);

        // if creating a new task
        } else {

            // gets a new task id by getting the length of keys in projectData and decrementing by 1
            let newTaskId = findLastNumericTaskId(projectData);

            if (newTaskId !== null) {
                newTaskId = (Number(newTaskId) + 1).toString();
            } else {
                newTaskId = '0';
            }

            // adds the new taskData object to projectData using the new id
            projectData[newTaskId] = taskData;

            // gets the project key of the project in projectMapping that matches the projectData name
            let projectKey = findProjectKeyByProjectText(projectData['Project'].text);

            let projectMapping = loadDataFromLocalStorage('projectMapping');

            // updates projectMapping with the lastest projectData under this formatted project name
            projectMapping[projectKey] = projectData;

            saveDataToLocalStorage('projectMapping', projectMapping);
        }

        return projectData;
    }
}



// DOM function - ties project data creation and project data DOM manipulation steps
function appendTask(projectData, listAttributesData, fieldAttributesData, container) {

    // retrieves a link element for a stylesheet 
    let stylesheet = document.getElementById('stylesheetToSwitch');

    // checks if the current stylesheet has three panes
    if (stylesheet.href.endsWith('style.css')) { 

        // updates projectData structure
        let workingProjectData = prepareAndCreateTaskInProjectData(projectData, listAttributesData, fieldAttributesData, container);

        // creates elements for the tasks project title and tasks list 
        appendTasksTitleAndList(workingProjectData, listAttributesData, fieldAttributesData, container);
    }
}


// DOM function - sets up an event listener to manage selecting a project from a list
function selectProject(listAttributesData, fieldAttributesData, container) {

    document.querySelector('#content').addEventListener('click', function(event) {

        // uses the closest method to find the target li element
        const projectItem = event.target.closest('li');

        // if a projectItem is found, converts the classList of projectItem into an array 
        if (projectItem) {

            // classList property returns a live DOMTokenList of all classes on the element and Array.from converts this list into a regular array
            const classListArray = Array.from(projectItem.classList);

            // searches the array of class names to find the first class that starts with the letter p
            const projectIndexClass = classListArray.find(className => className.startsWith('p'));

            // if a class name starting with p was found, extracts substring from projectIndexClass starting from the second character to the end, the number
            if (projectIndexClass) {
                const projectIndex = projectIndexClass.substring(1);

                // handles logic for selecting a project based on its index
                selectProjectByIndex(projectIndex, listAttributesData, fieldAttributesData, container); 
            }
        }
    });
}
 

// DOM function - selects a project based on a given index from a list
function selectProjectByIndex(projectIndex, listAttributesData, fieldAttributesData, container) {

    let projectMapping = loadDataFromLocalStorage('projectMapping');
    let projectsListText = loadDataFromLocalStorage('projectsListText');

    // finds the first DOM element that matches the class .p{projectIndex} 
    const projectTitleDiv = document.querySelector(`.p${projectIndex}`);

    // if the element exists, adjusts the UI to display two panes
    if (projectTitleDiv) {
        switchToTwoPanes();

        /* checks if projectMapping is non-null and retrieves the project data using the key Project{projectIndex} 
           if projectMapping is null, gets the data from projectsListText using a similar key format */
        selectedProjectData = projectMapping ? projectMapping[`Project${projectIndex}`] : projectsListText[`p${projectIndex}`];

        // populates the UI with tasks and title details related to the selected project
        appendTasksTitleAndList(selectedProjectData, listAttributesData, fieldAttributesData, container);

        return selectedProjectData;
    }
}


export { initializeProjectData, loadDataFromLocalStorage, prepareAndCreateDate, appendDate, prepareAndCreateObjectData, prepareAndCreateTitleData, appendTitles, prepareAndCreateButtonData, appendButtons, appendProjectsListAndField, appendTasksTitleAndList, prepareAndCreateThreeTaskFieldsData, prepareAndCreatePriorityTaskFieldData, appendTaskFields, appendStatusTaskField };