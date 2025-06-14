/**
 * Utility functions for exporting content to different formats
 */

/**
 * Export text content to a downloadable text file
 * @param content The text content to export
 * @param fileName The name of the file to download
 */
export const exportToTextFile = (content: string, fileName: string): void => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  exportBlob(blob, `${fileName}.txt`);
};

/**
 * Export content as markdown
 * @param content The content to export as markdown
 * @param fileName The name of the file to download
 */
export const exportToMarkdown = (content: string, fileName: string): void => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  exportBlob(blob, `${fileName}.md`);
};

/**
 * Export HTML content
 * @param content The HTML content to export
 * @param title The title of the HTML document
 * @param fileName The name of the file to download
 */
export const exportToHTML = (content: string, title: string, fileName: string): void => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 20px;
        }
        h1 {
          color: #2563eb;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${title}</h1>
        <div>${content.replace(/\n/g, '<br>')}</div>
      </div>
    </body>
    </html>
  `;
  
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  exportBlob(blob, `${fileName}.html`);
};

/**
 * Helper function to create a download from a blob
 * @param blob The blob to download
 * @param fileName The name of the file to download
 */
const exportBlob = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
