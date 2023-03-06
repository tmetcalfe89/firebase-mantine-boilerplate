# Set Up

1. Clone this repository locally.
2. Add your `firebase.config.js` to the `src/firebase` directory.
3. Run `npm i` in the root directory of the project.
4. Run `npm start` to kick up the project.

I recognize the Firestore rules add some unanticipated overhead on this project.

If you would like to use just something that works, use the following. It will allow all read and write operations.

```
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
    match /exercises/{exerciseId} {
    	allow read, write: if true;
    }
  }
}
```

If you would like something with a little _more_ to it, this will only allow users to read in/write to their own exercises.

```
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
    match /exercises/{exerciseId} {
    	allow write: if request.auth != null && request.auth.uid == request.resource.data.owner;
      allow read: if request.auth != null && request.auth.uid == resource.data.owner;
    }
  }
}
```

# Information

This project implements a very barebones implementation of adding an authentication solution using Firebase's authentication module to our previous exercise project. It also pulls the logic that previously existed on the server to the front end so that the authentication module can be integrated into the database requests via Firebase's internal logic.
