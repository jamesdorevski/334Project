<form class="box-1" method="post" action="/findTour">
	<!-- Location -->
	<div style="display:inline-block;float:left;">
		<input type="text" name="location" placeholder="Location">
	</div>
	
	<!-- Length of Stay -->
	<div style="display:inline-block;float:left;">
		<input class="datePicker" type="text" name="start" onfocus="type='date'" placeholder="Arrive Date" style="width:190px;margin-left:10px;">
	</div>

	<!-- Travellers -->
	<div id="travellerSelection" class="divInput" style="width:200px;">
		Travellers<i class="fa fa-angle-down" aria-hidden="true"></i>
	</div>
	<div class="divInput travellerDropdown">
		<div class="adultSelection">
			<div class="travellerDescription">Adult</div>
			<div class="travellerAmount">
				<img class="reduceButton" alt="reduceButton"/>
				<input id="adultTravellers" name="adultTravellers" value="0"/>
				<img class="addButton" alt="addButton"/>
			</div>
		</div>
		<div class="childSelection">
			<div class="travellerDescription">Child</div>
			<div class="travellerAmount">
				<img class="reduceButton" alt="reduceButton"/>
				<input id="childTravellers" name="childTravellers" value="0"/>
				<img class="addButton" alt="addButton"/>
			</div>
		</div>
		<div class="infantSelection">
			<div class="travellerDescription">Infant</div>
			<div class="travellerAmount">
				<img class="reduceButton" alt="reduceButton"/>
				<input id="infantTravellers" name="infantTravellers" value="0"/>
				<img class="addButton" alt="addButton"/>
			</div>
		</div>
	</div>
	<input class="button-2" type="submit" value="Find Tour" style="margin:70px -130px;">
</form>


<script>
	$(document).on("click", function()
	{
		$(".travellerDropdown").css("display", "none");
	});

	$("img.addButton").on("click", function(e)
	{	
		var numOfTravellers;
		if(numOfTravellers=$(this).parent().find("#adultTravellers").val())	
			$("#adultTravellers").val(parseInt(numOfTravellers)+1);
		else if(numOfTravellers=$(this).parent().find("#childTravellers").val())
			$("#childTravellers").val(parseInt(numOfTravellers)+1);
		else if(numOfTravellers=$(this).parent().find("#infantTravellers").val())
			$("#infantTravellers").val(parseInt(numOfTravellers)+1);

		e.stopPropagation();
	});

	$("img.reduceButton").on("click", function(e)
	{
		var numOfTravellers;
		if(numOfTravellers=$(this).parent().find("#adultTravellers").val())
		{
			if(numOfTravellers > 0) 
				$("#adultTravellers").val(parseInt(numOfTravellers)-1);
		}
		else if(numOfTravellers=$(this).parent().find("#childTravellers").val())
		{
			if(numOfTravellers > 0) 
				$("#childTravellers").val(parseInt(numOfTravellers)-1);
		}
		else if(numOfTravellers=$(this).parent().find("#infantTravellers").val())
		{
			if(numOfTravellers > 0) 
				$("#infantTravellers").val(parseInt(numOfTravellers)-1);
		}

		e.stopPropagation();
	});

	$("#travellerSelection").on("click", function(e)
	{
		if($(".travellerDropdown").css("display") == "none")
		{
			$(".travellerDropdown").css("display", "block");
			e.stopPropagation();
		}
		else
			$(".travellerDropdown").css("display", "none");
	})

	$(".datepicker").on("focusout", function()
	{
		if($(this).val() == "")
			$(this).prop("type", "text");
	});
</script>