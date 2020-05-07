# CCoder

Project done by _ANURAG_

Deployed URL: https://ccoder.herokuapp.com

Details of All CRUD operations: https://documenter.getpostman.com/view/10250669/Szf24q2v?version=latest

# Table Of Content
- [CCoder](#ccoder)
- [Table Of Content](#table-of-content)
- [About Our Project:](#about-our-project)
- [Features :](#features)
    - [**Authentication**](#authentication)
    - [**What A User Can Achieve From Our API**](#what-a-user-can-achieve-from-our-api)
      - [Basic Usages](#basic-usages)
      - [Challenge Creation](#challenge-creation)
      - [Contest Creation](#contest-creation)
- [**Aggregations** :](#aggregations)
- [Technologies used:](#technologies-used)
- [Future Goals :](#future-goals)

# About Our Project:

Are you a code newbie?

      Learning to program is exhilarating and challenging... and also frustrating, exhausting, and overwhelming.
      CCoder provides countless small wins. The exercises are achievable mini-quests: small and well-defined, and with enough complexity to uncover bite-sized knowledge gaps.
      CCoder is a place built for anyone to practice and perfect their programming skills. Challenges are added almost every day so you can work on applying your skills
    
# Features :

### **Authentication**

---
1.  User Registration
    a)  Local
    b)  Github OAuth
    c)  Google OAuth
2.  Email Verification for Registration.
3.  Password Reset. (Via Email Verification)
4.  Change Password.
5.  Restricitng User to use Weak Password With Express Validator
6.  Unique Username

### **What A User Can Achieve From Our API**

####  Basic Usages

---
1.  Can Register/Login With us.
      > POST https://ccoder.herokuapp.com/user/register

      > POST https://ccoder.herokuapp.com/user/login
      
      > DELETE https://ccoder.herokuapp.com/user/logout/:token

2.  Can Update his/her user detail,profile picture and password.
      > PATCH https://ccoder.herokuapp.com/user/userprofile/:token

      (profile Picture Upload)
      >POST https://ccoder.herokuapp.com/user/userimageupload/:token
          
3.  Can participate in Pre Currated Challenges Which Came Along With the API.
   
      (FOR ALL CHALLENGE)
      > GET https://ccoder.herokuapp.com/dashboard/challenges/:token
      
      (FOR SPECIFIC CHALLENGE)
      > GET https://ccoder.herokuapp.com/dashboard/challenges/:challengename/:token
      

4.  Can Code In Multiple Languages (Node,Python,Java,C,C++)
      > POST https://ccoder.herokuapp.com/submit/:challenge/:token
      
5.  Can Bookmark A Challenge

     > POST https://ccoder.herokuapp.com/:challenge/bookmark/add/:token
     
     > DELETE https://ccoder.herokuapp.com/:challenge/bookmark/delete/:token
      
6.  Can Use Discussion Board of a Challenge.
     > POST https://ccoder.herokuapp.com/:challenge/discussion/:token

7.  Can see the Leaderboard of a Challenge.
     > GET https://ccoder.herokuapp.com/leaderboard/:challenge/:token

     
####  Challenge Creation

---
1.  Can Create His Own Challenge
     > POST https://ccoder.herokuapp.com/user/challenge/:token

2.  Can Add dynamic Test Cases For the challenge.
      > POST https://ccoder.herokuapp.com/testcase/:challenge/:token

3.  Can update/delete Challenges Made By Him.
     > PATCH https://ccoder.herokuapp.com/:challenge/update/:token

     > DELETE https://ccoder.herokuapp.com/:challenge/delete/:token

5.  Can Update/delete A testcase He Implemented in a Challenge.
     > PATCH https://ccoder.herokuapp.com/testcase/update/:challenge/:testCaseID/:token

     > DELETE https://ccoder.herokuapp.com/testcase/delete/:challenge/:testCaseID/:token 

####  Contest Creation

---
1.  Can Create A contest and set start and end time.
      > POST https://ccoder.herokuapp.com/contest/new/:token

2.  Can Add Other User aswell as Moderator for a challenge
      > POST https://ccoder.herokuapp.com//contest/:contest/addmoderator/:username/:token

3.  Can Use Our Pre Curated Challenges or even can use the challenges made by him.
      > POST https://ccoder.herokuapp.com//contest/:contest/addchallenge/:challenge/:token

4.  All other User can Signup in a contest
      > POST https://ccoder.herokuapp.com//contest/:contest/signup/:token

5.  Only Signup user can Submit the code for a challenge
      > POST https://ccoder.herokuapp.com/submit/:challenge/:token

6.  Can Update Details of A contest
      > PATCH /contest/:contest/update/:token

7.  Can Remove The moderator
      > DELETE https://ccoder.herokuapp.com//contest/:contest/deletemoderator/:username/:token


# **Aggregations** :
   - a. Contest Count.
   - b. Sorting (as per Most Recent Contest).
   - d. Searching (_On the basis of challenge and contest name_) .
   - e. Pagination (_10 Challenge And contest per page_).

# Technologies used:

---

- Nodemailer (_To send system generated emails_)
- Multer + Cloudinary (_Converting System Image into URL_)
- Express Js (_Framework for node Js_)
- Json Web token (_For Authentication_)
- Bcrypt Js (_For Hashing_)
- Mongoose (_To Connect to NoSQL Database_)
- Compile-run (_To compile the code_)
- Express-validator (_To validate the Data user is Sending_)
- Passport (_For third Party user authentication_)
- JEST & SuperTest (_For Unit Testing_)
- mongodb-memory-server (_For Storing Data in Memory Database while testing_)

# Future Goals :

---

- **User Can Subscribe To Our Pro Model**
  - Benefits Of Being A Pro User
      1. Will Get Updates About New Challenge And New Contest Handpicked By our team.
      2. Will help them improve Their Skills With Handpicked Challenges Tested to improve the the skills
- **More Language Support**

