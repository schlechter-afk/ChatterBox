# Reddit Implementation in MERN Stack

```
Names : Swayam Agrawal
Roll Nos: 2021101068
Branch : CSE
Course : Design and Analysis of Software Systems, Monsoon'22

OS:Linux
```

1. Containerized application using Docker.
2. Nginx as the web server to host the application within the Docker container.

# *Login and Registration*

Once the user signs up on the sign-up form, he is asked to login.

The sign-up and login buttons are disabled when invalid input i.e. empty input is present in any field.

Proper Input Validation done.

Encrypted password stored in db using bcrypt.js

Once authenticated, a message is shown to a user and he is taken to the Dashboard page.

JWT token has been used to carry authorization and protection of backend routes everywhere along with keeping the user logged in on computer restart or closing of tab.

All routes protected if user not authenticated.

Logout option implemented.

# Bonus Implemented here of Google Authentication
Used gapi-script, since gapi script is old, it does not work with docker but without docker server-side authentication has been done, extra details are not asked from the user.

# *Dashboard : Navbar*

A navbar has been created with icons acting as links as specified.

# *Profile Page*

The profile page contains options to edit user details. Email-id field cannot be edited.

A list of Followers and Following has been shown along with an option to remove them besides each user.

# Bonus Implemented here of Chat
An option to chat has also been provided to the user on route /messenger.
Used SocketIO to provide realtime chat services.


# *My Sub Greddiits Page*

A button to create a new subgreddit for the logged-in has been given.

Proper Input validation has been done before form submission.

# Bonus Implemented here of Image
Option to upload `image` has been given.If no image selected, a random image get uploaded on the subgreddit's page.Used imagekit library.

It is assumed that all subgreddits have unique names which ideally is the case on Reddit.So while testing create subgreddits with unique names.

All specific details required are dsiplayed.

A delete button has also been provided which deleted the subgreddiits along with other details from the mongodb schema such as reports,saved posts etc.

# *Sub Greddiit Page*

Navbar contains links to the pages of `users, stats, reports, and joining requests` for the corresponding Subgreddiit.

# Bonus Implemented here of Shortcut

## Users:

On this page, a list of all users have been provided to the moderator.
Two tables created for clear distinction.

## Stats:

On this page, 4 graphs have been shown representing each of the required stats.

In No Of Member graph, the daily new members have been shown rather than showing the number of overall members in the sub-greddiit at that point of time.

In No of Reported Reports vs No of Deleted Reports,Reported Reports vs Date, Deleted Reports vs Date have been displayed simultaneously.They have been kept as general i.e. a Report might have been created yesterday but deleted today and will be shown in today's data.
# Bonus of ChartJS Implemented here

## Joining Requests Page:

On this page, a list of all Joining requests have been provided to the moderator.

The moderator has an option to either accept a user or to reject a user from his subgreddiit.

## Reported Page:

On this page, a list of all reports have been provided to the moderator.

Options to block,ignore,delete report with all the required functionalities.

Expiry date of report in backend.

# Bonus implemented here of sending email notif of action taken.

# *All Sub Greddiits Page*

### Search Bar:

A search bar has been created and implemented using Fuzzy search from Fuse.js library.

### Filtering based on tags:

An option to filter on the basis of tags have been provided to the user, multiple tags can be entered.
Any post containing any tags specified will be displayed.

### Sorting:

Sorting basis on each criteria implemented.

### Leave Button:

An option to leave the subgreddiit has been given in those subgreddiits in which a user is a member but not a moderator.

A moderator `cannot` leave his Subgreddiit.

### Join Button:

A user can request to join a Subgreddiit where he is not a member provided that he has never `left` the Subgreddiit earlier and neither has he been `blocked` in this Subgreddiit. 

### Subgreddiit Redirect:

Each Subgreddiit is a clickable div on the Dashboard Page.On click redirected to that subgreddits page.

## Subgreddiit Page:

This is a common page for both the moderator as well as the other members of the subgreddiit where they are shown the  basic details on the left along with the subgreddiit profile image.
Protected for members,users.

### Create Post Button:

A member can create a `post` in the specified subgreddit.

### Posts:

A member has an option to comment on a post.

A user has an option to up-vote or down-vote a particular post.

A user also has an option to save a post which would then be shown on the Saved Posts page of the user.

A `Follow` button has also been given for a post.

### Banned Keywords:

Any banned keyword present in a post is replaced with corresponding no of * as is the no of letters in the banned keyword.String parsing done to implement this.Alert if post contains banned keywords.

# *Saved Posts Page*

Here all the saved posts have been shown which have been saved by the user.

All banned keywords are shown using *.

An option to remove a post from this list implemented.

# **Miscellaneous Details**

## I/O Validation:

I/O Validation has been done thoroughly in every form in both front-end as well as back-end.
The back-end throws an error when a user enters an invalid type of input.

## Unauthorized Access:

Unauthorized Access has been prevented to a user on direct-api call.
All back-end routes have been protected.
Proper JWT Authentication done.

## Button disabled:

The buttons are disabled when a form is submitted.
New URLs have been created wherever asked to.

# **Bonus**

1) Chat using Socket IO

2) Image Upload

3) Fuzzy Search

4) Email Notif

5) Stats using graphs

6) GAuth Server Side Auth

7) KeyBoard Shortcuts

8) CAS Auth Buildup complete (partial)
