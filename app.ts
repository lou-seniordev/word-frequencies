// @ts-ignore
import express, {Request, Response, NextFunction} from 'express';

const app = express();
// limit is set for json & urlencoded 1GB, based on your requirements you can change it!
app.use(express.json({limit: '1024mb'}))
app.use(express.urlencoded({extended: true,limit: '1024mb'}))
const port = 3000;

// Custom interfaces to understand and for accurate input and output at compile time
export interface Frequencies {
    word: string;
    count: number;
}
interface FrequenciesResponse {
    frequencies: Frequencies[]
}
interface AppStatus {
    status: string;
}

// This function finds a value in an array if found will return true or else false
const array_contains = (array: string[], value: string) => {
    for (let i=0; i<array.length; i++)
        if (array[i] == value)
            return true;
    return false;
}

// This function will return words alongside times of occurrence in a given array of strings
const calculate = (result: string[]) => {
    let words: string[] = [];
    let counts: Frequencies[] = [];
    for (let i=0; i<result.length; i++) {
        if (array_contains(words, result[i])) {
            // counts[result[i]]++;
            counts = counts.map((item: Frequencies) => {
                if (item.word == result[i].toLowerCase()){
                    return {
                        word: item.word,
                        count: item.count + 1
                    }
                }
                return item
            })
        } else {
            words.push(result[i].toLowerCase());
            // counts[result[i]] = 1;
            counts.push({
                word: result[i].toLowerCase(),
                count: 1
            })
        }
    }
    return counts
}
export { array_contains, calculate };

// Returns status of the server
const appStatus = (request: Request, response: Response, next: NextFunction) => {
    const statusResponse: AppStatus =
        {
            status: "Up!"
        }
    response.status(200).json(statusResponse);
}

// Post request which accept text & k as input and return frequencies as result
const getWordNFFrequencies = (request: Request, response: Response, next: NextFunction) => {
    // Remove special chars in a string
    let text = request.body.text.replace(/[^a-zA-Z ]/g, " ");
    // Remove spaces and sort array by counts in descending
    const sortedArray = calculate(text.split(" ").map(v => v.toLowerCase()).filter(str => /\S/.test(str))).sort((a,b) => (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0));
    const res: FrequenciesResponse = {
        frequencies: sortedArray.slice(0,request.body.n)
    }
    response.status(200).json(res);
};

// App routes
app.get('/', appStatus);
app.post('/frequencies', getWordNFFrequencies);

// App initialization
app.listen(port, () => {
    console.log(`Application is running on port ${port}.`);
});