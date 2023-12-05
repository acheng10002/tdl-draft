# todo-list

What kind of properties will my todo-items have? 
At a minimum they should have a title, description, dueDate and priority. You might also want to include notes or even a checklist.

My todo list should have projects or separate lists of todos. 
When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. 
Users should be able to create new projects and choose which project their todos go into.

I should separate your application logic 
(i.e. creating new todos, 
setting todos as complete, 
changing todo priority etc.) 
from the DOM-related stuff, so keep all of those things in separate modules.

The look of the User Interface is up to me, but it should be able to do the following:
1. view all projects
2. view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
3. expand a single todo to see/edit its details
4. delete a todo
