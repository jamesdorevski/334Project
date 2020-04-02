<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>

<html>
<head><title>Localite</title></head>

<link rel='icon' href='/resources/favicon/lazy-daisy-pink.ico'/>
<link rel="stylesheet" type="text/css" href='/resources/css/wrapper.css'/>
<link rel="stylesheet" type="text/css" href="/resources/css/forms.css"/>
<link rel="stylesheet" type="text/css" href='/resources/css/partials/pageHeader.css'/>
<link rel="stylesheet" type="text/css" href='/resources/css/partials/pageFooter.css'/>
<link rel="stylesheet" type="text/css" href='/resources/css/myStyles/buttons.css'/>
<link rel="stylesheet" type="text/css" href='/resources/css/myStyles/hovers.css'/>

<body>
	<div id="pageHeader">
		<div id="headerLeft">
		    <a href="/"><img src="/resources/png/localite-logo.png"/></a>
		</div>
		<div id="headerRight" class="hover-1">
			<c:if test="${!loggedIn}">	
				<a href="/">About Us</a>
				<a href="/register">Sign Up</a>
				<a href="/">Log in</a>
			</c:if>
			<c:if test="${loggedIn}">	
				<a href="/">Create event</a>
				<a href="/">Log Out</a>
			</c:if>
		</div>	
	</div>
    
    <div id="pageBody">
      <jsp:doBody/>
    </div>
    
	<div id="pageFooter">	
		<table>
			<tr>
				<td class="hover-2">
					<p>Contact Us</p>
					<span>Phone: XXXX-XXX-XXX</span><br/>
					<span>Email: lazydaisy@support.com</span>
				</td>
				<td class="hover-2">
					<p>Legal</p>
					<a href="/privacy">Cancellation Policy</a><br/>
					<a href="/tnc">Terms and Conditions</a><br/>
				</td>
				<td class="hover-2">
					<p>Quick Links</p>
					<c:if test="${!loggedIn}">
						<a href="/about">About Us</a><br/>
						<a href="/register">Register</a><br/>
					</c:if>
					<c:if test="${loggedIn}">
						<a href="/account">Account</a><br/>
						<a href="/account/settings">Settings</a><br/>
						<a href="/account/logout">Log Out</a><br/>
					</c:if>
				</td>
			</tr>
		</table>
		<p class="copyright">&copy; 2020 Localite</p>
	</div>
</body>

<script type="text/javascript" src="/resources/js/app.js"></script>
</html>