const puppeteer = require('puppeteer')
const uuid = require('uuid');
const pdfName = `myPdf-${uuid.v4()}.pdf`;

const fs = require('fs');

const directoryPath = 'resumePdfs';

// Check if the directory already exists
if (!fs.existsSync(directoryPath)) {
  // Directory does not exist, create it
  fs.mkdir(directoryPath, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
    } else {
      console.log('Directory created successfully');
    }
  });
} else {
  console.log('Directory already exists');
}


async function downloadPDF(url, fileName) {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            const elements = document.getElementsByClassName('removeInPdf');
            for (let i = 0; i < elements.length; i++) {
              elements[i].style.display = 'none';
            }
          });
        await page.pdf({ path: fileName + pdfName,
            width: '210mm',
            height: '297mm',
            margin: {
                top: '0',
                bottom: '0'
            }
        });
        // const message = document.createElement('p');
        // message.textContent = 'PDF has been downloaded!';
        // document.body.appendChild(message);
        await browser.close();
       
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {downloadPDF, pdfName}