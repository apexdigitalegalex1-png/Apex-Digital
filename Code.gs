const SHEET_ID = "1FKgZTB3VNapsz3eHT9zkJHAqRg0st1Ux5XLu3-gxtCE";
const SHEET_NAME = "Leads";

function doPost(e) {
  try {

    const sheet = SpreadsheetApp
      .openById(SHEET_ID)
      .getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("Sheet 'Leads' not found");
    }

    const p = e.parameter;

    sheet.appendRow([
      new Date(),
      p.name || "",
      p.phone || "",
      p.email || "",
      p.service || "",
      p.details || "",
      p.source || "Apex Digital Website"
    ]);

    return ContentService
      .createTextOutput("SUCCESS")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {

    return ContentService
      .createTextOutput("ERROR: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
