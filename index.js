const express= require("express");
const res = require("express/lib/response");
const { get } = require("express/lib/response");
const fs=require("fs");
const users= require("./MOCK_DATA.json");

const app=express();
const PORT=8000;


app.use(express.urlencoded({extended:false}));

// Middleware
app.use((req,res,next)=>{
  console.log("This Middleware 1")
  next();
});

// Routes
app.get("/users",(request,response)=>{
    const html=`
    <ul>
    ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    response.send(html);
   });


// REST APIs

// Get All Users
app.get("/api/users",(request,response)=>{
    return response.json(users);

});



// Get Single User by Id
app.route("/api/users/:id").get((request,response)=>{
    const id= Number(request.params.id);
    const user=users.find((user)=> user.id===id);
    if(!user) return response.status(404).json({"status":"no user found"});
    return response.json(user);
}).patch((request,response)=>{
    
    const userId = parseInt(request.params.id);
    const updates = request.body;
    const userIndex = users.findIndex(user => user.id === userId);
    users[userIndex] = { ...users[userIndex], ...updates };

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return response.json({"status":"Success",id:users.length});
    });
})
.delete((req,res)=>{

    try {
        const userId = parseInt(req.params.id);
        const data =   fs.readFile("./MOCK_DATA.json", 'utf8');
        let users = JSON.parse(data);
        
        const initialLength = users.length;
        users = users.filter(user => user.id !== userId);
        
        if (users.length === initialLength) {
            return res.status(404).json({ error: 'User not found' });
        }
        
          fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2));
        res.json({ message: `User with ID ${userId} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }  
});
 


// POST users
app.post("/api/users",(request,response)=>{
    
    const body=request.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return response.status(400).json({"status":"All Field Required"});
    }
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return response.json({"status":"Success",id:users.length});
    });
});
 

 






app.listen(PORT,()=> console.log("Server Started"));