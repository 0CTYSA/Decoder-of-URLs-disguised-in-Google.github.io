# URL Analyzer Tool

## Description

The URL Analyzer tool is designed to decode URLs that have been disguised with simple encoding, making them appear official or authentic. This tool allows users to input a list of URLs and decode them, making it easier to manually identify and modify them.

## Functionality

### Files

1. **index.html**: This file contains the HTML structure of the tool, including the input form for URLs and the table for displaying the results.
2. **script.js**: This file contains the JavaScript logic that processes the URLs, decodes the entered URLs, and manages the functionality of copying the decoded URLs to the clipboard.

### Workflow

1. **URL Input**: The user enters a list of URLs in a text field, one URL per line.
2. **URL Analysis**: When the "Analyze" button is clicked, the `analyzeURLs()` function in `script.js` is triggered. This function:
   - Takes the entered URLs.
   - Decodes each URL.
   - Groups the URLs by domain and path, counting the number of occurrences and storing unique parameters.
   - Displays the results in a table, showing the original URLs, decoded URLs, and the count of occurrences.
3. **Copy Decoded URLs**: Once the results are displayed, the "Copy Decoded URLs" button appears. When this button is clicked, the `copyURLs()` function is triggered. This function:
   - Collects all decoded URLs from the table.
   - Copies them to the user's clipboard, separated by line breaks.

## Usage

1. Open the `index.html` file in your web browser.
2. Enter the URLs to be decoded in the provided text area.
3. Click "Analyze" to decode the URLs and display the results.
4. Once the results are displayed, click "Copy Decoded URLs" to copy all decoded URLs to the clipboard.

## Example Usage

1. **Entering URL**:

   ```plaintext
   https://google.com%E2%88%95d4e5df38-%E2%88%95720f68d6@4355.vtkdsu.club/8901/?loginid=2ccc317a-8jp
   ```

2. **Results**:

   - Original URL:

     ```plaintext
     https://google.com%E2%88%95d4e5df38-%E2%88%95720f68d6@4355.vtkdsu.club/8901/?loginid=2ccc317a-8jp
     ```

   - Decoded URL:

     ```plaintext
     https://4355.vtkdsu.club/8901/?loginid=2ccc317a-8jp
     ```

   - Count:

     ```plaintext
     1
     ```

3. **Copy Decoded URL**: Click the "Copy Decoded URLs" button to copy:

   ```plaintext
   https://4355.vtkdsu.club/8901/?loginid=2ccc317a-8jp
   ```

## Conclusion

This tool is useful for decoding and analyzing URLs that have been disguised through encoding, allowing for easy identification and manual modification. It is ideal for those who need to work with large volumes of URLs and require an efficient way to decode and manipulate them.
