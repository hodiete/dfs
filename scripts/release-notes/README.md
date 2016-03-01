# Generate Release Notes Script

## Overview
Use a script compiles PR comments for a project into a Markdown file that can
be copy and pasted into github release notes. 

## Usage

### Inputs
- **username:** your github username
- **password:** your github password
- **repository:** the name of the github repository (e.g. `https://github.com/ny/WebNY-Distribution-D8`)

### Simple usage

    php generate-release-notes.php github username:password ny:WebNY-Distribution-D8:develop > release-notes.md

### Specify a start date

    php generate-release-notes.php github username:password ny:WebNY-Distribution-D8:develop 1/30/2014 > release-notes.md

### Specify a start date and number of PRs

    php generate-release-notes.php github username:password ny:WebNY-Distribution-D8:develop  1/30/2014 50 > release-notes.md
