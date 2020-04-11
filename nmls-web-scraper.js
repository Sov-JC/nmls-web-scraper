information_type = {
	INDIVIDUAL: 'individual',
	COMPANY: 'company',
}

//Object constructor representing an Office
//of the contact from an INDIVIDUAL page
function AuthorizedToRepresentOfficeLocation() {
	this.name = ""; //Company name
	this.nmlsID = ""; 
	this.city = "";
	this.state = "";
	this.zipCode = "";
}

function get_individual_contact_name(){
	return $("p").filter('.individual').text().trim()
}

//returns the nmls number as a string.
function get_nmls_two(info_type){

	if(info_type == information_type.COMPANY ||
		info_type == information_type.INDIVIDUAL){

		
		//get the span, then go up 2 parents, finaly select the following sibling
		$nmls_span = $("span:contains('NMLS ID:')")

		$nmls_span_parent = $nmls_span.parent()
		
		//console.log($nmls_span_parent.html())
		
		var nmls = $nmls_span.parent().next().html() //html used, is there a safer way?
		
		
		console.log("FINAL NMLS: " + nmls)
		return nmls.trim()
	}

	return ""
}

function get_nmls_two_test(info_type){
	get_nmls_two(info_type)
}

//returns the nmls number as a string 
function get_nmls(){
    //get the span, then go up 2 parents, finaly select the following sibling
    $nmls_span = $("span:contains('NMLS ID:')")

    $nmls_span_parent = $nmls_span.parent()

    //console.log($nmls_span_parent.html())

    nmls = $nmls_span.parent().next().html() //html used, is there a safer way?


    console.log("FINAL NMLS: " + nmls)
    return nmls.trim()
}

//get the street address
//returns an array. First element is street address 1, second element is street address 2
function get_street_address(){
    //$street_address_span = $("span:contains('Street&nbsp;Address')")
    $street_address_span = $("span:contains('Street')")
    $street_address_span = $("span:contains('Street Address')")

    //street address has a &nbsp code that needs t be removed so that
    //querying becomes easier.

    //remove &nbsp
    /*
    $("span").filter(
        function(){
            return $this.text.
        }
    )
    */

    //print out the name of the span using jQuery's text
	$span_text = $("span").text()

	space_char = "&nbsp;"; //non breaking space representation in html
	
	$street_address_el = $("span").filter(	
		function(index){
			//console.log("----- el.text is: |" + $(this).text())
			//regexp = /^Street/			
			//console.log("regex result is: " + /^Street/.test($(this).text()))
			//console.log("regex result is: " + new RegExp("^Street").test($(this).text()))
			return /^Street/.test($(this).text())
		}
	)
	console.log("street address el html is: " + $street_address_el.html())

	console.log("street_address_el size is: " + $street_address_el.length)

	$street_address_data_el = $street_address_el.parent().next();
	console.log("street_address_data_el text is: " + $street_address_data_el.text())


	$street_address_one_el = $street_address_data_el.contents().filter("span").eq(0) //get street address one
	$street_address_two_el = $street_address_data_el.contents().filter("span").eq(1) //get street address two

	console.log("street one is: [" + $street_address_one_el.text().trim()+"]")
	console.log("street two is: [" + $street_address_two_el.text().trim()+"]")

	//console.log($span_text)
	//street_addr_el_array = $.makeArray($street_address_el)
	//console.log("street address el: " + street_addr_el_array)
	//console.log("$street_address_span:" + $street_address_span.html())
	
	street_address_one = $street_address_one_el.text().trim()
	street_address_two = $street_address_two_el.text().trim()


    return [street_address_one, street_address_two]
}

function get_phone_number(){
	$phone_label_el = $("td.label").filter(":contains('Phone')").eq(0)
	//There is actually another td.label that contains 'Phone', but it is actually hidden!
	//Since it occurs after the first td label that we are interested in, we ignore it by
	//only selecting element 0
	
	console.log("phone_label_el length: " + $phone_label_el.length)
	console.log("phone number td content is:" + $phone_label_el.text())

	phone_number = $phone_label_el.next().text()
	console.log("phone number is: " + phone_number)

	return phone_number
}

function get_phone_number_two(info_type){
	//method for scraping INDIVIDUAL and COMPANY phone number is the same
	if(info_type == information_type.COMPANY ||
		info_type == information_type.INDIVIDUAL){
		$phone_label_el = $("td.label").filter(":contains('Phone')").eq(0)
		//There is actually another td.label that contains 'Phone', but it is actually hidden!
		//Since it occurs after the first td label that we are interested in, we ignore it by
		//only selecting element 0
		
		console.log("phone_label_el length: " + $phone_label_el.length)
		console.log("phone number td content is:" + $phone_label_el.text())

		phone_number = $phone_label_el.next().text().trim()
		console.log("phone number is: " + phone_number)

		return phone_number
	}else{
		return ""	
	}
}

//retrieve the website of a COMPANY page
function get_website(){
	$website_label_el = $("td.label").filter(":contains('Website:')")
	console.assert($website_label_el && $website_label_el.length == 1, "website label could not be found or length > 1")
	//console.log($website_label_el.text())
	
	website_data = $website_label_el.next().text()
	console.assert(website_data, "Could not extract Website data")
	console.log("Website is: " + website_data)
	return website_data
}

//retrieve to email address of a COMPANY page
function get_email(){
	$email_label_el = $("td.label").filter(":contains('Email:')")
	console.assert($email_label_el && $email_label_el.length == 1, "email label could not be found or length > 1")
	console.log($email_label_el)

	email_data = $email_label_el.next().text()
	console.assert(email_data, "Could not extract Email data")
	console.log("Email is: " + email_data)

	return email_data
}

function get_sponsored_mlos(){	
	$mlos_span_el = $("span.nowrap").filter(function(){			
			const white_space_unicode = "\u00A0"
			if(/^Sponsored\u00A0MLOs /.test($(this).text())){
				//console.log("** There's a hit! ** ")
				//console.log("The hit is: " + $(this).text())
				return true
			}else{
				//console.log("--- the following is not a match ---")
				//console.log($(this).text())
				return false
			}
		}
	)	
	//console.log("span length is " + $("span").length)
	//console.log($mlos_span_el.text())
	//console.assert($mlos_span_el.length === 1, "$mlos_span_el does not contain just 1 element")
	
	sponsored_mlos = $mlos_span_el.parent().next().text().trim()
	console.log("sponsored mlos: " + sponsored_mlos)

	return sponsored_mlos
}

function get_zip_code(){
	street_address_two = new String(get_street_address()[1])

	space_loc = street_address_two.lastIndexOf(' ')
	
	zip_code = street_address_two.substring(space_loc+1)

	console.log("Zip code is: [" + zip_code + "]")
	return zip_code
}

function get_state(){
	street_address_two = get_street_address()[1]

	last_space_loc = street_address_two.lastIndexOf(' ')

	street_address_two = street_address_two.slice(0,last_space_loc)

	last_space_loc = last_space_loc = street_address_two.lastIndexOf(' ')
	
	city = street_address_two.substring(last_space_loc+1)

	console.log("City is: ["+city+"]")
	return city
}

function get_city(){
	address_two = get_street_address()[1]

	city = address_two.substring(0, address_two.indexOf(','))

	console.log("City is: " + city)

	return city
}

//Returns the office locations of an INDIVIDUAL for the companies
//they are authorized to represent
function get_office_location(){

}


function get_city_two(){

}

function get_city_two_test(info_type){
	switch(info_type){
		case(information_type.INDIVIDUAL):

			break;
		case(information_type.COMPANY):
			break;
		default:
			return ""
	}
}

function get_url(){
	return window.location.href
}

function get_company_name(){
	return $("p.company").text().trim()
}

function get_dba(){
	$span_el = $("span.nowrap").filter(
		function(){
			const white_space_unicode = "\u00A0"
			if(/^Other\u00A0Trade\u00A0Names/.test($(this).text())){
				console.log("** There's a hit! ** ")
				console.log("The hit is: " + $(this).text())
				return true
			}else{
				//console.log("--- the following is not a match ---")
				//console.log($(this).text())
				return false
			}
		}
	)
	
	//console.assert($span_el.length === 1, "span_el for get_dba() is not equal to 1")

	return $span_el.parent().next().text().trim()
}

// returns true if the contact from an INDIVIDUAL page
// has at least one company that
// the he or she is authorized to represent. Returns false
// if the Authorized to Represent row reads "None'.
function is_authorized_to_represent(){
	
	$span_class = $("span.nowrap:contains('Authorized to Represent')")
	var authorized_to_represent_text_data = $span_class.parent().next().text().trim()

	//TS
	console.log("authorized_to_represent_text_data: " + authorized_to_represent_text_data)
	console.log("authorized_to_represent_text_data length: " + authorized_to_represent_text_data.length)
	//TE

	//The length of the text 'None' is equal to 4
	var NONE_TEXT_LENGTH = 4

	var contains_none = authorized_to_represent_text_data.search('None') >= 0
	
	if(contains_none == true && authorized_to_represent_text_data.length == NONE_TEXT_LENGTH)
		return false

	//a text other than 'None' was scraped for Authorized to Represent's data
	return true	
}

function is_authorized_to_represent_test(){
	console.log("is authorized to represent: " + is_authorized_to_represent())
	return
}


//NO LONGER USED
//Returns the "Authorized to Represent" string of an INDIVIDUAL page
//if the contact is authorized to represent. Returns empty string otherwise
function get_authorized_to_represent(){
	if(is_authorized_to_represent)
		return $("span.nowrap").filter(":contains('Authorized to Represent')").parent().next().text().trim()
	else
		return ""
}

function get_authorized_to_represent_test(){
	content = get_authorized_to_represent()

	console.log("Authorized to represent content is: " + content)
}

// scrape all the office locations if an INDIVIDUAL page
//
// returns an array of AuthorizedToRepresentOfficeLocation
// of all the office locations if the contact is
// allowed to represent a company and the office locations
// are displayed in the "Office Locations" section of
// the page. 
// returns an empty string otherwise
function get_all_office_locations(){

	if(is_authorized_to_represent()){
		var allOffices = []

		//TS
		var test_data = $("h1:contains('Office Locations')").html()
		console.log("test_data lenght :: " + test_data.length)
		console.log("test_data:: " + test_data)
		//TE

		//TS
		console.log($("h1:contains('Office Locations')").parent().next().next().children().first().html())
		//TE
		
		//get table body where Office Locations data is stored
		var $tbody_el = $("h1:contains('Office Locations')").parent().next().next().children().first()

		//Row data. Skip first element since it's just header text
		var $trow_els = $tbody_el.children().slice(1)

		//TS
		console.log("$trow_els :: " + $trow_els.html())
		//TE

		//for each row
		$trow_els.each(function(){
			var $this_row = $(this)
			var $row_tds = $(this).children()

			var office_information = new AuthorizedToRepresentOfficeLocation()

			//for each column
			$row_tds.each(function(index){

				//extract the appropriate information and record
				//the data into the AuthorizedToRepresentOfficeLocation instance
				switch(index){
					case 0:
						office_information.name = $(this).text().trim()
						break;
					case 1:
						office_information.nmlsID = $(this).text().trim()
						break;
					case 4:
						office_information.city = $(this).text().trim()
						//city
						break;
					case 5:
					    office_information.state = $(this).text().trim()
						//state
						break;
					case 6:
						office_information.zipCode = $(this).text().trim()
						//zip
						break;
				}
			})
			
			console.log("This row's name is: " + office_information.name)
			allOffices.push(office_information)
		})

		return allOffices
		
	}else{
		return []
	}
}

function get_all_office_locations_test(){
	get_all_office_locations()
}

function nbsp_test(){
    $nbsp_elem = $("*:contains('&nbsp;')")
    console.log("nbsp elements: " + $nbsp_elem.html())
}

function get_street_address_test(){
	get_street_address()
}

function get_phone_number_test(){
	get_phone_number()
}

function get_website_test(){
	get_website()
}

function get_email_test(){
	console.log(get_email())
}

function get_sponsored_mlos_test(){
	console.log(et_sponsored_mlos())
}

function get_zip_code_test(){
	console.log(get_zip_code())
}

function get_state_test(){
	console.log(get_state())
}

function get_city_test(){
	console.log(get_city())
}

function get_url_test(){
	console.log(get_url())
}

function get_company_name_test(){	
	console.log(get_company_name())
}

function get_dba_test(){
	console.log(get_dba())
}

function test_script(){	
	console.log(get_city() + "\t" +
	get_email() + "\t" +
	get_nmls() + "\t" + 
	get_phone_number() + "\t" + 
	get_sponsored_mlos() + "\t" + 
	get_state() + "\t" + 
	get_street_address()[0] + "\t" +
	get_street_address()[1] + "\t" +
	get_website() + "\t" + 
	get_zip_code() + "\t" + 
	get_url()
	)
}

function get_data_in_excel_format(){	
	data = "\t" + 
		get_company_name() + "\t" +
		get_nmls() + "\t" +
		"\t" +
		"\t" + 
		get_sponsored_mlos() + "\t" +
		get_street_address()[0] + "\t" +
		get_city() + "\t" +
		get_state() + "\t" +
		get_zip_code() + "\t" +
		get_email() + "\t" +
		"\t" + //contact
		get_website() + "\t" +
		get_dba() + "\t" + 
		get_phone_number()

	return data
}

function copy_data_from_text_box(){
	$data_input_box = $("#data")
	$data_input_box.focus().select()
	document.execCommand("copy")
}

//DEPRECATED
function add_input_box_and_copy_button_old(){
	var input_el_html = "<input type=\"text\" value = \"\" style=\"width:80%;text-align:center;margin-bottom:1px\" id=\"data\">" //input box
	var copy_el_html = "<button id = \"copy-button\">Copy data</button>" //copy button
	document.body.innerHTML = input_el_html + "<br>" + copy_el_html //add input box and copy button
	
	//listener: copy the data in the text box to the clip board
	$("#copy-button").on("click", copy_data_from_text_box)
}

//DEPRECATED
function create_input_box_and_copy_button_old(){
	var input_el_html = "<input type=\"text\" value = \"\" style=\"width:80%;text-align:center;margin-bottom:1px\" id=\"data\">" //input box
	var copy_el_html = "<button id = \"copy-button\">Copy data</button>" //copy button

	//listener: copy the data in the text box to the clip board
	$("#copy-button").on("click", copy_data_from_text_box)

	return [input_el_html, copy_el_html]
}

//DEPRECATED
function main_old(){	
	//scrape the data 
	data = get_data_in_excel_format()	
	//log the data so that the person can copy paste
	//the data from the inspector if the text box's data
	//is faulty.
	console.log(data)

	//clear body and style it a bit
	document.body.innerHTML = "" 
	$("body").css({
		"padding" : "8px"
	})

	//add input box, along with the copy button
	add_input_box_and_copy_button()
		
	//add the data onto the text box that holds the data
	$("#data").val(data)

	//automatically copy the data onto the clipboard. this is for convenience
	//so the user doesn't have to hit the "Copy" button after the script runs
	copy_data_from_text_box()
}

function main(){
	//only run this script in a COMPANY information page
	if(window.location.href.includes("/EntityDetails.aspx/COMPANY/") == false)
		return

	//scrape the data 
	data = get_data_in_excel_format()

	//log the data so that the person can copy paste
	//the data from the inspector if the text box's data
	//is faulty.
	console.log(data)

	//create a div that will hold the text box and copy button
	$clear_div = $("div.newSearch").next()
	$content_div = $("<div></div>").addClass("text-and-button")
	$clear_div.after($content_div)

	//create the box and button 
	var input_box_el_html = "<input type=\"text\" value = \"\" style=\"width:80%;text-align:center;margin-bottom:1px\" id=\"data\">" //input box
	var copy_btn_el_html = "<button id = \"copy-button\">Copy data</button>" //copy button	
	$("#copy-button").on("click", copy_data_from_text_box) //listener: copy the data in the text box to the clip board

	//add the elements. add the event listener to copy button
	$content_div.append(input_box_el_html)
	$content_div.append(copy_btn_el_html)
	$("#copy-button").on("click", copy_data_from_text_box) //listener: copy the data in the text box to the clip board

	//add data to text box
	$("#data").val(data)

	//automatically copy data onto clipboard for convenience when script it run
	copy_data_from_text_box()
}


function main_two(){
	//only run this script in a COMPANY or INDIVIDUAL information page
	var info_type = ""

	if(window.location.href.includes("/EntityDetails.aspx/COMPANY/") == true)
		info_type = information_type.COMPANY
	else if(window.location.href.includes("EntityDetails.aspx/INDIVIDUAL/") == true)
		info_type = information_type.INDIVIDUAL
	else
		return //do nothing -- script is not suppose to run on this page

	switch(info_type){
		case information_type.INDIVIDUAL:
			/*
			cell 1 is contact name
			cell 2 is nmls
			cell 3 is blank
			cell 4 is blank
			cell 5 is blank
			cell 6 is phone number
			cell 7 is blank
			cell 8 is Authorized to Represent
			cell 9 is blank
			cell 10 is city name
			cell 11 is state name
			cell 12 is zip code
			*/
			var individual_contact_name = get_individual_contact_name()
			console.log("individual contact name is " + individual_contact_name)
			var nmls_id = get_nmls_two(info_type)
			console.log("nmls_id is " + nmls_id)
			var phone_number = get_phone_number_two(info_type)
			console.log("phone number is " + phone_number)


			console.log("-- Not done implemenenting INDIVIDUAL scraper yet --")
			break
		case information_type.COMPANY:
			//scrape the data 
			data = get_data_in_excel_format()

			//log the data so that the person can copy paste
			//the data from the inspector if the text box's data is faulty.
			console.log(data)

			//create a div that will hold the text box and copy button
			$clear_div = $("div.newSearch").next()
			$content_div = $("<div></div>").addClass("text-and-button")
			$clear_div.after($content_div)

			//create the box and button 
			var input_box_el_html = "<input type=\"text\" value = \"\" style=\"width:80%;text-align:center;margin-bottom:1px\" id=\"data\">" //input box
			var copy_btn_el_html = "<button id = \"copy-button\">Copy data</button>" //copy button	
			$("#copy-button").on("click", copy_data_from_text_box) //listener: copy the data in the text box to the clip board

			//add the elements. add the event listener to copy button
			$content_div.append(input_box_el_html)
			$content_div.append(copy_btn_el_html)
			$("#copy-button").on("click", copy_data_from_text_box) //listener: copy the data in the text box to the clip board

			//add data to text box
			$("#data").val(data)

			//automatically copy data onto clipboard for convenience when script it run
			copy_data_from_text_box()
			break
		default:
			//do nothing
			break;
	}
		
}

//tests the creation of modification of a
//AuthorizedToRepresentOfficeLocation object
function test_office_objects(){
	office_one = new AuthorizedToRepresentOfficeLocation()
	office_one.name = "office one"
	

	console.log("office_one's name: " + office_one.name)
	console.log("office_one's city: " + office_one.city)
	
	console.assert(office_one.name == "office ones")
	console.assert(office_one.city == "")
}

function tests(){
	//test_office_objects()
	get_all_office_locations_test()
}

function run(){
	run_main = false

	if(run_main){
		main()
	}else{		
		tests()
	}
}

run()