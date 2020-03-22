<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>

<html>
<head><title>LasyDaisy</title></head>

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
		    <a href="/"><img src="/resources/png/lazy-daisy-logo.png"/></a>
		</div>
		<div id="headerRight" class="hover-1">
			<a href="/encyclopedia">Currency</a>
			<c:if test="${loggedIn}">	
				<a href="/">Create event</a>
				<a href="/">Contact Us</a>
				<a href="/">Help</a>
				<a hred="/">Log Out</a>
			</c:if>
			<c:if test="${!loggedIn}">	
				<a href="/">About</a>
				<a href="/register">Sign Up</a>
				<a href="/">Log in</a>
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
					<p>Information</p>
					<a href="/about">About</a><br/>
					<a href="/about#sponsorLink">Sponsors</a><br/>
					<a href="/contact">Contact</a><br/>
					<a href="/faq">FAQs</a><br/>
					<a href="https://www.facebook.com/edkaustralia/"target="_blank">Facebook</a>
				</td>
				<td class="hover-2">
					<p>Quick Links</p>
					<c:if test="${loggedIn}">
						<a href="/account">Account</a><br/>
						<a href="/account/settings">Settings</a><br/>
						<a href="/account/login">Log Out</a><br/>
					</c:if>
					<c:if test="${!loggedIn}">
						<a href="/encyclopedia">Encyclopedia</a><br/>
						<a href="/register">Register</a><br/>
					</c:if>
				</td>
				<td class="hover-2">
					<p>Legal</p>
					<a href="/privacy">Privacy Policy</a><br/>
					<a href="/tnc">Terms and Conditions</a><br/>
					<a href="/security">Security</a><br/>
				</td>
			</tr>
		</table>
		<p class="copyright">&copy; 2020 Lazy Daisy</p>
	</div>
</body>

<script type="text/javascript" src="/resources/js/app.js"></script>
</html>