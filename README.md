# FinQuest

FinQuest is an interactive, choose-your-own-adventure game designed to teach financial literacy. By simulating real-life financial decisions, FinQuest helps users understand the long-term impact of their money management choices—all in a fun, engaging format.

---

## Table of Contents

- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Technologies Used](#technologies-used)
- [Challenges We Ran Into](#challenges-we-ran-into)
- [Screenshots](#Screenshots)
- [Accomplishments That We're Proud Of](#accomplishments-that-were-proud-of)
- [What We Learned](#what-we-learned)
- [What's Next for FinQuest](#whats-next-for-finquest)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)

---

## Inspiration

FinQuest was born from the need to make financial literacy engaging and practical for young people. Traditional financial education is often theoretical and dry, so we envisioned a platform that uses interactive storytelling and real-life scenarios to empower users with the skills needed to manage their finances effectively.

---

## What It Does

- **Interactive Learning:** Presents users with realistic financial scenarios where each decision impacts their virtual savings.
- **Dynamic Decision Trees:** Visualizes user choices in a dynamic decision tree that shows the long-term impact of each decision.
- **User Profiles & Authentication:** Users can sign up, log in, and view their personalized financial journey.
- **Immediate Feedback:** Each decision comes with an explanation and a calculated effect on the user's virtual money, making the learning experience practical and engaging.

---

## How We Built It

- **Frontend:**  
  Built with [Next.js](https://nextjs.org/) and styled using [Tailwind CSS](https://tailwindcss.com/) for a modern, responsive user interface.

- **Backend:**  
  Developed using [Express.js](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) (via Mongoose) to manage user data, decision trees, and authentication.

- **Authentication:**  
  Implemented secure user authentication using JWTs (JSON Web Tokens) along with password hashing using bcrypt.

- **API Integration:**  
  RESTful API endpoints connect the frontend to the backend, ensuring a smooth, interactive user experience.

---

## Technologies Used

- **Languages:** JavaScript, TypeScript
- **Frameworks & Libraries:**
  - Next.js
  - Express.js
  - Tailwind CSS
  - bcrypt (or bcryptjs)
  - jsonwebtoken
  - Mongoose
- **Platforms & Services:**
  - Local development with Node.js
  - (Optional) Cloud deployment on platforms like Vercel, Heroku, or AWS
- **Databases:**
  - MongoDB
- **APIs:**
  - RESTful API endpoints
- **Development Tools:**
  - VS Code (or your preferred IDE)
  - Git

---

## Challenges We Ran Into

- **Dynamic Decision Tree Visualization:**  
  Creating a data structure that dynamically represents user decisions and building a clear, intuitive UI to visualize these decision trees was complex.

- **CORS & API Integration:**  
  Configuring cross-origin resource sharing (CORS) between the Next.js frontend and Express backend required careful setup.

- **Secure Authentication:**  
  Implementing JWT-based authentication while ensuring data security and proper session management posed additional challenges.

---

## Accomplishments That We're Proud Of

- **Engaging Financial Education:**  
  FinQuest transforms traditional financial education into an interactive experience, allowing users to see the immediate impact of their decisions.
- **Scalable Architecture:**  
  By leveraging modern frameworks and cloud-ready technologies, FinQuest is designed to scale and evolve.
- **Clear Visual Feedback:**  
  The decision tree visualization provides users with clear feedback on how their financial choices affect their future, enhancing the learning experience.

---

## Screenshots
![Image](https://github.com/user-attachments/assets/67b34ef9-9cf2-49d4-9701-0326e9b16185)
![Image](https://github.com/user-attachments/assets/8b171144-200d-4a4c-91db-67e7593559cc)
![Image](https://github.com/user-attachments/assets/e8f3bb5d-c53d-4192-aaf3-2d7a5f87236a)
![Image](https://github.com/user-attachments/assets/2eb0efd8-04c5-4be7-93c4-68111848dcba)
![Image](https://github.com/user-attachments/assets/f02e8e4e-d2fc-4691-95bb-e58b00a92909)
![Image](https://github.com/user-attachments/assets/8648139e-e6b5-4293-9b30-75191a0354b7)
![Image](https://github.com/user-attachments/assets/d913b7be-ca1c-43b3-bcc2-6c384468888f)
![Image](https://github.com/user-attachments/assets/f04eaf02-2664-492d-9259-844d75d8bf47)

## What We Learned

- **Full-Stack Integration:**  
  Successfully integrating a React-based frontend with an Express/MongoDB backend taught us the importance of clear API design and robust data handling.
- **User Authentication:**  
  Implementing secure authentication with JWTs and password hashing deepened our understanding of security best practices.
- **Responsive UI/UX Design:**  
  Building an intuitive, responsive interface with Tailwind CSS emphasized the value of modern design principles in user engagement.

---

## What's Next for FinQuest

- **Enhanced Personalization:**  
  Integrate more personalized financial scenarios based on individual user behavior.
- **Real-World Data Integration:**  
  Incorporate live financial data to provide even more relevant and accurate feedback.
- **Advanced Analytics:**  
  Develop an analytics dashboard to help users track their progress and gain insights into their financial decisions.
- **Content Expansion:**  
  Partner with financial education experts to expand and refine the scenarios and educational content within FinQuest.

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud-based)
- Next.js

## Install dependencies:

```bash
npm install
```

### Set up your .env file with the following variables:
```bash
env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=3001
```
### Start the backend server:

```bash
npx nodemon index.js
```
## Frontend Setup
Navigate to the frontend directory:

```bash
cd finquest
```
Install dependencies:

```bash
Copy
npm install
```
Start the Next.js development server:

```bash
npm run dev
```
## Usage
### Sign Up / Login
Navigate to the signup or login page to create an account or log in.

Once authenticated, you will receive a token and your user ID, which will be used to fetch your personalized decision tree data.

### Profile Page
After logging in, go to the profile page where you can view your user details, including a profile picture.

See your decision history visualized as dynamic decision trees.

### Game Page
Start making financial decisions in the game.

Watch as each choice affects your virtual savings and is reflected in your decision history.


