<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<div class="form">
	<form action="findAccountByEmail" method="post" onsubmit="return validate()">
		<table>
			<tr>
				<td>
					<span>Find Accounts By eMail</span><br/>
					<input type="email" name="email" value="pops@gmail.com">
				</td>
			</tr>
			<tr>
				<td colspan="2"><input type="submit" value="Submit"></td>
			</tr>
		</table>
	</form>
</div>
