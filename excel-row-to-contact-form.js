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

	// Represents the excel row where each element represents a column
	// from the excel row data
	excelRowDataSplit = []
	
	getData(excelRowDataConstant){
		// returns a string of the data for the column "excelRowDataConstant"
		// for example: excelRowDataConstant(ExcelRowData.NMLS_COL)
		return excelRowDataSplit[excelRowDataConstant]
	}
	
	constructor(excelRowData){
		// get data from 
		// excelRowData and initialize 
		// variables to corresponding data

		// constants

		// this.contact = ""; // as of this version, just leave it blank
		this.email = "email";
		this.workPhone = "workPhone";
		// this.address = "address";
		this.nmls = "nmls";

		console.log("Type of excelRowData is: " + typeof(exceLRowData));
		self.excelRowDataSplit = excelRowData.split("\t");

		console.log("Excel Row Data is:\n[" + excelRowData + "]");
		console.log("excelRowDataSplit: " + self.excelRowDataSplit);
	}
}

class ContactFormFiller{

	constructor(){
	}

	static setContactField(contact){

	}

	static setAccountField(accountName){

	}

	static setEmailField(email){
		$("#MainContent_InsertContact_emlContactEmail_emailText").val(email);
	}

	static setWorkPhoneField(workPhone){
		// Make sure workPhone is in correct format: (xxx) xxx - xxxx
		var numbers = "";
		for(var i=0; i<workPhone.length; i++){
			var char = workPhone.charAt(i);
			
			if(char >= '0' && char <= 9)
				numbers+=(char+"");
		}

		if(numbers.length != 10) //expected 10 digits
			return "";

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
		document.getElementById("MainContent_InsertContact_miqAddressBox").setAttribute("value", formattedAddres);
		document.getElementById("MainContent_InsertContact_miqAddressBox").value = formattedAddress;

		// Address field - Account information section
		document.getElementById("MainContent_InsertContact_miqAAddressBox").setAttribute("value", formattedAddres); 
		document.getElementById("MainContent_InsertContact_miqAAddressBox").value = formattedAddress;
	}

	static setNMLSField(nmls){

	}

	static fillForm(excelData){

	}
}

// class FillFromClipboardBtn{

// 	constructor(){
// 		this.generateBtn();
// 	}

// 	generateBtn(){
// 		//return a JQuery object representing the 
// 		//"Fill from clipboard button"
// 		return $("<btn>Fill from clipboard button</btn>")
// 	}

// 	insertBtnToDom(){
		
// 	}
// }

// excelData = new ExcelData()

// $FillFromClipboardBtn = $("<btn></btn");
// $FillFromClipboardBtn.innerHtml = "Fill from clipboard";

class setUp{

	//No longer used???
	static extractExcelDataFromClipboard(){
		// Extract the excel data from the clipboard.
		// This method doesn't use navigator.clipboard.readText()
		// because it can't be used in the console, instead using the
		// execCommand method is used.

		// Create and add a text input field anywhere in the dom to house our
		// clipboard data, then extract the data from this text input box. Finally, delete
		// the temporary input box after the data has been extracted from the element.
		$("body").prepend("<input id=\"temp-input-box\" type=\"text\"></text>");
		var $tempInputBox = $("body #temp-input-box");
		$tempInputBox.focus().select();
		document.execCommand("paste");
		
		return;
		var extractedExcelData = $tempInputBox.val();
		console.log("extractedExcelData: " + extractedExcelData);
		$tempInputBox.remove();

		return extractedExcelData;
	}

	static fillBtnHandler(){
		// Extract the excel data from the fill input box.
		var inputElData = $("#excel-data-input").val();
		console.log("inputElData: " + inputElData);

		// create an instance of ExcelRowData with the extracted data
		
		var excelRowData = new ExcelRowData(inputElData);

		// Store the excel data in local variables
		var email = excelRowData.getData(ExcelRowData.EMAIL_COL);
		var phone = excelRowData.getData(ExcelRowData.PHONE_COL);

		console.log("email: " + email)
		console.log("phone: " + phone)
		
		// Fill the contact form
		ContactFormFiller.setEmailField(email);
		ContactFormFiller.setWorkPhoneField(phone);
	}

	static run(){
		// Insert and input box and fill button. The insert box houses the text
		// data that the user will paste. The fill button executes the filling process
		// for each relevant field in the excel data
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

setUp.run();