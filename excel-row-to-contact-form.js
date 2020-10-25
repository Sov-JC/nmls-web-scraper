class ExcelRowData {
	// Represents the data from a row in the Excel spreadsheet

	// Column indexs from the excel spreadsheet (0-base)
	static NMLS_COL = 2
	static CONTACT_COL = 11
	static STREET_COL = 6
	static CITY_COL = 7
	static STATE_COL = 8
	static ZIP_COL = 9
	static EMAIL_COL = 10
	static PHONE_COL = 14
	static LEGAL_NAME_COL = 1

	// Represents the excel row where each element is a column
	// from the excel row.
	excelRowDataSplit = []
	
	getData(excelRowDataConstant){
		// Returns a string of the data for the column "excelRowDataConstant"
		// for example: excelRowDataConstant(ExcelRowData.NMLS_COL)

		return excelRowDataSplit[excelRowDataConstant]
	}
	
	constructor(excelRowData){
		// Get data from 
		// ExcelRowData and initialize variables
		// to corresponding data.

		self.excelRowDataSplit = excelRowData.split("\t");
	}
}

class ContactFormFiller{

	static setContactField(contact){
		document.getElementById("MainContent_InsertContact_nmeContactName-TextBox").value = contact;
	}

	static setAccountField(accountName){
		document.getElementById("MainContent_InsertContact_txtContactAccountName").value = accountName;
	}

	static setEmailField(email){
		document.getElementById("MainContent_InsertContact_emlContactEmail_emailText").value = email;
	}

	static setWorkPhoneField(workPhone){
		// Make sure workPhone is in correct format: (xxx) xxx - xxxx
		var numbers = "";
		for(var i=0; i<workPhone.length; i++){
			var char = workPhone.charAt(i);
			
			if(char >= '0' && char <= 9)
				numbers+=(char+"");
		}

		if(numbers.length != 10) // Expected 10 digits. If not 10, just return as is
			return workPhone

		var n = numbers;

		var formatedPhoneNumber = "(" +n[0] + n[1] + n[2] + ") " 
			+ n[3] + n[4] + n[5] + "-" + n[6] + n[7] + n[8] + n[9];

		// Now that we have the formated phone number, set the input element's value
		document.getElementById("MainContent_InsertContact_phnContactWorkPhone_PhoneTextBox").setAttribute("value", formatedPhoneNumber);

		// Also, set the "Main" field to this phone formated phone number
		document.getElementById("MainContent_InsertContact_phnAccountMainPhone_PhoneTextBox").setAttribute("value", formatedPhoneNumber);
	}

	static setAddress(street, city, state, zipcode){
		// Set the address in the Contact and Account information sections. 

		// Format the address. Fill the relevant fields.
		var formattedAddress = street + "\n" + city + ", " + state + " " + zipcode;
		
		// Address field - Contact information section
		document.getElementById("MainContent_InsertContact_miqAddressBox").setAttribute("value", formattedAddress);
		document.getElementById("MainContent_InsertContact_miqAddressBox").value = formattedAddress;

		// Address field - Account information section
		document.getElementById("MainContent_InsertContact_miqAAddressBox").setAttribute("value", formattedAddress); 
		document.getElementById("MainContent_InsertContact_miqAAddressBox").value = formattedAddress;
	}

	static setNMLSField(nmls){
		document.getElementById("MainContent_InsertContact_txtNMLS").value = nmls
	}
}

class setUp{
	// Utility class to set up the web page

	static fillBtnHandler(){
		// Extract the excel data from the fill input box.
		var inputElData = $("#excel-data-input").val();
		console.log("inputElData: " + inputElData);

		// Create an instance of ExcelRowData
		var excelRowData = new ExcelRowData(inputElData);

		// Extract some of the data in local varaibles
		var email = excelRowData.getData(ExcelRowData.EMAIL_COL);
		var phone = excelRowData.getData(ExcelRowData.PHONE_COL);
		var street = excelRowData.getData(ExcelRowData.STREET_COL);
		var city = excelRowData.getData(ExcelRowData.CITY_COL);
		var state = excelRowData.getData(ExcelRowData.STATE_COL);
		var zipcode = excelRowData.getData(ExcelRowData.ZIP_COL);
		var nmls = excelRowData.getData(ExcelRowData.NMLS_COL);
		var contact = excelRowData.getData(ExcelRowData.CONTACT_COL);
		var account = excelRowData.getData(ExcelRowData.LEGAL_NAME_COL);
		
		// Fill the contact form
		ContactFormFiller.setEmailField(email);
		ContactFormFiller.setWorkPhoneField(phone);
		ContactFormFiller.setAddress(street, city, state, zipcode);
		ContactFormFiller.setNMLSField(nmls);
		ContactFormFiller.setAccountField(account);
		ContactFormFiller.setContactField(contact);
	}

	static run(){
		// Insert an input box and fill button. The insert box houses the text of the excel row
		// data the user will paste. The fill button executes the filling logic
		// for predetermined fields in the website page's form.
		var fillContentElementHtml = 
			"<div id=\"fill-process-container\"> " + 
			"	<input type=\"text\" id=\"excel-data-input\"> <br>" + 
			"	<button id=\"fill-btn\" type=\"button\">" +
			"		Fill from input data" +
			"	</button>" + 
			"</div>";

		$("#InsertContact").after(fillContentElementHtml);

		$("#fill-btn").click(setUp.fillBtnHandler)
	}
}

$(document).ready(
	function () {
		setUp.run()
	}
);