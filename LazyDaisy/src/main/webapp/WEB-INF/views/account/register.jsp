<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags/" %>

<link rel="stylesheet" href="/resources/css/style.css">
<script type="text/javascript" src="/resources/js/app.js"></script>

<t:wrapper>
<div class="form">
      <form action="createAccount" method="post" onsubmit="return validate()">
    <table>
      <tr>
        <td>First Name</td>
        <td><input name="firstname" value="Poppy"></td>
      </tr>
      <tr>
        <td>Last Name</td>
        <td><input name="lastname" value="White"></td>
      </tr>
      <tr>      
        <td>Username</td>
        <td><input name="username" value="pops"></td>
      </tr>
      <tr>        
        <td>Email</td>
        <td><input name="email" value="pops@gmail.com"></td>
      </tr>
      <tr>
        <td><input type="submit" value="Submit"></td>
      </tr>
    </table>
  </form>
</div>
</t:wrapper>