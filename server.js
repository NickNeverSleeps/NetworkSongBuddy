#!/usr/bin/env node

const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = 3009;
const FILE_PATH = ('Z:/OWCS 2025 media log.csv');

// remove text inside brackets
function cleanTitle(title) {
    return title.replace(/[\[\(].*?[\]\)]/g, '').trim(); // Removes content inside and including [] and ()
}


//calculate percentage complete
function calculatePercentage(time, duration) {
    try{
    const timeNum = parseFloat(time);
    const durationNum = parseFloat(duration);
    if (!isNaN(timeNum) && !isNaN(durationNum) && durationNum > 0) {
        return ((timeNum / durationNum) * 100).toFixed(2); // Rounded to 2 decimal places
    }
    return "0.00"; // Default if calculation fails
    }
    catch{
        console.log("error in calc");
        return "0.00"
    }
}

function getLatestEntry() {
    return new Promise((resolve, reject) => {
        let latestEntry = null;

        fs.createReadStream(FILE_PATH)
            .pipe(csv())
            .on('data', (row) => {
                if (row.Title) {
                    row.Title = cleanTitle(row.Title); 
                }
                if (row.Artist) {
                    row.Artist = cleanTitle(row.Artist); 
                }
                row.perc_complete = calculatePercentage(row.time, row.duration);
                latestEntry = row;
            })
            .on('end', () => {
                resolve(latestEntry);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

app.get('/latest', async (req, res) => {
    try {
        const latestData = await getLatestEntry();
        if (latestData) {
            res.json(latestData);
        } else {
            res.status(404).json({ error: 'No data found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error reading file', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
