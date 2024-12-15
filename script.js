document.addEventListener('DOMContentLoaded', function () {
    //table created 
    const table = new Tabulator("#task-table", {
        layout: "fitColumns",
        columns: [
            {title: "Task ID", field: "id", editor: false},
            {title: "Title", field: "title", editor: "input",},
            {title: "Description", field: "description", editor: "input"},
            {title: "Status", field: "status", editor: "input", editorParams: {values: ["To Do", "In Progress", "Done"]}},
            {title : "Delete Task",formatter: "buttonCross", width: 40, align: "center", cellClick: function(e, cell){
                cell.getRow().delete();
                alert("Task is deleted")
            }}
        ],
    });
//fetch data form api
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            const tasks = data.slice(0, 20).map(task => ({
                id: task.id,
                title: task.title,
                description: '',
                status: task.completed ? 'Done' : 'To Do'
            }));
            table.setData(tasks);
        });
// add the task to table
    document.getElementById('add-task').addEventListener('click', function (e) {
        e.preventDefault()
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const status = document.getElementById('status').value;
        //console.log(title+" "+description +" " + status)
        if (title && status) {
            table.addRow({id: table.getDataCount() + 1, title, description, status});
            alert("Task is added")
        }
    });
//filter based on the status of the task
    document.getElementById('status-filter').addEventListener('change', function () {
        const filter = this.value;
        if (filter) {
            table.setFilter("status", "=", filter);
        } else {
            table.clearFilter();
        }
    });

    document.getElementById('title-filter').addEventListener('click', function () {
        
        const filter = document.getElementById("title-search").value;
        //console.log(filter)
        if (filter) {
            table.setFilter("title", "=", filter);
        } else {
            table.clearFilter();
        }
    });

    document.getElementById('Description-filter').addEventListener('click', function () {
        
        const filter = document.getElementById("Description-search").value;
       // console.log(filter)
        if (filter) {
            table.setFilter("description", "=", filter);
        } else {
            table.clearFilter();
        }
    });
});
