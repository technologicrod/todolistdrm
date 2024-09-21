This is a Django-React-MySQL Todo App.

The Django backend is located in the todo_project folder.
The React frontend is located in the todo_frontend folder.

To setup for database is located in the settings.py located in todo_project -> todo_project ->settings.py under
the Database setting. Use MySQL with schema/database named as 'todo'.
1. create and use MySQL with schema/database named as 'todo'.
2. open Gitbash
3. cd todo_project
4. py manage.py makemigrations
5. py manage.py migrate
6. check if the tables are reflected in the MySQL

To run the Django backend:
1. open Gitbash
2. 'cd todo_project'
3.' py manage.py runserver'

To run the React frontend:
1. open CMD
2. 'cd todo-frontend'
3. to install node modules, 'npm install'
3. 'npm start'


To create an account:
1. click the Register button
2. input username, password, confirm password, and check the box in Admin Account? if intended for admin access, else, keep unchecked.
3. click Register

To login:
1. enter username and password
2. if invalid credentials, shows 'Invalid credentials. Please try again.'
3. if not an admin account, shows 'Forbidden access. You do not have permission to view this resource.'
4. if admin, shows todo list page

To add todo:
1. input Title, Description, and Status
2. click Add Todo button

To view each todo:
1. click View button under the Actions column
2. then, it would output the details below the table

To update todo:
1. after clicking 'View', Update Details inputs are available below
2. update data if needed
3. press Update Todo to update, Cancel for cancellation

To delete todo:
1. click Delete button under the Actions column

To logout:
1. click the Logout button and the token will be cleared for the current account