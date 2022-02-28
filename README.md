# Interview Coding Challenge: Word Frequencies

## Instruction

### Install npm dependencies

<pre>npm install</pre>

### Run server

<pre>npm run serve</pre>

## How to execute API

### This was built as an API to accept text contents and return top N most frequent words in the text file as JSON

### 1. Check terminal console if it showed <pre>Application is running on port 3000</pre>

### 2. Send a GET request to <a href="<http://127.0.0.1:3000>">http://127.0.0.1:3000</a> op browser and check if you get

<pre>{"status":"Up!"}</pre>

### 3. Open PostMan and send a sample request as described  below and check response

### End Point

<a href="<http://127.0.0.1:3000/frequencies>">http://127.0.0.1:3000/frequencies</a>

### Header

- Content-Type: application/json

### Body

- "text" : text content and max size shouldn't exceed more than 1GB (can be updated in app code)
- "n" : any positive integer

Sample Request
<pre>
{
    "text" : "Lorem ipsum dolor sit amet ...",
    "n" : 4
}
</pre>

### Response

Response returns the top N most frequent words in the text content as JSON.

Sample Response
<pre>
{
    "frequencies": [
        {
            "word": "sed",
            "count": 12
        },
        {
            "word": "id",
            "count": 10
        },
        {
            "word": "sit",
            "count": 8
        },
        {
            "word": "amet",
            "count": 8
        }
    ]
}
</pre>

## How to test

Just run this command on Terminal 
<pre>npm run test</pre>

## Improvements

### 1. File Upload using form

### 2. Data Structure and Algorithm updates for sorting
