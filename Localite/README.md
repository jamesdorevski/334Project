# 334Project

Installation
==========
Windows:
Download Maven: https://maven.apache.org/download.cgi
Download "Binary zip archive": apache-maven-3.6.3-bin.zip
Unzip into Downloads folder and copy the directory of "bin"; mine was "D:\Downloads\apache-maven-3.6.3-bin\apache-maven-3.6.3\bin"
Type in search bar "env" and find "Edit the system environment variable"
Bottom right, click environment variables
Click row for variable "path" 
Add the copied directory
Save it and move on to =Run= 

Mac:
Download homebrew
brew install maven
move on to =Run= 

Run
===
Windows:
cd 334Project/Localite
mvn compile - for first time only or if there are issues
mvn spring-boot:run

Linux:
cd 334Project/Localite
mvn compile
mvn spring-boot:run

Mac:
cd 334Project/Localite
mvn spring-boot:run

Refresh Dependencies
===
mvn clean eclipse:eclipse
mvn clean install -U

Others
======
SPRING
=====
// starting spring mvc
https://www.youtube.com/watch?v=IqI17sRYdjA  

// mongodb
https://nullbeans.com/spring-boot-and-mongodb-configuration-example/

//multiple controller
https://www.javatpoint.com/spring-mvc-multiple-controller-example
added web.xml and spring-servlet.xml

// sessions
https://stackoverflow.com/questions/17145526/httpsession-management-in-springmvc

// multiple databases
https://www.infoq.com/articles/Multiple-Databases-with-Spring-Boot/

JSP
=====
// templating
https://stackoverflow.com/questions/1296235/jsp-tricks-to-make-templating-easier#3257426

//fragments
https://kodejava.org/how-do-i-include-a-page-fragment-into-jsp/

// css hover effect
https://freefrontend.com/css-hover-effects/
hover1: https://tympanus.net/Development/CreativeLinkEffects/#cl-effect-1

// add model object for jsp
https://stackoverflow.com/questions/15758877/how-to-display-model-attribute-in-jsp-using-spring-mvc

// if else not c:if but dynamic
https://stackoverflow.com/questions/26930216/using-if-else-in-jsp#26930507

// centering
http://howtocenterincss.com/