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
		// this.account = "account";
		this.email = "email";
		this.workPhone = "workPhone";
		// this.address = "address";
		this.nmls = "nmls";

		console.log("Type of excelRowData is: " + typeof(exceLRowData));
		self.excelRowDataSplit = excelRowData.split("\t");

		console.log("Excel Row Data is:\n[" + rowDataSplit + "]");
		console.log("rowDataSplit: " + rowDataSplit);
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

	}

	static setAddress(address){

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
		// Extract the excel data from the clipboard.
		var clipboardData = setUp.extractExcelDataFromClipboard();

		// create an instance of ExcelRowData with the extracted data
		var excelRowData = new ExcelRowData(clipboardData);

		ContactFormFiller.setEmailField(excelRowData.getData(ExcelRowData.EMAIL_COL));
	}
	

	static setUpFillFromClipboardButton(){
		
	}

	static run(){
		//Insert the "Fill from clipboard" button to the dom.
		var fillElementHtml = 
			"<div id=\"btn-container\"> " + 
			"	<button id=\"fill-btn\" type=\"button\">" +
			"		Fill from clipboard" +
			"	</button>" + 
			"</div>";

		$("#InsertContact").after(fillElementHtml);

		$("#fill-btn").click(this.fillBtnHandler)

	}
}

setUp.run();