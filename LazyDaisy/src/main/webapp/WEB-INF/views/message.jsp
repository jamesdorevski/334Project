<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags/" %>
<link rel="stylesheet" href="/resources/css/style.css">

<t:wrapper>
<table>
	<tr><td>
    <h1>${title}</h1>
    <p>${message}</p>
    
    <c:if test=${redirectLink}>
     <p style="margin-top:70px;">
     	<a class="submitButton" href="${redirectLink}">${redirectText}</a>
 	</p>
    </c:if>
	</td></tr>
</table>
</t:wrapper>