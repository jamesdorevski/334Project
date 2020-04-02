<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<%@taglib prefix="t" tagdir="/WEB-INF/tags/" %>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>

<link rel="stylesheet" href="/resources/css/message.css">

<t:wrapper>
<table>
	<tr>
	<td>
		<h1>${title}</h1>
		<p>${message}</p>
		
		<c:if test="${redirect}">
			<a class="button-1" href="${redirectLink}">${redirectText}</a>
		</c:if>
	</td>
	</tr>
</table>
</t:wrapper>