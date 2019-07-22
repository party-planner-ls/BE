# BE
Back End Repo for Party Planner App - LS


https://party-planner-ls.herokuapp.com/

//Login endoint -- POST
https://party-planner-ls.herokuapp.com/api/auth/login
{
email:'',
password:''
}
//Register endpoint -- POST
https://party-planner-ls.herokuapp.com/api/auth/register
{
email:'',
password:''
}

//Party endpoint -- CRUD
https://party-planner-ls.herokuapp.com/api/party
{
guests: integer,
theme: string,
date: string,
budget: integer,
user_id(logged in user): integer
}

//Lists out all the lists in this specific party -- GET
https://party-planner-ls.herokuapp.com/api/party/list/todo
https://party-planner-ls.herokuapp.com/api/party/list/entertainment
https://party-planner-ls.herokuapp.com/api/party/list/items

CRUD -- GET/POST/PUT/DELETE
//Is a list of all the accessible components of the lists
https://party-planner-ls.herokuapp.com/api/shoppinglist
{party_id: integer}

https://party-planner-ls.herokuapp.com/api/todolist
{
party_id: integer
}

https://party-planner-ls.herokuapp.com/api/items
{
name: string,
purchased: false(flip when purchased done on FE),
shopping_list_id: integer,
price: integer
}
https://party-planner-ls.herokuapp.com/api/todo
{
name: string,
completed: false(flip when completed),
todo_list_id: integer
}

https://party-planner-ls.herokuapp.com/api/entertainment

{
name: string,
completed: false(flip when completed),
todo_list_id: integer,
price: integer
}