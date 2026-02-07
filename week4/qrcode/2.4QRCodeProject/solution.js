import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Ask user for URL and file name
inquirer.prompt([
  {
    message: "Type in your URL (start with http:// or https://):",
    name: "URL",
  },
  {
    message: "Enter a name for the QR code image (.png):",
    name: "filename",
    default: "qr_img.png",
  }
])
.then((answers) => {
  const url = answers.URL;
  const filename = answers.filename;

  // Check URL is correct
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    console.log("Error: URL must start with http:// or https://");
    return;
  }

  // Make QR code and save image
  const qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream(filename));

  // Save URL to text file
  fs.writeFile("URL.txt", url, (err) => {
    if (err) throw err;
    console.log(`URL saved to URL.txt`);
    console.log(`QR code saved as ${filename}`);
  });
})
.catch((error) => {
  if (error.isTtyError) {
    console.log("Prompt can't show here");
  } else {
    console.log("Something went wrong:", error);
  }
});
