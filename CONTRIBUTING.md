Follow these step to contribute:  

---

###### Step #1: Pull Github repository ######
```Shell
$ cd foundation-material-design/
$ npm install
$ bower install
$ gulp
```

---

###### Step #2: Annotate the CHANGELOG.md ######
```Markdown
###### v0.0.6 (2015-15-15)  ######
- Updated styling for navbar.

###### v0.0.5 (2015-15-15) ######
- Fixed grunt issues.

###### v0.0.4 (2015-15-15) ######
- Refactored navbar sass.
```

---

##### Step #3: Committing your changes #####

Example:
- added a **navbar** component to library

```Shell
$ git add .
$ git commit -m "navbar: some styling in top toolbar"
```

---

###### Step #4: Update bower package version ######
```Shell
$ bower version [<newversion> | major | minor | patch] -m "Upgrade for whatever reasons"
```

---

##### Step #5: Pushing your changes #####

```Shell
$ git push origin master; git push origin --tags
```

---

##### Step #6: Pull the changes to your project #####

In project using **foundation-material-design**
- To pull latest changes into your project, run:
```Shell
$ bower update
```
