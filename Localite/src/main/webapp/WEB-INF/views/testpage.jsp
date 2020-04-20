<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<div class="form">
<style>
table, th, td {
  border: 1px solid black;
}

</style>
	<table>
		<tr>
			<td>
				<form action="findAccountByEmail" method="post" onsubmit="return validate()">
					<span>Find Accounts By eMail</span><br/>
					<input type="email" name="email" value="pops@gmail.com">
					<input type="submit" value="Submit">
				</form>
			</td>
			<td>
				<form action="findAccountByFirstName" method="post" onsubmit="return validate()">
					<span>Find Accounts By First Name</span><br/>
					<input type="text" name="firstName" value="Poppy">
					<input type="submit" value="Submit">
				</form>
			</td>
		</tr>
	</table>
</div>
