<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<div class="form">
	<form action="createAccount" method="post" onsubmit="return validate()">
		<table>
			<tr>
			<td>
				<span>First Name</span><br/>
				<input type="text" name="firstname" value="Poppy">
			</td>
			</tr>
			
			<tr>
			<td>
				<span>Last Name</span><br/>
				<input type="text" name="lastname" value="White">
			</td>
			</tr>
			<tr>      
			<td>
				<span>Username</span><br/>
				<input type="text" name="username" value="pops">
			</td>
			</tr>
			<tr>        
			<td>
				<span>Email</span><br/>
				<input type="email" name="email" value="pops@gmail.com">
			</td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="Submit"></td>
			</tr>
		</table>
	</form>
</div>