# INSTALLATION INSTRUCTIONS

Ensure you have node 18 or above (nvm can be useful) and a compatible nvm version.

<!-- fails with `Error: ENOENT: no such file or directory, open '.next/prerender-manifest.json` 
let's use npm run dev in the meantime
-->
Go into /server/ and run `npm run start`

Then go into /client/ and run `npm run build && npm run start`

# Summary 

This is not a finished product, it's poorly styled and some features are missing.

# Objective

- [x] The user should be able to create new tasks and mark them as completed.
- [x] The tasks shall be sorted by creation date.
- [x] Completed tasks shall be hidden by default, but optionally displayed. They are not interspersed with the uncompleted tasks, instead, they have their own section below.
- [x] The app should feature multiple lists. The user can create and delete lists and switch between them.
- [x] Switching between lists is facilitated via a side bar.
- [] Dragging a task on another list in the sidebar moves the task to that list.
  - [x] Creates another task on drag and drop
  - [ ] the task is empty
 Dragging within a list has no effect (since the list is sorted).
- [] A server will persist all user data. The server must be implemented in JavaScript or TypeScript.
  - [x] Initialize from the server
  - Updates the server 
- [x] The final deliverable includes a README.md file with instructions to start the server and frontend.
- No public hosting is required.