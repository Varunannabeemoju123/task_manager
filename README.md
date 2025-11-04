#  Task Manager App

A **full-stack mobile task management application** built using **React Native (Expo)** for the frontend and **Node.js + Express** for the backend.  
This project allows users to **create, view, update, and filter tasks** seamlessly across mobile and web.

---

##  Features

 Add new tasks with a title and description  
 View all tasks in a list  
 Filter tasks by **status (Pending / Completed)** or **search by keyword**  
 Mark tasks as **completed**  
 Real-time synchronization between frontend and backend  
 Persistent local storage using a JSON file — no database setup required  

---

##  Project Architecture

task-manager/
├── backend/
│ └── server.js # Node.js + Express backend
│
├── frontend/
│ ├── App.js # Main entry file
│ ├── babel.config.js # Expo build configuration
│ ├── package.json
│ └── src/
│ ├── screens/
│ │ ├── HomeScreen.js # Displays and filters tasks
│ │ └── AddTaskScreen.js # Form to add new tasks
│ ├── components/
│ │ └── TaskItem.js # Renders each task item
│ ├── services/
│ │ └── api.js # Axios API connection to backend
│ └── styles/
│ └── global.js # Shared styling



##  Technologies Used

| Layer             | Technology                            |
|-------------------|---------------------------------------|
| Frontend          | React Native (Expo)                   |
| Navigation        | React Navigation                      |
| Backend           | Node.js + Express                     |
| API Communication | Axios                                 |
| Data Storage      | JSON File (via fs-extra)              |
| Development Tools | VS Code, Android Studio, Git, Postman |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/tasks` | Fetch all tasks |
| `GET` | `/tasks?status=Completed` | Filter by status |
| `GET` | `/tasks?q=keyword` | Filter by keyword |
| `POST` | `/tasks` | Create new task |
| `PATCH` | `/tasks/:id` | Mark a task as completed |

---

##  How It Works

1. The **backend (Node.js)** provides REST APIs for managing tasks.  
2. The **frontend (React Native)** consumes these APIs using Axios.  
3. Tasks are stored in a local `tasks.json` file on the backend (persistent storage).  
4. The app dynamically updates UI whenever a new task is added or marked as complete.

---

##  Installation & Setup

### 1 Clone the Repository
```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager
2️ Backend Setup
bash
Copy code
cd backend
npm install
node server.js
 Server will start at http://localhost:3000

3️ Frontend Setup
Open a new terminal window:

bash
Copy code
cd frontend
npm install
npm start
Then choose one:

Press a → to open in Android emulator

Press w → to open in web

Or scan QR code in Expo Go app on your phone

 Connecting Frontend to Backend
In frontend/src/services/api.js, set your backend URL:

js
Copy code
// For Android Emulator:
const BASE_URL = 'http://10.0.2.2:3000';

// For Expo Go (real device):
const BASE_URL = 'http://<your-computer-ip>:3000';
To find your IP:

bash
Copy code
ipconfig
Or use ngrok for remote access:

bash
Copy code
ngrok http 3000
🧩 Example Workflow
Action	Frontend	Backend	Result
Open app	Calls GET /tasks	Sends all tasks	Displays task list
Add task	POST /tasks	Adds new task	List refreshes
Mark completed	PATCH /tasks/:id	Updates status	UI updates
Filter	GET /tasks?status=Pending	Filters tasks	Shows matching list

 Example Data (tasks.json)
json
Copy code
{
  "tasks": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "status": "Completed"
    },
    {
      "id": 2,
      "title": "Finish project",
      "description": "Submit task manager app",
      "status": "Pending"
    }
  ],
  "idCounter": 3
}
 Screens (Preview)
Screen	Description
 Home	Displays and filters task list
 Add Task	Form to add new task
 Completed	Updated task view after marking complete

(You can upload screenshots here once captured.)

👨‍💻 Developer Info
Developer: Varun Annabeemoju
 B.Tech (CSE) – BVRIT Narsapur
 Email: varunannabeemoju08@gmail.com
 LinkedIn
 GitHub

 Summary
This project demonstrates:

Full-stack integration (React Native + Node.js)

REST API design and query parameter filtering

State management and dynamic rendering in React Native

Reusable component-based architecture

Basic persistence without a database



