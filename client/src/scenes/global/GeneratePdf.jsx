import React, { useEffect, useState } from 'react';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';
import axios from 'axios';
import afinLogo from '/afinLogo.jpg';
import imageBack from '/imageBack.png';
import "../../index.css"


const PDFGenerator = (data) => {
  console.log(data, "data");

  const generatePDF = async () => {
    if (!data) return;

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const month = date.getMonth() + 1; // Month is zero-based, so add 1
      const year = date.getFullYear();
      const formattedDate = `${month}-${year}`;
      return formattedDate;
    };
    const formatDate2 = (dateString) => {
        const date = new Date(dateString);
        const options = {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
      };

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Fetch the images
    const [afinLogoBytes, imageBackBytes] = await Promise.all([
      fetch(afinLogo).then((res) => res.arrayBuffer()),
      fetch(imageBack).then((res) => res.arrayBuffer()),
    ]);

    // Embed the images in the PDF
    const afinLogoImage = await pdfDoc.embedJpg(afinLogoBytes);
    const imageBackImage = await pdfDoc.embedPng(imageBackBytes);

    // Customize the code below according to your specific PDF structure
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const formattedDate = formatDate(data.data.date);

    const titleText = `REPORT ${formattedDate}`;
    const subTitleText = 'HEALTH AND SAFETY MANDATORY SERVICES';
    const fontSize = 18;
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const titleWidth = titleFont.widthOfTextAtSize(titleText, fontSize);
    const subTitleWidth = titleFont.widthOfTextAtSize(subTitleText, fontSize);

    const titleX = (page.getWidth() - titleWidth) / 2;
    const titleY = (page.getHeight() - fontSize) - 150;

    const subTitleX = (page.getWidth() - subTitleWidth) / 2;
    const subTitleY = titleY - fontSize;

    page.drawImage(afinLogoImage, {
      x: (page.getWidth() / 2) - 25, // X coordinate of the image
      y: 750, // Y coordinate of the image
      width: 50, // Width of the image
      height: 50, // Height of the image
    });

    page.drawText(titleText, {
      x: titleX,
      y: titleY,
      size: fontSize,
      font: titleFont,
    });

    page.drawText(subTitleText, {
      x: subTitleX,
      y: subTitleY,
      size: fontSize,
      font: titleFont,
    });

    page.drawImage(imageBackImage, {
        x: 0,
        y: (page.getHeight() / 2) - 150,
        width: page.getWidth(),
        height: 300,
    });

    page.drawText("Executed by:", {
        x: 50,
        y: 220,
        size: fontSize,
        font: titleFont,
      });

      page.drawText(data.data.InterventionGroup[0], {
        x: 100,
        y: 190,
        size: 14,
        font: titleFont,
      });

      page.drawText(formatDate2(data.data.date), {
        x: 380,
        y: 120,
        size: 30,
        font: titleFont,
      });

      const secondPage = pdfDoc.addPage();
      const secondPageFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
      // Set the starting position for the content
      const contentX = 50;
      let contentY = secondPage.getHeight() - 300;
    
      // Define the structure content
      const structureContent = [
        { title: '1-                           Introduction'},
        { title: '2-                           Customer'},
        { title: '3-                           Intervention group'},
        { title: '4-                           Items table'},
        { title: '5-                           List of figures'},
        { title: '6-                           Check list for services'},
        { title: '7-                           Criticity evaluation method'},
        { title: '8-                           Improvement'},
        { title: 'Annex                   HSE terminology'},
      ];
    
      // Add the title "REPORT PLAN"
      const titleText2 = 'REPORT PLAN';
      const titleSize = 36;
      const titleWidth2 = secondPageFont.widthOfTextAtSize(titleText2, titleSize);
      const titleX2 = (secondPage.getWidth() - titleWidth2) / 2;
      const titleY2 = secondPage.getHeight() - 80;
    
      secondPage.drawText(titleText2, {
        x: titleX2,
        y: titleY2,
        size: titleSize,
        font: secondPageFont,
      });
    
      // Add the structure content to the second page
      structureContent.forEach((item, index) => {
        const text = `${item.title}`;
        const textSize = 22;
    
        // Calculate the position for the current item
        const itemY = contentY - (index * (textSize + 10));
    
        secondPage.drawText(text, {
          x: contentX,
          y: itemY,
          size: textSize,
          font: secondPageFont,
        });
      });
    
      const thirdPage = pdfDoc.addPage();
      const thirdPageFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      thirdPage.drawText("1- Introduction", {
        x: 50,
        y: thirdPage.getHeight() - 80,
        size: 22,
        font: secondPageFont,
      });
      const extractYear = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        return year;
      }; 
      thirdPage.drawText("2- Customer", {
        x: 50,
        y: thirdPage.getHeight() - 110,
        size: 22,
        font: secondPageFont,
      });
      const tableX = 50; // X position of the table
      const tableY = thirdPage.getHeight() - 200; // Y position of the table
      const tableWidth = thirdPage.getWidth() - 2 * tableX; // Width of the table
      const cellMargin = 10; // Margin between cells

      const tableData = [
        ['Company Name:', `${data.data.companyName}`],
        ['Address:', `${data.data.address}`],
        ['Total Employees:', `${data.data.totalEmployees}`],
        ['Nature Of Business:', `${data.data.natureOfBusiness}`],
        ['Nature Of Risk:', `${data.data.natureOfRisk}`],
        ['Creation Date:', `${extractYear(data.data.creationDate)}`],
      ];
    
      // Draw the table
      
const drawTable = (data) => {
    const columnWidth = tableWidth / data[0].length; // Width of each column
    const rowHeight = 20; // Height of each row
  
    // Set the initial position of the first cell
    let currentX = tableX;
    let currentY = tableY;
  
    // Iterate over the rows and columns
    data.forEach((row) => {
      row.forEach((cell) => {
        // Draw the cell content
        thirdPage.drawText(cell, {
          x: currentX + cellMargin,
          y: currentY - cellMargin,
          size: 12,
          font: secondPageFont,
        });
  
        // Draw the cell border
        thirdPage.drawRectangle({
          x: currentX,
          y: currentY - rowHeight,
          width: columnWidth,
          height: rowHeight,
          borderColor: rgb(0, 0, 0), // Border color (black)
          borderWidth: 1, // Border width in points
        });
  
        // Move to the next column
        currentX += columnWidth;
      });
  
      // Move to the next row
      currentX = tableX;
      currentY -= rowHeight;
    });
  };
    
      // Call the drawTable function with the table data
      drawTable(tableData);
      thirdPage.drawText("2- Intervention group", {
        x: 50,
        y: thirdPage.getHeight() - 370,
        size: 22,
        font: secondPageFont,
      });

    
      const items = data.data.InterventionGroup;
      
      const listX = 150;
      let listY = thirdPage.getHeight() - 450;
      const circleRadius = 3;
      const listItemFontSize = 12;
      const listItemSpacing = 10;
      
      for (let i = 0; i < items.length; i++) {
        const listItem = ` ${items[i]}`;
      
        // Draw the circle
        thirdPage.drawCircle({
          x: listX - circleRadius * 2,
          y: listY + listItemFontSize / 2 - circleRadius,
          size: circleRadius,
        });
      
        // Draw the list item text
        thirdPage.drawText(listItem, {
          x: listX,
          y: listY,
          size: listItemFontSize,
          font: font,
        });
      
        // Adjust the y-coordinate for the next item
        listY -= listItemFontSize + listItemSpacing;
      }

    const fourthPage = pdfDoc.addPage();
    fourthPage.drawText("2- Items Table", {
      x: 50,
      y: thirdPage.getHeight() - 80,
      size: 22,
      font: secondPageFont,
    });
    fourthPage.drawText("Monthly mandatory follow-up: XXXX\n HEALTH AND SAFETY SERVICES", {
      x: 135,
      y: thirdPage.getHeight() - 120,
      size: 18,
      font: secondPageFont,
      color: rgb(0x11 / 255, 0x8a / 255, 0xb2 / 255),
    });



    const tableData4 = [];
let figureCount = 1;
const attachmentFigures = {};

data.data.nonConformities.forEach((nonConformity) => {
  
  const attachmentUrls = nonConformity.attachment.map((attachment) => {
    const figureNumber = `Figure ${figureCount}`;
    attachmentFigures[figureNumber] = attachment.url;
    figureCount++;
    return figureNumber;
  });
  tableData4.push([
    nonConformity.num,
    nonConformity.location,
    nonConformity.nonConformity,
    nonConformity.inspectOrComment,
    attachmentUrls.join('\n'), // Join attachment figure numbers with newlines
    nonConformity.recommendation,
    nonConformity.month1,
    nonConformity.month2,
    nonConformity.criticity.toString(),
    nonConformity.priority
  ]);
});

console.log(attachmentFigures)

// Example usage of attachmentFigures object

    
    // Example usage of attachmentFigures object
    
    
    const tableX4 = 10;
    const tableY4 = fourthPage.getHeight() - 250;
    const columnWidths = [
      30, // Item N°
      60, // Location
      70, // Non Conformity
      80, // Inspect or Comment
      60, // Attachment
      110, // Recommendation
      40, // NC fixed: Ok/No
      40, // NC fixed: Ok/No
      40, // Criticity
      40, // Priority
    ];
    const rowHeight = 40;
    const fontSize4 = 8;
    const font4 = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    // Draw column headers with borders
    const headers = ['Item N°', 'Location', 'Non Conformity', 'Inspect\n Or Comment', 'Attachnment', 'Recommendation', 'NC fixed:\n Ok/No', 'NC fixed:\n Ok/No', 'Criticity', 'Priority'];
    headers.forEach((header, index) => {
      const headerX = tableX4 + columnWidths.slice(0, index).reduce((acc, width) => acc + width, 0);
      const headerY = tableY4;
    
      // Draw cell border
      fourthPage.drawRectangle({
        x: headerX,
        y: headerY,
        width: columnWidths[index],
        height: rowHeight,
        borderWidth: 1, // Border width in points
        borderColor: rgb(0, 0, 0), // Black color
        fill: false, // No fill
      });
    
      fourthPage.drawText(header, {
        x: headerX + 5,
        y: headerY + 30,
        size: fontSize4,
        font: font4,
        color: rgb(0, 0, 0), // Black color
        alignment: { horizontal: 'center', vertical: 'center' }, // Center alignment
      });
    });
    
    // Draw table rows with borders
    tableData4.forEach((rowData, rowIndex) => {
      const rowY = tableY4 - (rowIndex + 1) * rowHeight;
    
      rowData.forEach((cellData, columnIndex) => {
        const cellX = tableX4 + columnWidths.slice(0, columnIndex).reduce((acc, width) => acc + width, 0);
        const cellY = rowY;
    
        // Draw cell border
        fourthPage.drawRectangle({
          x: cellX,
          y: cellY,
          width: columnWidths[columnIndex],
          height: rowHeight,
          borderWidth: 1, // Border width in points
          borderColor: rgb(0, 0, 0), // Black color
          fill: false, // No fill
        });
    
        fourthPage.drawText(cellData, {
          x: cellX + 5,
          y: cellY + 30,
          size: fontSize4,
          font: font4,
          color: rgb(0, 0, 0), // Black color
          alignment: { horizontal: 'center', vertical: 'center' }, // Center alignment
        });
      });
    });


   
      // Retrieve the figure URLs and names from the attachmentFigures object
      const figureUrls = Object.values(attachmentFigures);
      const figureNames = Object.keys(attachmentFigures);
      
      // Determine the number of pages required to display the figures
      const numPages = Math.ceil(figureUrls.length / 2);
      
      // Iterate over each page
      for (let pageIdx = 0; pageIdx < numPages; pageIdx++) {
        // Add a new page to the PDF
        const page = pdfDoc.addPage();
      
        // Calculate the starting and ending index of the figures for the current page
        const startIdx = pageIdx * 2;
        const endIdx = Math.min(startIdx + 2, figureUrls.length);
      
        // Iterate over the figures for the current page
        for (let figIdx = startIdx; figIdx < endIdx; figIdx++) {
          // Fetch the image from the URL
          const imageUrl = figureUrls[figIdx];
          const response = await fetch(imageUrl);
          const imageBlob = await response.blob();
      
          // Read the image data as an ArrayBuffer
          const imageArrayBuffer = await new Response(imageBlob).arrayBuffer();
      
          // Determine the file format based on the fetched image URL
          const isJpeg = imageUrl.toLowerCase().endsWith('.jpg') || imageUrl.toLowerCase().endsWith('.jpeg');
          const isPng = imageUrl.toLowerCase().endsWith('.png');
      
          // Embed the image into the PDF based on the file format
          let imageBytes;
          if (isJpeg) {
            imageBytes = await pdfDoc.embedJpg(imageArrayBuffer);
          } else if (isPng) {
            imageBytes = await pdfDoc.embedPng(imageArrayBuffer);
          } else {
            throw new Error(`Unsupported image format for URL: ${imageUrl}`);
          }
      
          // Calculate the X-coordinate for centering the image
          const { width } = imageBytes.scale(0.5); // Adjust image scale as needed
          const pageWidth = page.getWidth();
          const x = pageWidth / 2 - width / 2; // X-coordinate of the image (centered horizontally)
      
          // Calculate the Y-coordinate for positioning the image
          const y = page.getHeight() - 300 - (figIdx % 2) * 250; // Y-coordinate of the image
      
          // Draw the image on the page
          const { height } = imageBytes.scaleToFit(width, page.getHeight() - 200); // Adjust image height to fit within the page
          page.drawImage(imageBytes, {
            x,
            y,
            width,
            height,
          });
      
          // Retrieve the figure name from the figureNames array
          const figureName = figureNames[figIdx];
      
          // Draw the figure name under the image
          const figureNumber = `${figureName}`;
          page.drawText(figureNumber, {
            x: x + width / 2,
            y: y - 20,
            size: 12,
            font,
            color: rgb(0, 0, 0),
            opacity: 0.8,
          
            alignment: { horizontal: 'center' }, // Center align the text
          });
        }
      }
    // ... Add more elements based on your structure and data

    // Save the PDF to a blob
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Create a download link for the PDF and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'generated_pdf.pdf';
    downloadLink.click();
  };

  return (
    <div>
    <button class="download-button" onClick={generatePDF}>Generate PDF</button>
  </div>
  );
};

export default PDFGenerator;
