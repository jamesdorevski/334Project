<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="/resources/css/style.css">
<title>Spring Boot</title>
</head>
<body>
  <h1>Spring Boot - MVC web application example</h1>
  <hr>

  <div class="form">
    <form action="createAccount" method="post" onsubmit="return validate()">
      <table>
        <tr>
          <td>First Name</td>
          <td><input id="name" name="name"></td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td><input id="name" name="name"></td>
        </tr>
        <tr>      
          <td>Username</td>
          <td><input id="name" name="name"></td>
        </tr>
        <tr>        
          <td>Email</td>
          <td><input id="name" name="name"></td>
        </tr>
        <tr>
          <td><input type="submit" value="Submit"></td>
        </tr>
      </table>
    </form>
  </div>
<script type="text/javascript" src="/resources/js/app.js"></script>
</body>
</html>