<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags/" %>
<style type="text/css">
	#pageBody
	{
		background: url('/resources/jpg/starry-night.jpg');
	}
</style>
<t:wrapper>
<div class="form">
	<form action="createAccount" method="post" onsubmit="return validate()">
		<table>
			<tr><td>
				<span>First Name</span><br/>
				<input type="text" name="firstName" value="Poppy">
			</td></tr>
			
			<tr><td>
				<span>Last Name</span><br/>
				<input type="text" name="lastName" value="White">
			</td></tr>

			<tr><td>
				<span>Email</span><br/>
				<input type="email" name="email" value="pops@gmail.com">
			</td></tr>

			<tr><td>
				<span>Password</span><br/>
				<input type="password" name="password" value="admin">
			</td></tr>

			<tr><td>
				<span>Retype Password</span><br/>
				<input type="password" name="retypePassword" value="admin">
			</td></tr>

			<tr>
				<td colspan="2"><input type="submit" value="Submit"></td>
			</tr>
		</table>
	</form>
</div>
</t:wrapper>