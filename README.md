# project_minori-next-deployment-repo

## Directory Structure
```
.
├── Dockerfile
├── README.md
├── __tests__
│   ├── __snapshots__
│   │   └── snapshot.js.snap
│   ├── api
│   │   ├── getCheckClassSecret.test.ts
│   │   ├── getClass.test.ts
│   │   ├── getMaterial.test.ts
│   │   ├── prompt
│   │   │   ├── getMessage.test.ts
│   │   │   ├── getPrompt.test.ts
│   │   │   ├── patchMessage.test.ts
│   │   │   └── postPrompt.test.ts
│   │   └── verifySecret.test.ts
│   ├── index.test.tsx
│   └── snapshot.js
├── commitlint.config.js
├── jest.config.ts
├── jest.setup.ts
├── minori-next-task.json
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── fonts
│   │   └── temp.ttf
│   ├── gif
│   │   ├── eclipse.gif
│   │   └── index.ts
│   ├── images
│   │   ├── _class
│   │   │   ├── github.png
│   │   │   ├── index.ts
│   │   │   ├── seouluni.png
│   │   │   ├── twayair.png
│   │   │   ├── wasedauni.png
│   │   │   ├── yahoo.png
│   │   │   └── yeungjin.png
│   │   ├── navbar
│   │   │   ├── index.ts
│   │   │   └── user.png
│   │   └── temp.png
│   └── svgs
│       ├── _class
│       │   ├── addButton.svg
│       │   ├── create.svg
│       │   ├── delete.svg
│       │   ├── dropdownButton.svg
│       │   ├── edit.svg
│       │   ├── favorite.svg
│       │   ├── folder.svg
│       │   ├── index.ts
│       │   ├── join.svg
│       │   ├── joinIntro.svg
│       │   ├── moreVert.svg
│       │   ├── noneFavorite.svg
│       │   ├── noneImage.svg
│       │   ├── notice.svg
│       │   ├── post.svg
│       │   └── thumbnail.svg
│       ├── error
│       │   ├── error.svg
│       │   └── index.ts
│       ├── footer
│       │   ├── github.svg
│       │   ├── index.ts
│       │   └── notion.svg
│       ├── intro
│       │   ├── MainImg.svg
│       │   └── index.ts
│       ├── login
│       │   ├── google.svg
│       │   ├── index.ts
│       │   ├── line.svg
│       │   ├── login.svg
│       │   ├── logo.svg
│       │   └── yahoo.svg
│       ├── navbar
│       │   ├── book.svg
│       │   ├── door.svg
│       │   ├── group.svg
│       │   ├── index.ts
│       │   ├── moreHoriz.svg
│       │   ├── moreVert.svg
│       │   ├── mypage.svg
│       │   ├── plus.svg
│       │   ├── prompt
│       │   │   ├── cloud.svg
│       │   │   └── index.ts
│       │   └── search.svg
│       ├── next.svg
│       ├── prompt
│       │   ├── delete.svg
│       │   ├── drive.svg
│       │   └── index.ts
│       └── vercel.svg
├── src
│   ├── api
│   │   ├── _class
│   │   │   ├── getClassInfo.ts
│   │   │   ├── getClasses.ts
│   │   │   ├── getClassesRole.ts
│   │   │   ├── getFavoriteClasses.ts
│   │   │   ├── index.ts
│   │   │   ├── patchClassRole.ts
│   │   │   ├── patchToggleFavoriteClass.ts
│   │   │   └── postCreateClass.ts
│   │   ├── apiUtils.ts
│   │   ├── auth
│   │   │   ├── getGoogleLogin.ts
│   │   │   └── postGoogleLogin.ts
│   │   ├── baseUrl.ts
│   │   ├── classBoard
│   │   │   ├── deleteClassBoard.ts
│   │   │   ├── getClassAnnounced.ts
│   │   │   ├── getClassBoard.ts
│   │   │   ├── getClassBoardList.ts
│   │   │   ├── index.ts
│   │   │   └── postCreateClassPost.ts
│   │   ├── classCode
│   │   │   ├── getCheckClassSecret.ts
│   │   │   └── getVerifySecret.ts
│   │   ├── classSchedule
│   │   │   ├── deleteClassSchedule.ts
│   │   │   ├── getClassSchedule.ts
│   │   │   ├── getClassScheduleList.ts
│   │   │   ├── index.ts
│   │   │   ├── patchClassSchedule.ts
│   │   │   ├── postCreateClassSchedule.ts
│   │   │   └── putClassSchedule.ts
│   │   ├── classUser
│   │   │   ├── getClassInfo.ts
│   │   │   ├── getUserInfo.ts
│   │   │   └── putUserName.ts
│   │   ├── feedback
│   │   │   ├── deleteFeedback.ts
│   │   │   ├── getCheckRefer.ts
│   │   │   ├── getFeedback.ts
│   │   │   ├── getFeedbacks.ts
│   │   │   ├── getKeywords.ts
│   │   │   └── postFeedback.ts
│   │   ├── httpStatus.ts
│   │   ├── material
│   │   │   ├── deleteMaterial.ts
│   │   │   ├── getMaterial.ts
│   │   │   ├── patchMaterial.ts
│   │   │   ├── postMaterial.ts
│   │   │   └── searchMaterial.ts
│   │   └── prompts
│   │       ├── getMessage.ts
│   │       ├── getPrompt.ts
│   │       ├── patchMessage.ts
│   │       ├── postPrompt.ts
│   │       └── postPromptAccess.ts
│   ├── app
│   │   ├── classes
│   │   │   ├── [cId]
│   │   │   │   ├── [mId]
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── FeedbackContainer.tsx
│   │   │   │   │   │   ├── FeedbackForm.tsx
│   │   │   │   │   │   ├── FeedbackKeywordList.tsx
│   │   │   │   │   │   ├── FeedbackList.tsx
│   │   │   │   │   │   ├── ManageContainer.tsx
│   │   │   │   │   │   ├── ManageMaterialContainer.tsx
│   │   │   │   │   │   ├── Material.tsx
│   │   │   │   │   │   ├── Quiz.tsx
│   │   │   │   │   │   ├── UserContainer.tsx
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── manageSubComponents
│   │   │   │   │   │   │   └── ManageSubContainer.tsx
│   │   │   │   │   │   └── subComponents
│   │   │   │   │   │       ├── ChatInput.tsx
│   │   │   │   │   │       ├── ClassChat.tsx
│   │   │   │   │   │       ├── PromptChat.tsx
│   │   │   │   │   │       ├── Storage.tsx
│   │   │   │   │   │       ├── SubContainer.tsx
│   │   │   │   │   │       └── index.ts
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── components
│   │   │   │   │   ├── alarm
│   │   │   │   │   │   ├── Alarm.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── card
│   │   │   │   │   │   ├── PostCard.tsx
│   │   │   │   │   │   ├── ScheduleCard.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── main
│   │   │   │   │   │   ├── Main.tsx
│   │   │   │   │   │   ├── Notice.tsx
│   │   │   │   │   │   ├── Post.tsx
│   │   │   │   │   │   ├── Schedule.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── member
│   │   │   │   │   │   ├── Member.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── modal
│   │   │   │   │   │   ├── ClassCreatePost.tsx
│   │   │   │   │   │   ├── ClassCreateSchedule.tsx
│   │   │   │   │   │   ├── ClassEditPost.tsx
│   │   │   │   │   │   ├── ClassEditSchedule.tsx
│   │   │   │   │   │   ├── ClassPost.tsx
│   │   │   │   │   │   ├── ClassSchedule.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── schedule
│   │   │   │   │       ├── TimePicker.tsx
│   │   │   │   │       └── index.ts
│   │   │   │   └── page.tsx
│   │   │   ├── components
│   │   │   │   ├── _class
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Invite.tsx
│   │   │   │   │   ├── Main.tsx
│   │   │   │   │   ├── Waiting.tsx
│   │   │   │   │   ├── dropdown
│   │   │   │   │   │   ├── Dropdown.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── modal
│   │   │   │   │       ├── ClassCreate.tsx
│   │   │   │   │       ├── ClassJoin.tsx
│   │   │   │   │       ├── ClassPassword.tsx
│   │   │   │   │       ├── ClassWait.tsx
│   │   │   │   │       └── index.ts
│   │   │   │   └── card
│   │   │   │       ├── Card.tsx
│   │   │   │       ├── CardList.tsx
│   │   │   │       ├── Invitation.tsx
│   │   │   │       ├── Wait.tsx
│   │   │   │       └── index.ts
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   └── login
│   │   │       ├── Login.tsx
│   │   │       └── index.ts
│   │   ├── globals.css
│   │   ├── googleLogin
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── RecoilRootContainer.tsx
│   │   ├── dashboard
│   │   │   ├── Dashboard.tsx
│   │   │   ├── TabsMapping.tsx
│   │   │   └── index.ts
│   │   ├── footer
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   ├── navbar
│   │   │   ├── Navbar.tsx
│   │   │   ├── index.ts
│   │   │   ├── material
│   │   │   │   ├── MaterialContainer.tsx
│   │   │   │   ├── MaterialForm.tsx
│   │   │   │   ├── MaterialList.tsx
│   │   │   │   └── index.ts
│   │   │   └── profile
│   │   │       ├── EditName.tsx
│   │   │       ├── Profile.tsx
│   │   │       └── index.ts
│   │   └── warning
│   │       └── Warning.tsx
│   ├── constants
│   │   └── roles.ts
│   ├── hooks
│   │   └── useDebounce.ts
│   ├── interfaces
│   │   ├── _class
│   │   │   ├── cardProps.ts
│   │   │   ├── classProps.ts
│   │   │   ├── dropdownProps.ts
│   │   │   ├── index.ts
│   │   │   ├── invitationProps.ts
│   │   │   ├── inviteProps.ts
│   │   │   ├── mainSectionProps.ts
│   │   │   ├── modal
│   │   │   │   ├── classPasswordProps.ts
│   │   │   │   ├── classPostProps.ts
│   │   │   │   ├── classScheduleProps.ts
│   │   │   │   ├── classShowProps.ts
│   │   │   │   ├── classWaitProps.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── modalProps.ts
│   │   │   ├── postCardProps.ts
│   │   │   ├── roleProps.ts
│   │   │   └── scheduleCardProps.ts
│   │   ├── api
│   │   │   └── _class
│   │   │       ├── index.ts
│   │   │       ├── postBoardData.ts
│   │   │       ├── postCreateClassData.ts
│   │   │       ├── postCreateScheduleData.ts
│   │   │       └── putScheduleData.ts
│   │   ├── dashboard
│   │   │   ├── dashboardProps.ts
│   │   │   ├── index.ts
│   │   │   └── tabsMappingProps.ts
│   │   ├── error
│   │   │   ├── errorProps.ts
│   │   │   └── index.ts
│   │   ├── feedback
│   │   │   ├── feedback.ts
│   │   │   ├── index.ts
│   │   │   └── keyWord.ts
│   │   ├── navbar
│   │   │   ├── editProps.ts
│   │   │   ├── formProps.ts
│   │   │   ├── index.ts
│   │   │   ├── material.ts
│   │   │   ├── paramsProps.ts
│   │   │   └── userProps.ts
│   │   ├── prompt
│   │   │   ├── index.ts
│   │   │   ├── inputProps.ts
│   │   │   ├── promptMessages.ts
│   │   │   ├── promptMessagesProps.ts
│   │   │   └── storageMessage.ts
│   │   ├── recoilRootContainerProps.ts
│   │   └── user
│   │       ├── AccessToken.ts
│   │       ├── ClassUser.ts
│   │       ├── LoginData.ts
│   │       ├── RefreshToken.ts
│   │       ├── User.ts
│   │       └── index.ts
│   ├── model
│   │   └── User.ts
│   ├── recoil
│   │   └── atoms
│   │       ├── accessTokenState.ts
│   │       ├── classUserState.ts
│   │       ├── materialState.ts
│   │       ├── refreshTokenState.ts
│   │       └── userState.ts
│   └── styles
│       ├── calendar.css
│       └── variable.css
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```

## Scripts
- `dev`: Runs the development server
- `build`: Builds the production application
- `start`: Starts the production server
- `lint`: Lints the code using GTS
- `test`: Runs the tests using Jest
- `test:watch`: Runs the tests in watch mode
- `postinstall`: Sets up Husky for Git hooks
- `lint-staged`: Runs ESLint on staged files

Feel free to customize this template to fit your needs!

## Version
- Next.js: 14.0.4
- TypeScript: 5.3.3
- GTS: 5.2.0
- Commitlint: 18.4.4
- Husky: 8.0.3
- Jest: 29.7.0
