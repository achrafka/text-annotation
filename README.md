# text annotation

i used a spacy free open source library for Natural Language Processing to make this project it features convolutional neural network models for tagging, parsing and named entity recognition and also i used flask instead of django to make rest api easy and bundle it to the angular project using ng-build it uses webpack to optimize and bundle the JS and CSS files and i create a file build-dev.py that automatically compiles and build js files and watches for changes once every 10 seconds (you must upgrade angular/cli and core to run it and if it doesn't work you can run the project just in python and flask i make this in templates folder )

## Installation

as i said you have to upgrade cli to run the project in angular and i used this line of code
```bash
 ng build --base-href /static/
```
and if the project didn't work in angular go to templates folder and run app.py
