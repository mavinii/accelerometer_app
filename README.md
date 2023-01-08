<p align="center">
  <h1 align="center">Accelerometer Data App</h1>
</p>

## 📚 Student Details 
- Module Title: `Mobile App 2`
- Lecture Name: [Saravanabalagi Ramachandran](https://github.com/saravanabalagi) 
- Student Name: `Marcos Oliveira`
- Student Number: `22931`

## 📝 Introduction:
The objective of this project is to develop a cloud connected mobile app to collect and upload accelerometer data and display a leaderboard. The requirements are as follows and both requirements carry equal weightage:

## 1. Authenticate using Firebase, upload data to Firestore:
- [x] Sign up using StudentID@student.dorset-college.ie (as email) and a password.
- [x] After sign up, collect and update details such as name, course, year in Firestore > StudentID, allow editing these details later.
- [x] Collect and store locally 1000 accelerometer data points.
- [x] Once 1000 data points are collected, upload to Firestore under: Users > StudentID > accelerometer_data.
- [ ] Repeat 3 and 4 as long as the app is open and is in the foreground (Don't record when minimised).

## 2. Display Leaderboard:
- [ ] Retrieve accelerometer_data of all users and calculate movement score2 for each user
- [ ] If accelerometer_data is unavailable or not in correct format or has more than 1000 data points, show score "N/A".
- [ ] Show recycler view to display leaderboard with columns rank, name and score (use score for ranking)
- [ ] Refresh every minute, show information: last refreshed (in time ago format3), and refreshing in x seconds
- [ ] Show details of user when clicked in full screen, allow going back to leaderboard

## 3. Data Upload Format Example:
> In Firestore: Users > StudentID >
- [x] name: "Full Name"
- [x] course: "BSc Computer Science" 
- [x] year: 3
- [x] accelerometer_data: [{x: float, y: float, z: float}, {x: float, y: float, z: float}, ...upto a max of 1000 datapoints]

## 4. Note:
1. To prevent unintended errors in the shared firestore, you should start development with your own firebase configuration and make sure everything works. Once everything works error free, then you can use the common firebase config (check files attached below) and the app will automatically use the same firestore and firebase auth. For your convenience, FirebaseTest app is attached below. Run and check the logs to see if you can successfully access the common Firebase.

2. Calculating activity score in Kcal is a complex function, use this formula instead:
```
  movement score = Σ(Σ|x| + Σ|y| + Σ|z|)/n

  where,

  * n is the number of data points (1000 in this project)

  * (x, y, z) is one accelerometer data point
```

3. Feel free to use your own function or an external open source library to convert timestamp to time ago format


## How to use this project:
Go to [Firebase](https://firebase.google.com) and create your firebase database. The firebase used in this project is: `Firebase JS SDK` and not the `React Native Firebase` one. After that, create an archive called `firebaseConfig.js` and paste the following code, that Google will provide to you:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  //...
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db, firebaseApp, firestore };
```
Make sure to add this file to your `.gitignore` file.
> **Note:** see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase.


# Student Report
This is my report about this project. I will explain the steps I took to create this project, the challenges I faced and how I solved them.

## What was challenge:
On the other side, the implementation of sensors from the expo, the react-navigation, and
the bottom tabs, these guys gave me some headaches. Even though it took me days, I did
not implement it as requested, unfortunately. My initial idea was that, when the student
opens the app, it would display the login screen, if the student doesn't have a login, they
can create one easily just by clicking on the Register button, and the app takes them to the
registration screen, allowing them, to enter their details. It was implemented, but it was a
challenge.

## What I failed:
I have failed in so many areas. Applying the movement formula, the app takes the user to
login and not to home instead, right after registering, to create the leader board where it
retrieves the data from the database, and displays the student details on the Settings
screen. The button on/off crashes the app after uploading the x, y and z data on the
database.

## What I accomplished:
As I mentioned previously, I planned first to display the login and register screen before the
student could see their leaderboard and I implemented it successfully. Another thing I
managed to implement is that instead of the student writing down their email, for example,
12345@student.dorset-college.ie, they can just type: 12345, and it concatenates with the
string: @student.dorset-college.ie, avoiding the student writing that long.

## What I learned:
Doing this project and the Maps in Ireland one, I have been learning a lot. Learning how to
search for the issue in my code, learning how to read the documentation, learning that
sometimes we have priority to implement a feature and others are not that important.
Learning that libraries are very important and the most important thing, learning how to be
patient. Helping others and asking for help is also a good thing to do.


## 🤝 References:
- [Firebase Authentication](https://docs.expo.dev/guides/using-firebase/#using-firebase-js-sdk)
- [Yarn](https://yarnpkg.com/)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)
- [Login and Register](https://www.youtube.com/watch?v=ql4J6SpLXZA)
- [FireBase Documentation](https://firebase.google.com/docs/auth/web/start)
- [Build a Step Counter](https://www.youtube.com/watch?v=RaSyX6COTDk)
- [Creating your first build](https://docs.expo.dev/build/setup/)

## ⚠️ Copyright Disclaimer:
Please note that this app project is part of `Dorset College's` sophomore semester project, however, it may contain some part of code that may be copyrighted, if so, please contact me so I can delete or give due to copyright. All the people were duly referenced in the `"References"` section above.

Please also note, this project is `non-profit`, however, this is not intended to be monetized.

---

<strong>Built with 💙 by [@Marcos Oliveira](https://www.linkedin.com/in/pgmarcosoliveira/)</strong>