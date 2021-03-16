var values;
var newTotal; 
var estTime;
var wind;

//This function updates the item totals when a selection is made 
$(document).on("change", "select", function()
{
	var num = (this.name)[4];
	var amount = $(this).val();
	var itemTotal = menuItems[num].cost * amount;

	//Puts the individual itemTotal in the correpsnding textbox Total
	if(num == 0)
	{
		$("input[name ='cost']:eq(0)").val(itemTotal.toFixed(2));
	}
	if(num == 1)
	{
		$("input[name ='cost']:eq(1)").val(itemTotal.toFixed(2));
	}
	if(num == 2)
	{
		$("input[name ='cost']:eq(2)").val(itemTotal.toFixed(2));
	}
	if(num == 3)
	{
		$("input[name ='cost']:eq(3)").val(itemTotal.toFixed(2));
	}
	if(num == 4)
	{
		$("input[name ='cost']:eq(4)").val(itemTotal.toFixed(2));
	}
	updateTotals();
});

function updateTotals (newSub)
{
	//Makes an array of all the totals
	values = $("input[name='cost']").map(function(){
		if (Number.isNaN(parseFloat(this.value)))
		{
			return 0;
		}
		else 
		{
			return parseFloat(this.value)
		}
  	}).get();

	//Adds up the array
	var newSub = 0;
	for (var i = 0; i < values.length; i++) 
	{
		if (values[i] != NaN)
		{
			newSub += values[i];
		}
	}
	var newTax = newSub * .0625;
	newTotal = newSub + newTax;

	$("input[name ='subtotal']").val(newSub.toFixed(2));
	$("input[name ='tax']").val(newTax.toFixed(2));
	$("input[name ='total']").val(newTotal.toFixed(2));
}

$(document).ready(function()
{
	//Hides the street and city paragraphs to begin with
	$('p:eq(2)').hide();
	$('p:eq(3)').hide();

	//Shows them if delivery is checked
	$('input[name="p_or_d"]:eq(1)').click(function()
	{
        $('p:eq(2)').show();
        $('p:eq(3)').show();
    });

	//Hides them again if pickup is checked
    $('input[name="p_or_d"]:eq(0)').click(function()
	{
		$('p:eq(2)').hide();
	    $('p:eq(3)').hide();
	});
})

function onSubmit()
{
	//Check name and phone entered
	if($('input[name="lname"]').val() && $('input[name="phone"]').val())
	{
		//Check valid number
		if(validateNumber())
		{
			//Check an item has been selected
			if(newTotal > 0)
			{
				//Pickup
				if ($('input[name="p_or_d"]:eq(0)').is(":checked"))
				{
					estTime = elapseTime(15);
					wind = window.open("orderSum.html");
					displayOrder();
				}
				//Delivery
				else
				{
					//Check address is entered
					if($('input[name="street"]').val() && $('input[name="city"]').val())
					{
						estTime = elapseTime(30);
						wind = window.open("orderSum.html");
						displayOrder();
					}
					else
					{
						alert("Please enter a city and street for delivery.");
					}
				}
			}
			else
			{
				alert("Please order at least one item.");
			}
		}
	}
	else
	{
		alert("Please enter a last name and phone number.");
	}
}

function validateNumber() 
{
  	var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if(($('input[name="phone"]').val()).match(phoneno))
	{
	   	return true;
	}
	else
	{
	  	alert("Please enter a valid phone number.");
	    return false;
	}
}

function elapseTime(time)
{
	var currentDate = new Date();
	var A_P = "AM";
	estTime = new Date(currentDate.getTime() + time*60000);
	var minutes = estTime.getMinutes();
	var hour = estTime.getHours();

	if(hour >= 12)
	{
		hour-=12;
		A_P = "PM";
	}
	if(minutes < 10)
	{
		minutes = "0" + minutes;
	}

	estTime = hour + ":" + minutes + " " + A_P;
 	return estTime;
 }

function displayOrder()
{
	wind.document.write("Thank you for your order!" + "<br><br>");
	wind.document.write("Your items are: " + "<br>");
	for (var i = 0; i < values.length; i++) 
	{
		if (values[i] > 0 )
		{
			var count = values[i]/menuItems[i].cost;
			wind.document.write(count + " " + menuItems[i].name + "<br>");
		}
	}

	var type = " be ready for pickup at: ";
	if($('input[name="p_or_d"]:eq(1)').is(":checked"))
	{
		type = " arrive at: ";
	}
	wind.document.write("<br>" + "Your order will" + type + estTime + "<br><br>");
	wind.document.write("Your total is: $" + newTotal.toFixed(2)); 
}