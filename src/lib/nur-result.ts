'use client';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

export async function createResultPDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size

  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fontSize = 10;

  // Utility function to draw text
  const drawText = (text: string, x: number, y: number) => {
    page.drawText(text, { x, y, size: fontSize, font });
  };

  // Draw borders
  page.drawRectangle({
    x: 50,
    y: height - 80,
    width: width - 100,
    height: height - 120,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });

  // Titles
  drawText('Scholastic Areas', 60, height - 100);
  drawText('Term-1 (100 Marks)', 200, height - 100);
  drawText('Term-2 (100 Marks)', 350, height - 100);
  drawText('Grand Total', 500, height - 100);

  // Table headers
  drawText('Subject', 60, height - 120);
  drawText('P.A. (20)', 200, height - 120);
  drawText('Term-1 (80)', 240, height - 120);
  drawText('Total (100)', 290, height - 120);
  drawText('P.A. (20)', 350, height - 120);
  drawText('Term-2 (80)', 400, height - 120);
  drawText('Total (100)', 450, height - 120);
  drawText('Term 1 (50)', 500, height - 120);
  drawText('Term 2 (50)', 550, height - 120);

  // Subjects
  const subjects = [
    'English Written',
    'English Oral',
    'English Rhymes',
    'Hindi Written',
    'Hindi Oral',
    'Hindi Rhymes',
    'Maths Written',
    'Maths Oral',
    'G.S.',
    'Activity',
    'Spell/Dict.',
    'Drawing',
    'P.T.',
    'Conversation',
  ];

  let yPosition = height - 140;

  subjects.forEach((subject) => {
    drawText(subject, 60, yPosition);
    yPosition -= 20;
  });

  // Footer grading system
  drawText('Scholastic Areas:', 60, 80);
  drawText('Grades are awarded on 8 Point Grading scale as follows', 60, 60);
  drawText('Marks Range', 60, 40);
  drawText('Grade', 140, 40);

  // Co-Scholastic Area grading
  drawText('Co-Scholastic Areas:', 300, 80);
  drawText('Grading on 3 Point Scale', 300, 60);
  drawText('Grade', 300, 40);
  drawText('Grade Point', 400, 40);

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('Result_Structure.pdf', pdfBytes);

  console.log('PDF generated successfully!');
}
