<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<%@taglib prefix="t" tagdir="/WEB-INF/tags/" %>

<link rel="stylesheet" href="/resources/css/common/home.css">

<t:wrapper>
	<%@include file="/WEB-INF/views/account/register.jsp" %>
	<!-- <div class="box-1">
		<input type="text" name="location">
		<div>
			<input type="date" name="start">
			<input type="date" name="end">
		</div>
		<div class="dropdown-1">
			<div class="adultSelection">
				<div class="travellerDescription"></div>
				<div class="travellerAmount">
					<img class="add" alt="add">
					<span id="adultTravellers" name="adultTravellers">0</span>
					<img class="reduce" alt="reduce">
				</div>
			</div>
			<div class="childSelection">
				<div class="travellerDescription"></div>
				<div class="travellerAmount">
					<img class="add" alt="add">
					<span id="childTravellers" name="childTravellers">0</span>
					<img class="reduce" alt="reduce">
				</div>
			</div>
			<div class="infantSelection">
				
			</div>
		</div> -->
	</div>

<script>
	$(".add").on("click", function()
	{	
		var numOfTravellers;
		if(numOfTravellers=$(this).parent().find("#adultTravellers").html())
			$("#adultTravellers").html(parseInt(numOfTravellers)+1);
		else if(numOfTravellers=$(this).parent().find("#childTravellers").html())
			$("#childTravellers").html(parseInt(numOfTravellers)+1);
	});

	$(".reduce").on("click", function()
	{
		var numOfTravellers;
		if(numOfTravellers=$(this).parent().find("#adultTravellers").html())
		{
			if(numOfTravellers > 0) 
				$("#adultTravellers").html(parseInt(numOfTravellers)-1);
		}
		else if(numOfTravellers=$(this).parent().find("#childTravellers").html())
		{
			if(numOfTravellers > 0) 
				$("#childTravellers").html(parseInt(numOfTravellers)-1);
		}
	});

</script>
</t:wrapper>